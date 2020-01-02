import { sendDailyWebHook, sendWeeklyWebHook } from './webhook'

export const sendDailyReport = () => {
  sendDailyWebHook()
}

export const sendWeeklyReport = () => {
  sendWeeklyWebHook()
}

sendWeeklyReport()
