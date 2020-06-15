import { ParsedActivity, ParsedOverview, Parsedefficiency } from '../rescuetime/weeklyReportUtils'

export interface Overview {
  rowHeaders: ['Rank', 'Time Spent (seconds)', 'Number of People', 'Category']
  rows: [[number, number, number, string]]
}

export interface Activity {
  rowHeaders: ['Rank', 'Time Spent (seconds)', 'Number of People', 'Activity', 'Category', 'Productivity']
  rows: [[number, number, number, string, string, number]]
}

export interface Efficiency {
  rowHeaders: ['Rank', 'Time Spent (seconds)', 'Number of People', 'Efficiency']
  rows: [[number, number, number, string]]
}

export interface WeeklyDataModel {
  overview: ParsedOverview[]
  activity: ParsedActivity[]
  efficiency: Parsedefficiency[]
}

export type WeeklyData = WeeklyDataModel & {
  from: string
  to: string
}

interface DailySummary {
  totalTime: number
  productiveTime: number
  distractingTime: number
  programDevlopmentTime: number
  productiveTimePercentage: number
  distractingTimePercentage: number
  programDevlopmentTimePercentage: number
  score: number
}

export interface FirestoreInsertData {
  date: string
  data: DailySummary | null
}
