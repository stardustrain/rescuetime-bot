import { ParsedActivity, ParsedOverview, Parsedefficiency } from '../rescuetime/weeklyReportUtils'

export interface DailySummary {
  id: number
  date: string
  productivityPulse: number
  veryProductivePercentage: number
  productivePercentage: number
  neutralPercentage: number
  distractingPercentage: number
  veryDistractingPercentage: number
  allProductivePercentage: number
  allDistractingPercentage: number
  uncategorizedPercentage: number
  businessPercentage: number
  communicationAndSchedulingPercentage: number
  socialNetworkingPercentage: number
  designAndCompositionPercentage: number
  entertainmentPercentage: number
  newsPercentage: number
  softwareDevelopmentPercentage: number
  referenceAndLearningPercentage: number
  shoppingPercentage: number
  utilitiesPercentage: number
  totalHours: number
  veryProductiveHours: number
  productiveHours: number
  neutralHours: number
  distractingHours: number
  veryDistractingHours: number
  allProductiveHours: number
  allDistractingHours: number
  uncategorizedHours: number
  businessHours: number
  communicationAndSchedulingHours: number
  socialNetworkingHours: number
  designAndCompositionHours: number
  entertainmentHours: number
  newsHours: number
  softwareDevelopmentHours: number
  referenceAndLearningHours: number
  shoppingHours: number
  utilitiesHours: number
  totalDurationFormatted: string
  veryProductiveDurationFormatted: string
  productiveDurationFormatted: string
  neutralDurationFormatted: string
  distractingDurationFormatted: string
  veryDistractingDurationFormatted: string
  allProductiveDurationFormatted: string
  allDistractingDurationFormatted: string
  uncategorizedDurationFormatted: string
  businessDurationFormatted: string
  communicationAndSchedulingDurationFormatted: string
  socialNetworkingDurationFormatted: string
  designAndCompositionDurationFormatted: string
  entertainmentDurationFormatted: string
  newsDurationFormatted: string
  softwareDevelopmentDurationFormatted: string
  referenceAndLearningDurationFormatted: string
  shoppingDurationFormatted: string
  utilitiesDurationFormatted: string
}

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
