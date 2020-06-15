import admin from 'firebase-admin'
import { isNil } from 'ramda'
import dayjs from 'dayjs'

import { FirestoreInsertData } from '../@types/models'

const initializeFirestore = () => {
  const serviceAccount = process.env.FIRESTORE_SA_KEY

  if (isNil(serviceAccount)) {
    throw Error('Does not received service account')
  }

  const parsedServiceAccount = JSON.parse(Buffer.from(serviceAccount, 'base64').toString())

  admin.initializeApp({
    credential: admin.credential.cert(parsedServiceAccount),
  })

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
