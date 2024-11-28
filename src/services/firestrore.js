const { Firestore } = require('@google-cloud/firestore')
const path = require('path')

const key = path.join(__dirname, '../../service-account.json')
require('dotenv').config()

const { PROJECT_ID, DB } = process.env

const db = new Firestore({
    projectId: PROJECT_ID,
    keyFilename: key,
    databaseId: DB
})
const predictCollection = db.collection('prediction')

exports.storeData = async (id, data) => {
    return predictCollection.doc(id).set(data)
}

exports.getAllData = async () => {
    const data = await predictCollection.get()
    const allData = []
    data.forEach(doc => allData.push({
        id: doc.id,
        history: {
            result: doc.data().result,
            createdAt: doc.data().createdAt,
            suggestion: doc.data().suggestion,
            id: doc.id
        }
    }))
    return allData
}