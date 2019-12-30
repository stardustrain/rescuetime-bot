import { IncomingWebhook } from '@slack/webhook'

import { getDailyData } from '../rescuetime'
import { generateTodayMessage } from './messages'

const HOOK_URL = process.env.HOOK_URL || ''

const webhook = new IncomingWebhook(HOOK_URL)

const sendWebHook = async () => {
  const dailyData = await getDailyData()
  const { totalHour, productiveTime, distractingTime, devTime } = generateTodayMessage(dailyData?.summary, dailyData?.compareYesterday)
  const currentDate = dailyData?.summary.date

  try {
    await webhook.send({
      blocks: [{
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:calendar: *${currentDate}* Rescuetime daily report`
        }
      }, {
        type: 'divider'
      }, {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: totalHour
        }
      }, {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: productiveTime
        }
      }, {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: distractingTime
        }
      }, {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: devTime
        }
      }, {
        type: 'divider'
      }, {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Rescuetime :point_right: <https://www.rescuetime.com/dashboard/for/the/day/of/${currentDate}|Dashboard>`
        }
      }]
    })
    console.info(`Send webhook, data: ${JSON.stringify({
      currentDate,
      totalHour,
      productiveTime,
      distractingTime,
      devTime
    })}`)
  } catch (e) {
    console.error(e)
  }
}

export default sendWebHook
