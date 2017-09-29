/**
 * Created by jayzwalker on 9/29/17.
 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const  port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('toUpperCase', (text) => {
    return text.toUpperCase();
})
app.set('view engine', 'hbs');

// MiddleWare
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log)

    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express</h1>')
    // res.send({
    //     name: 'Jayz',
    //     like: [
    //         'Music',
    //         'Food',
    //         'Sport'
    //     ]
    // })

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: ' Welcome to Node Server!',
    })
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page',
   });
});

app.get('/bad', (req, res) => {
   res.send({
       errorMessage: 'Bad Request'
   });
});

app.listen(port, () => [
    console.log(`Server is up running with port ${port}.`)
]);