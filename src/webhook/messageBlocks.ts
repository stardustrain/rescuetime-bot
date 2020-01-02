interface DailyMessageBlockParams {
  totalHour: string
  productiveTime: string
  distractingTime: string
  devTime: string
  currentDate: string | undefined
}

export const dailyMessageBlock = ({
  totalHour,
  productiveTime,
  distractingTime,
  devTime,
  currentDate,
}: DailyMessageBlockParams) => ({
  text: `Productive time was ${productiveTime} on yesterday!`,
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
