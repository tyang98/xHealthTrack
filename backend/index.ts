import express from 'express';
import bodyParser from 'body-parser';
import admin from 'firebase-admin';
import cors from 'cors';

// Path to wherever you put your service-account.json
const serviceAccount = require('../backend/service-account.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: '[firebase-adminsdk-ypaas@xhy0rinstyx.iam.gserviceaccount.com]',
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json);
//const port = 8080;

type FirebaseUser = {
  firstName: string;
  lastName: string;
}

type DatedWeight = {
  month: number;
  day: number;
  year: number;
  weight: number;
}

type User = FirebaseUser & {
  uid: string;
}

const usersCollection = db.collection('users');

app.post('/createUser', async (req, res) => {
  const { uid, firstName, lastName } = req.body;
  const firebaseUser = {
      firstName: firstName,
      lastName: lastName
  }
  await usersCollection.doc(uid as string).set(firebaseUser);
  res.send(uid);
});

app.get('/getUser/', async (req, res) => {
  const uid = req.query.uid as string;
  const userDoc = await usersCollection.doc(uid).get();
  const user = userDoc.data() as User;
  res.send({ ...user, uid });
});


app.listen(process.env.PORT || 8080, () => console.log('Server started!'));

