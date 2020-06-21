import { IncomingWebhook } from '@slack/webhook'
import { values, all, equals } from 'ramda'

import { getDailyData, getWeeklyData } from '../rescuetime'
import { generateTodayMessage, generateWeeklyMessage, getDataEmptyMessage } from './messages'
import { dailyMessageBlock, weeklyMessageBlock } from './messageBlocks'
import { getToday, getWeekRange } from '../utils/misc'

const HOOK_URL = process.env.HOOK_URL || ''

const webhook = new IncomingWebhook(HOOK_URL)
const allEqualsZero = all(equals(0))

export const sendDailyWebHook = async () => {
  try {
    const dailyData = await getDailyData()
    const currentDate = dailyData.date ?? getToday().subtract(1, 'day').format('YYYY-MM-DD')

    if (allEqualsZero(values(dailyData.summary))) {
      await webhook.send({
        text: 'It does not exist rescuetime data.',
        blocks: getDataEmptyMessage(),
      })

      return {
        data: null,
        raw: null,
      }
    }

    const { totalHour, productiveTime, distractingTime, devTime } = generateTodayMessage(
      dailyData.summary,
      dailyData.compareYesterday,
    )

    await webhook.send(
      dailyMessageBlock({
        totalHour,
        productiveTime,
        distractingTime,
        devTime,
        currentDate,
      }),
    )
    console.info(
      `Send daily webhook data: ${JSON.stringify({
        currentDate,
        totalHour,
        productiveTime,
        distractingTime,
        devTime,
      })}`,
    )

    return {
      data: dailyData.summary,
      raw: dailyData.raw,
    }
  } catch (e) {
    console.error(e)
  }
}

export const sendWeeklyWebHook = async () => {
  try {
    const weeklyData = await getWeeklyData()
    const { totalHour, efficiencyRank, overviewRank } = generateWeeklyMessage(weeklyData)
    const { from, to } = getWeekRange()

    await webhook.send(
      weeklyMessageBlock({
        from: weeklyData?.from ?? from,
        to: weeklyData?.to ?? to,
        totalHour,
        efficiencyRank,
        overviewRank,
      }),
    )
    console.info(
      `Send weekly webhook data: ${JSON.stringify({
        from: weeklyData?.from,
        to: weeklyData?.to,
        totalHour,
        efficiencyRank,
        overviewRank,
      })}`,
    )
  } catch (e) {
    console.error(e)
  }
}
