const express = require('express');
const { randomBytes } = require('crypto'); // generate random id assigned to post
const bodyParser = require('body-parser'); // parse request body
const cors = require('cors'); // cross origin resource sharing
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}; // store all posts


app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex'); // generate random id assigned to post
    const { title } = req.body; // get title from request body

    posts[id] = {
        id,
        title
    };

    // communicate with the event-bus service
    // 'kubectl get services'
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id,
            title
        }
    });

    res.status(201).send(posts[id]);
})

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type);

    res.send({});
})

app.listen(4000, () => {
    console.log('v55')
    console.log('Post service is listening on 4000...');
});