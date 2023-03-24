const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
//QUICK EXAMPLE
// posts === {
//     'j123j42': {
//         id: 'j123j42',
//         title: 'post title',
//         comments: [
//             {
//                 id: 'klj3kl',
//                 content: 'comment'
//             }
//         ]
//     }
// }

const handleEvent = (type, data) => {

    if (type === 'PostCreated') {  
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    } 
    if (type === 'CommentCreated') {
        const { id, content, postId, status } = data;

        const post = posts[postId];
        post.comments.push({ id, content, status });
    }
    if (type === 'CommentUpdate') {
        const { id, content, postId, status } = data;
        console.log('data', data.comments);
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            console.log('----------', comment);
            return comment.id === id;
        });
        console.log('comment=====sds==', comment);
        comment.status = status;
        comment.content = content;
        console.log('comment=======', comment);
    }
};
app.get('/posts', (req, res) => {
    res.send(posts);
});
app.post('/events', (req, res) => {
    const { type, data } = req.body;
    console.log('type: ', type);
    handleEvent(type, data);
    console.log(posts);
    res.send({});
});




app.listen(4002, async () => {
    console.log('Listening on 4002');
    const res = await axios.get('http://localhost:4005/events');
    for (let event of res.data) {
        console.log('Proccessing event: ', event.type);

        handleEvent(event.type, event.data);
    }
});