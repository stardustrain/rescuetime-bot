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

export interface WeeklyData {
  rowHeaders: string[]
  rows: Array<number | string>[]
}
