import admin from 'firebase-admin'
import { isNil, omit } from 'ramda'

import { getToday } from '../utils/misc'
import { parseActivity, parseEfficiency, parseOverview } from '../utils/parseUtils'

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

const getInsertData = (data: FirestoreInsertData) => {
  if (data.data && data.raw) {
    return {
      summary: omit(['raw'], data).data,
      efficiency: parseEfficiency(data.raw.efficiency),
      overview: parseOverview(data.raw.overview),
      activity: parseActivity(data.raw.activity),
    }
  }

  return {
    summary: omit(['raw'], data).data,
    efficiency: null,
    overview: null,
    activity: null,
  }
}

export const setDailyData = async (data: FirestoreInsertData) => {
  try {
    const db = initializeFirestore()
    const formattedDate = getToday().subtract(1, 'day').format()
    const docRef = db.collection('rescuetime').doc(formattedDate)

    const insertData = getInsertData(data)

    await docRef.set(
      Object.assign(
        {
          date: formattedDate,
        },
        insertData,
      ),
    )

    console.info(`Write firestore data: ${JSON.stringify(insertData)}`)
  } catch (e) {
    console.error(e)
  }
}
