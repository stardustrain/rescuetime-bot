import { getDayilDataSummary } from '../dailyReportUtils'

const efficiency: any = {
  rowHeaders: ['Rank', 'Time Spent (seconds)', 'Number of People', 'Efficiency'],
  rows: [
    [1, 48287, 1, 'Very Productive Time'],
    [2, 14049, 1, 'Neutral Time'],
    [3, 7454, 1, 'Distracting Time'],
    [4, 2944, 1, 'Productive Time'],
    [5, 2653, 1, 'Very Distracting Time'],
  ],
}

const activity: any = {
  rowHeaders: ['Rank', 'Time Spent (seconds)', 'Number of People', 'Activity', 'Category', 'Productivity'],
  rows: [
    [1, 3669, 1, 'Visual Studio Code', 'Editing & IDEs', 2],
    [2, 1667, 1, 'github.com', 'General Software Development', 2],
    [3, 924, 1, 'Slack', 'Instant Message', -1],
    [4, 924, 1, 'Terminal', 'Systems Operations', 2],
    [5, 531, 1, 'ondemandkorea.atlassian.net', 'General Business', 2],
    [6, 502, 1, 'felipecastro.com', 'Uncategorized', 0],
  ],
}

const overview: any = {
  rowHeaders: ['Rank', 'Time Spent (seconds)', 'Number of People', 'Category'],
  rows: [
    [1, 43490, 1, 'Software Development'],
    [2, 10513, 1, 'Communication & Scheduling'],
    [3, 7172, 1, 'Uncategorized'],
    [4, 4720, 1, 'Business'],
    [5, 3605, 1, 'Utilities'],
    [6, 3126, 1, 'Reference & Learning'],
    [7, 1403, 1, 'News & Opinion'],
  ],
}

describe('dailyReportUtils.ts', () => {
  describe('getDayilDataSummary(efficiency: Efficiency, overview: Overview)', () => {
    test('should return object by calculated time.', () => {
      expect(getDayilDataSummary({ efficiency, overview, activity })).toEqual({
        totalTime: 75387,
        productiveTime: 51231,
        distractingTime: 10107,
        programDevlopmentTime: 43490,
        productiveTimePercentage: 68,
        distractingTimePercentage: 13.4,
        programDevlopmentTimePercentage: 57.7,
        score: 35,
      })
    })
  })
})
