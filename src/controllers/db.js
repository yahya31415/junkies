import firebase from 'firebase'

var db = firebase.firestore()

export function saveToFirebase (firestore: Object, collectionName: string, data: Object) {
  firestore.collection(collectionName).add(data)
}

export function getItemsList () {
  db.collection('Item').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`)
    })
  })
}
