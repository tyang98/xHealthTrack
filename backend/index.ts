import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import cors from 'cors';

// Path to wherever you put your service-account.json
const serviceAccount = require('../backend/service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'firebase-adminsdk-ypaas@xhy0rinstyx.iam.gserviceaccount.com',
});

const db = admin.firestore();

const app = express();
app.use(bodyParser.json());
const port = 8080;
app.use(cors());
//const port = 8080;

type FirebaseUser = {
  firstName: string;
  lastName: string;
}

type DatedWeight = {
  date: Date
  weight: number
}

type DatedSleep = {
  date: Date
  sleep: number
}

type User = FirebaseUser & {
  uid: string;
  weights: DatedWeight[]
  sleep: DatedSleep[]
}

const usersCollection = db.collection('users');

//app.get('/', (_, res) => res.send('Hello World!'));

app.post('/createUser', async (req, res) => {
  const { uid, firstName, lastName } = req.body;
  const firebaseUser = {
      firstName: firstName,
      lastName: lastName
  }
  await usersCollection.doc(uid as string).set(firebaseUser);
  res.send(uid);
});

//get user by uid
app.get('/getUser', async (req, res) => {
  const uid = req.query.uid as string;
  const userDoc = await usersCollection.doc(uid).get();
  const user = userDoc.data() as User;
  res.send({ ...user, uid });
});


//get all users
app.get('/getUsers', async (_, res) => {
  const allUsersDoc = await usersCollection.get();
  const users: User[] = [];
  for (let doc of allUsersDoc.docs) {
    let user: User= doc.data() as User;
    user.uid = doc.id;
    users.push(user);
  }
  res.send(users);
});

// call with the same user with arrays updated
app.post('/newEntry', async (req, res) => {
  const uid = req.query.uid as string;
  const newUser = req.body;
  const userDoc = await usersCollection.doc(uid).update(newUser);
  res.send('Updated');
})

app.listen(port, () => console.log(`App listening on port ${port}!`));

