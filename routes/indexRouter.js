const { Router } = require('express');
const express = require('express'); // Change this line
const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

indexRouter.use(express.urlencoded({ extended: false })); // Now this works

indexRouter.get('/', (req, res) => {
    res.render('index', {title: 'Mini Message Board', messages: messages});
})
indexRouter.get('/new', (req, res) => {
    res.render('form', {title: 'New Message'});
});
indexRouter.post('/new', (req, res) => {
    const user = req.body.user;
    const text = req.body.text;
    try {
        messages.push({ text: text, user: user, added: new Date() });
        console.log("Successfully added message");
       res.redirect('/');
    } catch (error) {
        console.error("Error adding message:", error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = indexRouter;