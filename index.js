const express = require('express')
const morgan = require('morgan')
const database = require('./data.js')

const app = express()


// Parse JSON bodies
app.use(express.json());


const PORT = 3000
const bodyParser = require("body-parser")
const crypto = require("crypto")

// set the Engine Template
app.set('view engine', 'ejs')

// app.set('views', path.join(__dirname, 'views'));

//setup public folder
app.use(express.static('./public'));
// ============================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'))
// End set the server


app.get('/', (req, res) => {
    res.render('pages/index' ) 
})

app.get('/users', (req, res) => {
    res.render('pages/users',{
        users: database.users
    } )
})


app.get('/user/:id', (req, res) => {
    res.render('pages/user', {
        user: database.users[req.params.id]
    })
})



app.get('/schedules', (req, res) => {
    // const myName = req.params.id
    res.render('pages/schedules',{
        schedules: database.schedules,
        users: database.users
    } )
})

app.get('/schedule/:id', (req, res) => {
    let result = database.schedules.filter((item) => item.user_id === +req.params.id);

    res.render('pages/schedule', {
        schedules: result
    })
})

//STEP 4 ----------------------------------------------------------------------

// POST NEW USERS 

app.get("/users/new", (req, res) => {
    res.render("pages/newusers");
  });

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
    database.users.push(newUser);
    res.render("pages/users", { users: database.users})
  });

  // POST NEW SCHEDULES 

  app.get("/schedules/new", (req, res) => {
    res.render("pages/newschedules");
  });

  app.post('/schedules', (req, res) => {
    const newSchedule = {
        'user_id': Number(req.body.user_id),
        'day': Number(req.body.day),
        'start_at': req.body.start_at,
        'end_at': req.body.end_at,
    }
    console.log(newSchedule);
    database.schedules.push(newSchedule);
      res.render('pages/schedules', { schedules: database.schedules})
})

app.listen(PORT, () => {
    console.log(`server is listening on localhost:${PORT}!\n`)
})

// PROJECT A -------------------------------------------------------

// app.get('/', (req, res) => {
//     console.log(res)
//     res.send('Welcome to our schedule website')
// })

// app.get('/users', (req, res) => {
//     res.send(data.users)
// })

// app.get('/schedules', (req, res) => {
//     console.log(data.schedules)
//     res.send(data.schedules)
// })

// app.get('/users/:id', (req,res)=> {
//     res.json(data.users[req.params.id])
// })

// app.get('/users/:id/schedules', (req, res) => {
//     let result = data.schedules.filter((item) => item.user_id == req.params.id);
//     if (result.length === 0 ) result = { msg: `there is no schedules with user id=${req.params.id}` };
//     res.json(result);
//    });



// app.post('/schedules', (req, res) => {
//     const newSchedule = {
//         'user_id': Number(req.body.user_id),
//         'day': Number(req.body.day),
//         'start_at': req.body.start_at,
//         'end_at': req.body.end_at
//     }
//     data.schedules.push(newSchedule);
//     res.render('content_schedules',{schedules: data.schedules})
// })



// app.post("/users", (req, res) => {
//     console.log(req.body);
//     const psw = req.body.password;
//     const passwordEncr = crypto.createHash("sha256").update(psw).digest("hex");
//     const newUser = {
//       firstname: req.body.firstname,
//       lastname: req.body.lastname,
//       email: req.body.email,
//       password: passwordEncr,
//     };
//     console.log(newUser);
//     console.log(data.users.push(newUser));
//     res.send("Is it even working?!");
//   });

///// PROJECT B -------------------------------------



// app.get('/users', (req, res) => {
//     // const myName = req.params.id
//     res.render('pages/index',{
//         users: database.users
//     } )
// })

// app.get('/schedules', (req, res) => {
//     // const myName = req.params.id
//     res.render('pages/index',{
//         schedules: database.schedules
//     } )
// })

// app.listen(PORT, () => {
//     console.log(`server is listening on localhost:${PORT}!\n`)
// })