const log = console.log;
const bodyParser = require('body-parser')
const usersRouter = require('./routes/users');
const craftsRouter = require('./routes/crafts');
const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { mongoose } = require('./db/mongoose')
mongoose.set('bufferCommands', false);  // don't buffer db requests if the db server isn't connected - minimizes http requests hanging if this is the case.
mongoose.set('useFindAndModify', false); // for some deprecation issues

const app = express();
mongoose.set('useFindAndModify', false); 
/*** handlebars: server-side templating engine ***/
const hbs = require('hbs')
// Set express property 'view engine' to be 'hbs'
app.set('view engine', 'hbs')
// setting up partials directory
hbs.registerPartials(path.join(__dirname, '/views/partials'))

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT', 'OPTIONS']
}))

app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/src", express.static(path.join(__dirname, '/public/src')))
app.use("/images", express.static(path.join(__dirname, '/public/images')))
// Routers
app.use(require('./routes/webpage'))
app.use('/users', usersRouter);
app.use('/crafts', craftsRouter);

app.get('*', (req, res) => {
  res.status(404).send("404 Error: We cannot find the page you are looking for.");
});

const port = process.env.PORT || 5000
app.listen(port, () => {
  log(`Listening on port ${port}...`)
}) 
