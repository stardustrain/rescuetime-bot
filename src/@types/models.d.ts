import { ParsedActivity, ParsedOverview, ParsedEfficiency } from '../utils/parseUtils'

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
  efficiency: ParsedEfficiency[]
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

export type DailyDataSummaryParams = {
  efficiency: Efficiency
  overview: Overview
  activity: Activity
}

export interface FirestoreInsertData {
  data: DailySummary | null
  raw: DailyDataSummaryParams | null
}

interface Summary {
  totalTime: number
  productiveTime: number
  distractingTime: number
  programDevlopmentTime: number
  productiveTimePercentage: number
  distractingTimePercentage: number
  programDevlopmentTimePercentage: number
  score: number
}

interface FirestoreData {
  summary: Summary
  efficiency: ParsedEfficiency[]
  overview: ParsedOverview[]
  activity: ParsedActivity[]
  date: string
}
