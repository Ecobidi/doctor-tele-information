const express = require('express')
const expressSession = require('express-session')
const connectFlash = require('connect-flash')
const mongoose = require('mongoose')
const fileupload = require('express-fileupload')
// let MongoStore = require('connect-mongo')(expressSession)
// let passport = require('passport')
let { domain, APPNAME, PORT, dbhost, dbport, dbname, sessionsecret, owner_name, owner_mat_no} = require('./config')

// routes
const { DoctorRouter, UserRouter, DepartmentRouter, AdminRouter, LoginRouter, MobileUserRouter } = require('./routes')

// models
const UserModel = require('./models/user')
const AdminModel = require('./models/admin')
const DoctorModel = require('./models/doctor')

// connect to mongodb database
mongoose.connect(`mongodb://${dbhost}:${dbport}/${dbname}`)

// init express App
let app = express()

// view engine 
app.set('view engine', 'ejs')
app.set('views', './views')

// expressStatic
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

// bodyparser middlewares
app.use(express.json())
app.use(express.urlencoded())

app.use(fileupload())

// express-session middleware
app.use(expressSession({
  secret: sessionsecret,
  saveUninitialized: true,
  resave: true,
  // store: new MongoStore({
  //   mongooseConnection: mongoose.connection,
  //   ttl: 14 * 24 * 60 * 60
  // })
}))
// passport middleware
// app.use(passport.initialize())
// app.use(passport.session())
// connect-flash
app.use(connectFlash())

app.use((req, res, next) => {
  // res.locals.errors = req.flash('errors')
  // res.locals.error_msg = req.flash('error_msg')
  // res.locals.success_msg = req.flash('success_msg')
  res.locals.user = req.session.user || { username: 'test' }
  app.locals.owner_name = owner_name
  app.locals.owner_mat_no = owner_mat_no
  app.locals.appname = APPNAME
  app.locals.port = PORT
  app.locals.domain = domain + ':' + PORT
  next()
})

// routes

app.use('/mobile/users', MobileUserRouter)

app.use('/login', LoginRouter)

app.use('/', (req, res, next) => {
  // for authenticating login
  if (req.session.loggedIn) {
    next()
  } else {
    res.redirect('/login')
  }
})

app.get('/logout', (req, res) => {
  req.session.loggedIn = false
  req.session.username = ''
  res.redirect('/login')
})

let getDashboard = async (req, res) => {
  try {
    let admin_count = await AdminModel.count()
    let doctor_count = await DoctorModel.count()
    let user_count = await UserModel.count()
    res.render('dashboard', {admin_count, doctor_count, user_count})
  } catch (err) {
    console.log(err)
    res.render('dashboard', {
      admin_count: 0, doctor_count: 0, user_count: 0,
    })
  }
}

app.get('/', getDashboard)

app.get('/dashboard', getDashboard)

app.use('/doctors', DoctorRouter)

app.use('/departments', DepartmentRouter)

app.use('/admins', AdminRouter)

app.use('/users', UserRouter)


app.listen(PORT, () => { console.log(`${APPNAME} running on port ${PORT}`) })