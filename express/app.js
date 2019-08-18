const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const morgan = require('morgan');
const webpush = require('web-push');
var mongoose = require('mongoose')
const port = (process.env.PORT || 9090);
const app = express();

require('dotenv').config({
    path: "../.env"
})

app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to console

// VAPID KEYS IN .env
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:soren@sbpweb.dk', publicVapidKey, privateVapidKey);
const subscriptions = []; 
app.use(express.static(path.join(__dirname, '../build')));

// Additional headers for the response to avoid trigger CORS security errors in the browser
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        // respond with 200
        res.sendStatus(200);
    } else {
        // move on
        next();
    }
});

mongoose.connect(process.env.dbUrl, (err) => {
    console.log("MongoDB connection errors:", err)
})

var Schema = mongoose.Schema;

var Transfer = new Schema({
    text: String,
    date: {
        type: Date,
        default: () => Date.now() + 2*60*60*1000 // GMT+2
    }
})

var Transfers = mongoose.model("Transfer", Transfer)

var Sub = new Schema({
    endpoint: String,
    expirationTime: String,
    keys: {
        p256dh: String,
        auth: String
    }
})

var Subscriptions = mongoose.model("Subscription", Sub)

var User = new Schema({
    username: String,
    password: String
})

var Users = mongoose.model("User", User)

app.get('/subs', (req, res) => {
    Subscriptions.find({}, (err, subs) => {
        if (err) {
            console.log(err)
        }
        res.send(subs)
    })
})

app.get("/getTrans", (req, res) => {
    Transfers.find({}, (err, transfers) => {
        if (err) {
            console.log(err)
        }
        res.send(transfers)
    })
})

app.post("/createTrans", (req, res) => {
    var transfers = new Transfers(req.body)
    transfers.save(function (err, transfers) {
        if (err) {
            console.log(err)
            return res.status(500).send();
        }
        res.json(201, transfers)
    })
})

//Save sub 
app.post('/api/subscribe', (req, res) => { // Store subscription on server
    const subscription = req.body;
    Subscriptions.findOne({
        endpoint: req.body.endpoint
    }, (err, checksub) => {
        if (err) {
            console.log(err)
        }
        if (checksub) {
            console.log("sub:" + checksub)
            console.log("Already stored");
            res.send("Sub already stored")
        } else {
            console.log("checksub:" + checksub)
            var sub = new Subscriptions(req.body);
            sub.save(function (err, sub) {
                if (err) {
                    return (err)
                }
                res.json(201, sub)
                console.log("NEW SUB ADDED", sub);
            })
        }

    })
});


app.post('/api/push_message', (req, res, next) => {
    let text = req.body.text;

    Subscriptions.find({}, (err, sub) => {
        if (err) {
            console.log(err);
        }
        sub.forEach((elm) => {
            const payload = JSON.stringify({
                text: text,
            });

            webpush.sendNotification(elm, payload).catch(error => {
                console.error(error.stack);
            });
        });
        res.json({
            message: "Sending push messages initiated"
        })
    })
});

//New user
app.post("/signup", (req, res) => {
    var user = new Users(req.body)
    user.save(function (err, user) {
        if (err) {
            console.log(err);
            send.json("fejl");
        }
        res.json(201, user);
    })
})

//Login user
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    Users.findOne({
        username: username,
        password: password
    }, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        if (!user) {
            return res.status(404).send();
        }

        return res.status(200).send(user);

    })
})

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

/**** Start server ****/
const server = app.listen(port,
    () => console.log(`Transfer API running on port ${port}!`));