import express from "express";
import bodyParser from "body-parser";
import admin from "firebase-admin";
import cors from "cors";
import { table } from "console";

// Path to wherever you put your service-account.json
const serviceAccount = require("../backend/service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "firebase-adminsdk-nxhji@xhealtht.iam.gserviceaccount.com",
});

const db = admin.firestore();

const app = express();
app.use(bodyParser.json());
const port = 8080;
app.use(cors());
//const port = 8080;

type DatedInfo = {
  date: Date;
  weight: number;
  sleep: number;
};

type FirebaseDatedInfo = {
  date: admin.firestore.Timestamp;
  weight: number;
  sleep: number;
};

type FirebaseUser = {
  firstName: string;
  lastName: string;
  info: FirebaseDatedInfo[];
};

type User = FirebaseUser & {
  uid: string;
};

const usersCollection = db.collection("users");

//app.get('/', (_, res) => res.send('Hello World!'));

app.post("/createUser", async (req, res) => {
  const { uid, firstName, lastName } = req.body;
  const firebaseUser = {
    firstName: firstName,
    lastName: lastName,
    FirebaseDatedInfo: [],
  };
  await usersCollection.doc(uid as string).set(firebaseUser);
  res.send(uid);
});

// call with the same user with arrays updated
// pass in weight and sleep ?
app.put("/newEntry", async (req, res) => {
  const uid = req.query.uid as string;
  const seconds: number = Math.round(new Date().getTime() / 1000);
  const timestamp: admin.firestore.Timestamp = new admin.firestore.Timestamp(seconds, 0);
  const { weight, sleep } = req.body;
  const newInfo = {
    date: timestamp,
    weight: weight,
    sleep: sleep,
  } as FirebaseDatedInfo;
  const userDoc = await usersCollection.doc(uid).get();
  const user = userDoc.data() as FirebaseUser;
  let infoArr:FirebaseDatedInfo[] = user.info
  infoArr.push(newInfo);
  const updateInfo = { info: infoArr };
  await usersCollection
    .doc(uid)
    .update(updateInfo)
    .catch((error) => console.log(error));
  res.send("Updated!");
});

app.put("/removeDailyEntries", async (req, res) => {
  const uid = req.query.uid as string;
  const date = new Date();
  const userDoc = await usersCollection.doc(uid).get();
  const user = userDoc.data() as FirebaseUser;
  const infoArr = user.info;
  let index = infoArr.length;
  

  for (let i = 0; i < infoArr.length; i++) {
    let currentDate = infoArr[i].date.toDate();
    if (currentDate.getFullYear() === date.getFullYear() &&
    currentDate.getMonth() === date.getMonth() &&
    currentDate.getDate() === date.getDate()) {
      index = i;
      break;
    }
  }
  const updatedArr = infoArr.slice(0, index);
  const updateInfo = { info: updatedArr };
  await usersCollection
    .doc(uid)
    .update(updateInfo)
    .catch((error) => console.log(error));
  res.send("Removed!");
});

//get user by uid
app.get("/getUser", async (req, res) => {
  const uid = req.query.uid as string;
  const userDoc = await usersCollection.doc(uid).get();
  const user = userDoc.data() as User;
  res.send({ ...user, uid });
});

//get all users
app.get("/getUsers", async (_, res) => {
  const allUsersDoc = await usersCollection.get();
  const users: User[] = [];
  for (let doc of allUsersDoc.docs) {
    let user: User = doc.data() as User;
    user.uid = doc.id;
    users.push(user);
  }
  res.send(users);
});


app.get("/getData", async (req, res) => {
  const uid = req.query.uid as string;
  const data: FirebaseDatedInfo[] = [];
  const userDoc = await usersCollection.doc(uid).get();
  const user = userDoc.data() as User;
  for (let info of user.info) {
    data.push(info);
  }
  res.send(data);
});

app.get("/getSleepData", async (req, res) => {
  const uid = req.query.uid as string;
  const data: number[] = [];
  const userDoc = await usersCollection.doc(uid).get();
  const user = userDoc.data() as User;
  for (let info of user.info) {
    data.push(info.sleep);
  }
  res.send(data);
});

app.get("/getWeightData", async (req, res) => {
  const uid = req.query.uid as string;
  const data: number[] = [];
  const userDoc = await usersCollection.doc(uid).get();
  const user = userDoc.data() as User;
  for (let info of user.info) {
    data.push(info.weight);
  }
  res.send(data);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
