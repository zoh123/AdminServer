const express = require('express')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('./db/mongoose')
const errorHandler = require('errorhandler')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const app = express()
const port =  process.env.PORT || 5000

const Admin = require('../models/Admin')


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(passport.initialize())
app.use(passport.session())
