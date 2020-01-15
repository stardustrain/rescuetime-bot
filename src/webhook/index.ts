import { IncomingWebhook } from '@slack/webhook'
import dayjs from 'dayjs'

import { getWeekRange } from '../rescuetime/weeklyReportUtils'
import { getDailyData, getWeeklyData } from '../rescuetime'
import { generateTodayMessage, generateWeeklyMessage } from './messages'
import { dailyMessageBlock, weeklyMessageBlock } from './messageBlocks'

const HOOK_URL = process.env.HOOK_URL || ''

const webhook = new IncomingWebhook(HOOK_URL)

export const sendDailyWebHook = async () => {
  const dailyData = await getDailyData()
  const { totalHour, productiveTime, distractingTime, devTime } = generateTodayMessage(dailyData?.summary, dailyData?.compareYesterday)
  const currentDate = dailyData?.date ?? dayjs().subtract(1, 'day').format('YYYY-MM-DD')

  try {
    await webhook.send(dailyMessageBlock({
      totalHour,
      productiveTime,
      distractingTime,
      devTime,
      currentDate,
    }))
    console.info(`Send daily webhook data: ${JSON.stringify({
      currentDate,
      totalHour,
      productiveTime,
      distractingTime,
      devTime,
    })}`)
  } catch (e) {
    console.error(e)
  }
}

export const sendWeeklyWebHook = async () => {
  const weeklyData = await getWeeklyData()
  const { totalHour, efficiencyRank, overviewRank } = generateWeeklyMessage(weeklyData)
  const { from, to } = getWeekRange()

  try {
    await webhook.send(weeklyMessageBlock({
      from: weeklyData?.from ?? from,
      to: weeklyData?.to ?? to,
      totalHour,
      efficiencyRank,
      overviewRank,
    }))
    console.info(`Send weekly webhook data: ${JSON.stringify({
      from: weeklyData?.from,
      to: weeklyData?.to,
      totalHour,
      efficiencyRank,
      overviewRank,
    })}`)
  } catch (e) {
    console.error(e)
  }
}
