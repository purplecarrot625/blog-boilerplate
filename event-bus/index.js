const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser'); // parse request body

const app = express();
app.use(bodyParser.json()); // parse request body

const events = [];

app.post('/events', async (req, res) => {
    const event = req.body // request body can be any type of event

    events.push(event);

    axios.post('http://posts-clusterip-srv:4000/events', event); // send event to posts service
    axios.post('http://comments-srv:4001/events', event); // send event to comments service
    axios.post('http://query-srv:4002/events', event); // send event to query service
    axios.post('http://moderation-srv:4003/events', event); // send event to moderation service

    res.send({ status: 'OK' });
})

// get all events, toy example
app.get('/events', (req, res) => {
    res.send(events);
})

app.listen(4005, () => {
    console.log('Event Bus service is listening on 4005...');
})