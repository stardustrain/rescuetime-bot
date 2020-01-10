import { IncomingWebhook } from '@slack/webhook'
import dayjs from 'dayjs'

import { getDailyData, getWeeklyData } from '../rescuetime'
import { generateTodayMessage } from './messages'
import { dailyMessageBlock } from './messageBlocks'

const HOOK_URL = process.env.HOOK_URL || ''

const webhook = new IncomingWebhook(HOOK_URL)

export const sendDailyWebHook = async () => {
  const dailyData = await getDailyData()
  const { totalHour, productiveTime, distractingTime, devTime } = generateTodayMessage(dailyData?.summary, dailyData?.compareYesterday)
  const currentDate = dailyData?.summary.date ?? dayjs().subtract(1, 'day').format('YYYY-MM-DD')

  try {
    await webhook.send(dailyMessageBlock({
      totalHour,
      productiveTime,
      distractingTime,
      devTime,
      currentDate,
    }))
    console.info(`Send webhook data: ${JSON.stringify({
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
  // const weeklyData = await getWeeklyData()
  // console.log(weeklyData)
  const weeklyData = await getWeeklyData()
  // const weeklyOverview = generateWeeklyOverviewData(weeklyData?.overview)
  console.log(weeklyData)
}
