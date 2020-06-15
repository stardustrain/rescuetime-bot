import { isNil } from 'ramda'
import { sendDailyWebHook, sendWeeklyWebHook } from './webhook'

import { setDailyData } from './utils/firestore'

export const sendDailyReport = async () => {
  const data = await sendDailyWebHook()

  if (isNil(data)) {
    return
  }

  setDailyData(data)
}

export const sendWeeklyReport = () => {
  sendWeeklyWebHook()
}

sendDailyReport()
