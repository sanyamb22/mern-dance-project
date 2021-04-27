const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser')
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 80;

// mongodb and mongoose stuff
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});

var Contact = new mongoose.model('Contact', contactSchema)

// Express stuff
// app.use(express.static(`static`, options))S
app.use('/static', express.static(`static`));
app.use(express.urlencoded());

// Pug stuff
app.set(`view engine`, `pug`)
app.set(`views`, path.join(__dirname, `views`))

// endpoints
app.get(`/`, (req, res) => {
    const con = ``;
    res.status(200).render(`home.pug`)
})

app.get(`/contact`, (req, res) => {
    const con = ``;
    res.status(200).render(`contact.pug`)
})

app.post(`/contact`, (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.render(`submitted.pug`)
    }).catch(() => {
        res.send(400).send("data was not saved to database")
    });
});

app.get(`/index`, (req, res) => {
    const con = ``;
    res.status(200).render(`index.pug`)
})


// starting the server
app.listen(port, () => {
    console.log(`the application has been started successfully on port ${port}`);
});