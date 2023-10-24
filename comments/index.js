const express = require('express');
const { randomBytes } = require('crypto'); // generate random id assigned to post
const bodyParser = require('body-parser'); // parse request body
const cors = require('cors'); // cross origin resource sharing
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // cors middleware, it is a function that will be called anytime a request comes into our server

const commentsByPostId = {}; // store all comments

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []); // if comments exist, return them, otherwise return empty array
})

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex'); // generate random id assigned to post
    const { content } = req.body;

    const comments = commentsByPostId[req.params.id] || []; // if comments exist, return them, otherwise return empty array

    comments.push({ id: commentId, content, status: 'pending' });

    commentsByPostId[req.params.id] = comments; // store comments in commentsByPostId

    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })

    res.status(201).send(comments);
})

app.post('/events', async (req, res) => {
    console.log('Received Event', req.body.type);

    const { type, data } = req.body;

    if(type === 'CommentModerated') {
        // pull out the comment by id, from the commentsByPostId object
        const {postId, id, status, content} = data;

        const comments = commentsByPostId[postId];

        // update the status of the comment
        const comment = comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }

    res.send({});
})

app.listen(4001, () => {
    console.log('Comments service is listening on 4001...');
})