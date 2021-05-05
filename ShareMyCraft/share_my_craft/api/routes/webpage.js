// Webpage routes
const log = console.log

// express
const express = require('express');
const router = express.Router(); // Express Router

// import the student mongoose model
const { User } = require('../models/User')
const { Craft } = require('../models/Craft')
const { Try } = require('../models/Try')
const { Comment } = require('../models/Comment')

// helpers/middlewares
const mongoChecker = (req, res, next) => {
    // check mongoose connection established.
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    } else {
        next()
    }
}
// checks for first error returned by promise rejection if Mongo database suddently disconnects
const isMongoError = (error) => { 
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}
const userChecker = (req, res, next) => {
  // user cookies to get current user
  const userId = req.params.userId
  if (!userId) { //check if the userId is valid
    res.status(404).send('Resource not found') 
  } else {
    // Find a user by id 
    User.findOne({ _id: userId }).then((user) => {
      if (!user) {
        return Promise.reject()
      } else {
        req.user = user
        next()
      }
    }).catch((error) => {
      res.status(500).send('Internal Server Error')
    })
  }
}
const adminChecker = (req, res, next) => {
  // use cookies to get current user
  const userId = req.cookies.userId

  if (!userId) {//check if the userId is valid
    res.status(404).send('Resource not found')
  } else {
    // FInd user by id
    User.findOne({ _id: userId }).then((user) => {
      if (!user) {
        return Promise.reject()
      } else {
        if (user.userType !== 'admin') {
          return Promise.reject()
        } else {
          req.user = user
          next()
        }
      }
    }).catch((error) => {
      res.status(500).send('Internal Server Error')
    })
  }
}
const validateChecker = (req, res, next) => {		
    if (req.cookies.userId) {
        res.redirect('/index'); // redirect to dashboard if logged in.
    } else {
        next(); // next() moves on to the route.
    }    
}
const craftChecker = (req, res, next) => {
  // user cookies to get current user
  const craft_id = req.params.craft_id
  // console.log(userId)
  if (!craft_id) { //check if the userId is valid
    res.status(404).send('Resource not found') 
  } else {
    // Find a user by id 
    Craft.findOne({ _id: craft_id }).then((craft) => {
      if (!craft) {
        return Promise.reject()
      } else {
        // req.craft = user
        next()
      }
    }).catch((error) => {
      res.status(500).send('Internal Server Error')
    })
  }
}
/*** Webpage routes below **********************************/
router.get('/', (req, res) => {
	res.redirect('/index')
})
router.get('/index', (req, res) => {
	res.render('index.hbs');
})
// login route serves the login page
router.get('/login', validateChecker , (req, res) => {
	res.render('login.hbs');
})
router.get('/signup', validateChecker , (req, res) => {
	res.render('signup.hbs');
})
router.get('/craft/:craft_id', craftChecker, (req, res) => {
	res.render('craft.hbs');
})
router.get('/personal/:userId', userChecker, (req, res) => {
	res.render('personal.hbs');
})
router.get('/admin', adminChecker, (req, res) => {
	log('called', 138)
	res.render('admin.hbs')
})

// export the router
module.exports = router
