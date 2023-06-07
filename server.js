// The dependencies
const express = require('express');
const path = require('path');
const routes = require('./my-app/src/home-routes');
const exphandlebars = require('express-handlebars');
const Profile = require('./my-app/src/Profile');


// Initializing the app and creating a PORT
const app = express();
const PORT = process.env.PORT || 3001;

// Set up body parsing, static & route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);

const handlebars = exphandlebars.create({});

// Informing the express.js which template engine we are using
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Start the server by listening to the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));