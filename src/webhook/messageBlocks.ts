interface DailyMessageBlockParams {
  totalHour: string
  productiveTime: string
  distractingTime: string
  devTime: string
  currentDate: string | undefined
}

interface WeeklyMessageBlockParams {
  from: string
  to: string
  totalHour: string
  efficiencyRank: string
  overviewRank: string
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
      text: `:calendar: *${currentDate}* Rescuetime daily report`,
    },
  }, {
    type: 'divider',
  }, {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: totalHour,
    },
  }, {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: productiveTime,
    },
  }, {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: distractingTime,
    },
  }, {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: devTime,
    },
  }, {
    type: 'divider',
  }, {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `Rescuetime :point_right: <https://www.rescuetime.com/dashboard/for/the/day/of/${currentDate}|Dashboard>`,
    },
  }],
})

export const weeklyMessageBlock = ({
  from,
  to,
  totalHour,
  efficiencyRank,
  overviewRank,
}: WeeklyMessageBlockParams) => ({
  text: 'Productive time of a last week!',
  blocks: [{
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `:calendar: *${from}* ~ *${to}* Rescuetime weekly report`,
    },
  }, {
    type: 'divider',
  }, {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: totalHour,
    },
  }, {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: efficiencyRank,
    },
  }, {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: overviewRank,
    },
  }, {
    type: 'divider',
  }, {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `Rescuetime :point_right: <https://www.rescuetime.com/dashboard/for/the/week/of/${from}|Dashboard>`,
    },
  }],
})
