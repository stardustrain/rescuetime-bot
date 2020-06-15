import admin from 'firebase-admin'
import functions from 'firebase-functions'
import dayjs from 'dayjs'

import { FirestoreInsertData } from '../@types/models'

const initializeFirestore = () => {
  admin.initializeApp(functions.config().firebase)

  return admin.firestore()
}

export const setDailyData = async (data: FirestoreInsertData) => {
  try {
    const db = initializeFirestore()
    const formattedDate = dayjs(data.date).utc().format()

    const docRef = db.collection('rescuetime').doc(formattedDate)
    const insertData = {
      ...data,
      date: formattedDate,
    }

    await docRef.set(insertData)

    console.info(`Write firestore data: ${JSON.stringify(insertData)}`)
  } catch (e) {
    console.error(e)
  }
}
