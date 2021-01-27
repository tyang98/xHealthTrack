"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
// Path to wherever you put your service-account.json
const serviceAccount = require("../backend/service-account.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: "firebase-adminsdk-nxhji@xhealtht.iam.gserviceaccount.com",
});
const db = firebase_admin_1.default.firestore();
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../frontend/build')));
const port = 8080;
const usersCollection = db.collection("users");
//app.get('/', (_, res) => res.send('Hello World!'));
app.post("/createUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, firstName, lastName } = req.body;
    const firebaseUser = {
        firstName: firstName,
        lastName: lastName,
        info: [],
        activities: []
    };
    yield usersCollection.doc(uid).set(firebaseUser);
    res.send(uid);
}));
// call with the same user with arrays updated
// pass in weight and sleep ?
app.put("/newEntry", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.query.uid;
    const seconds = Math.round(new Date().getTime() / 1000);
    const timestamp = new firebase_admin_1.default.firestore.Timestamp(seconds, 0);
    const { weight, sleep } = req.body;
    const newInfo = {
        date: timestamp,
        weight: weight,
        sleep: sleep,
    };
    const userDoc = yield usersCollection.doc(uid).get();
    const user = userDoc.data();
    let infoArr = user.info;
    infoArr.push(newInfo);
    const updateInfo = { info: infoArr };
    yield usersCollection
        .doc(uid)
        .update(updateInfo)
        .catch((error) => console.log(error));
    res.send("Updated!");
}));
app.put("/removeDailyEntries", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.query.uid;
    const date = new Date();
    const userDoc = yield usersCollection.doc(uid).get();
    const user = userDoc.data();
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
    yield usersCollection
        .doc(uid)
        .update(updateInfo)
        .catch((error) => console.log(error));
    res.send("Removed!");
}));
//get user by uid
app.get("/getUser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.query.uid;
    const userDoc = yield usersCollection.doc(uid).get();
    const user = userDoc.data();
    res.send(Object.assign(Object.assign({}, user), { uid }));
}));
//get all users
app.get("/getUsers", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsersDoc = yield usersCollection.get();
    const users = [];
    for (let doc of allUsersDoc.docs) {
        let user = doc.data();
        user.uid = doc.id;
        users.push(user);
    }
    res.send(users);
}));
app.get("/getData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.query.uid;
    const data = [];
    const userDoc = yield usersCollection.doc(uid).get();
    const user = userDoc.data();
    for (let info of user.info) {
        data.push(info);
    }
    res.send(data);
}));
app.get("/getSleepData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.query.uid;
    const userDoc = yield usersCollection.doc(uid).get();
    const user = userDoc.data();
    const data = [];
    if (user.info !== null) {
        user.info.map((info) => {
            let entry = [];
            let dateString = "";
            dateString += info.date.toDate().getMonth() + 1;
            dateString += "/";
            dateString += info.date.toDate().getDate();
            dateString += "/";
            dateString += info.date.toDate().getFullYear();
            entry.push(dateString);
            entry.push(info.sleep);
            data.push(entry);
            return { entry };
        });
    }
    res.send(data);
}));
app.get("/getWeightData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.query.uid;
    const userDoc = yield usersCollection.doc(uid).get();
    const user = userDoc.data();
    const data = [];
    user.info.map((info) => {
        let entry = [];
        let dateString = "";
        dateString += info.date.toDate().getMonth() + 1;
        dateString += "/";
        dateString += info.date.toDate().getDate();
        dateString += "/";
        dateString += info.date.toDate().getFullYear();
        entry.push(dateString);
        entry.push(info.weight);
        data.push(entry);
        return { entry };
    });
    res.send(data);
}));
app.get("/getWeekSleep", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.query.uid;
    const userDoc = yield usersCollection.doc(uid).get();
    const user = userDoc.data();
    const data = [];
    const pastWeek = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    user.info.map((info) => {
        if (info.date.toDate() >= pastWeek) {
            let entry = info.sleep;
            data.push(entry);
            return { entry };
        }
    });
    res.send(data);
}));
app.get("/getActivities", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.query.uid;
    const userDoc = yield usersCollection.doc(uid).get();
    const user = userDoc.data();
    const data = [];
    user.activities.map((act) => {
        let obj = act.activity;
        if (obj != null) {
            data.push(obj);
            return { obj };
        }
    });
    console.log(user.activities);
    res.send(data);
}));
app.put("/addActivity", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.query.uid;
    const userDoc = yield usersCollection.doc(uid).get();
    const user = userDoc.data();
    let userActivities = user.activities;
    const activity = req.body;
    userActivities.push(activity);
    const updateActivities = { activities: userActivities };
    yield usersCollection
        .doc(uid)
        .update(updateActivities)
        .catch((error) => console.log(error));
    res.send("Added Activity!");
}));
app.put("/updateActivity", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.query.uid;
    const userDoc = yield usersCollection.doc(uid).get();
    const user = userDoc.data();
    let userActivities = user.activities;
    const { newActivity, activityKey } = req.body;
    userActivities[activityKey].activity = newActivity;
    const updateActivities = { activities: userActivities };
    yield usersCollection
        .doc(uid)
        .update(updateActivities)
        .catch((error) => console.log(error));
    res.send("Updated Activity!");
}));
app.put("/deleteActivity", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uid = req.query.uid;
    const userDoc = yield usersCollection.doc(uid).get();
    const user = userDoc.data();
    const { activityKey } = req.body;
    let userActivities = user.activities.filter((_, i) => i !== activityKey);
    const updateActivities = { activities: userActivities };
    yield usersCollection
        .doc(uid)
        .update(updateActivities)
        .catch((error) => console.log(error));
    res.send("Deleted Activity!");
}));
app.listen(port, () => console.log(`App listening on port ${port}!`));
