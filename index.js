require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client')));

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
console.log('publicVapidKey == ', publicVapidKey);
console.log('privateVapidKey == ', privateVapidKey);

webPush.setVapidDetails('mailto:test@example.com', publicVapidKey, privateVapidKey);

// Subscribe route

app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    console.log('subscribe == ', subscription);

    res.status(201).json({});

    setInterval(function (_subscription) {
        // create payload
        const payload = JSON.stringify({ title: 'Push notifications with Service Workers' });
        webPush.sendNotification(_subscription, payload).catch(error => console.error(error));
    }, 3000, subscription);

});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});
