const vision = require('@google-cloud/vision');
const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();

// Creates a client
const client = new vision.ImageAnnotatorClient();


async function upload(imgUrl) {
    const [result] = await client.labelDetection(imgUrl);
    result['url'] = imgUrl

    const labels = []
    console.log(result)
    result['labelAnnotations'].forEach(v => {
        labels.push(v['description'].toLowerCase())
    })

    result['labels'] = labels

    const col = firestore.collection('imgs')
    return col.add(result)

}

async function search(field, op, value) {
    const col = firestore.collection('imgs')

    return col.where(field, op, value).get()
}

async function del(id) {
    const doc = firestore.doc(`imgs/${id}`)
    return doc.delete()
}

exports.upload = upload
exports.del = del
exports.search = search