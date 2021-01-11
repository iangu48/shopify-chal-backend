const vision = require('@google-cloud/vision');
const {Firestore} = require('@google-cloud/firestore');
const firestore = new Firestore();

const firebaseConfig = {
    apiKey: "AIzaSyDoqLiDu_dT5FIjX--QzlNJXJpwNWEbKLA",
    authDomain: "shopify-challenge-301321.firebaseapp.com",
    projectId: "shopify-challenge-301321",
    storageBucket: "shopify-challenge-301321.appspot.com",
    messagingSenderId: "805224620641",
    appId: "1:805224620641:web:41cc10f2fe764659ddc020"
};

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

async function getSorted() {

}

async function search(field, op, value) {
    const col = firestore.collection('imgs')

    return col.where(field, op, value).get()
}

exports.upload = upload
exports.getSorted = getSorted
exports.search = search