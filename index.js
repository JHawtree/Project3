const express = require('express')
const morgan = require('morgan')
const app = express()

app.set('view engine', 'ejs')
app.use(morgan('dev'))

const PORT = 3000
const data = require('./data.js')
const bodyParser = require("body-parser")
const crypto = require("crypto")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// PROJECT A -------------------------------------------------------

app.get('/', (req, res) => {
    console.log(res)
    res.send('Welcome to our schedule website')
})

app.get('/users', (req, res) => {
    res.send(data.users)
})

app.get('/schedules', (req, res) => {
    console.log(data.schedules)
    res.send(data.schedules)
})

app.get('/users/:id', (req,res)=> {
    res.json(data.users[req.params.id])
})

app.get('/users/:id/schedules', (req, res) => {
    let result = data.schedules.filter((item) => item.user_id == req.params.id);
    if (result.length === 0 ) result = { msg: `there is no schedules with user id=${req.params.id}` };
    res.json(result);
   });

app.post('/schedules', (req, res) => {
    const newSchedule = {
        'user_id': Number(req.body.user_id),
        'day': Number(req.body.day),
        'start_at': req.body.start_at,
        'end_at': req.body.end_at
    }
    data.schedules.push(newSchedule);
    res.render('content_schedules',{schedules: data.schedules})
})


app.post("/users", (req, res) => {
    console.log(req.body);
    const psw = req.body.password;
    const passwordEncr = crypto.createHash("sha256").update(psw).digest("hex");
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: passwordEncr,
    };
    console.log(newUser);
    console.log(data.users.push(newUser));
    res.send("It's working");
  });

app.listen(PORT, () => {
    console.log(`server is listening on localhost:${PORT}!\n`)
})


// curl -d "firstname=Donald&lastname=Duck&email=coincoin@gmail.com&password=daisy" -X POST localhost:3000/users