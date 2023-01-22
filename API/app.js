// fake db
// let db = [
//   {
//       id: 0,
//       taskName: "do your bed",
//       status: "notStartedYet"
//   },
//   {
//       id: 190,
//       taskName: "prepare for exam",
//       status: "done"
//   }
// ]



// require(['foo'], function (foo) {
//   //foo is now loaded.
// });
const cors = require('cors');
// const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const serverSecret = 'bahoi'
var db = require("./database")

app.use(express.urlencoded({ extended: false }))
app.use(express.json()) //we expect JSON data to be sent as payloads
app.use(cors())

const logger = require('morgan'); //importing a HTTP logger

app.use(logger('dev')); //using the HTTP logger library

// middleware
function verifyToken(req, res, next) {
  let token = req.headers['authorization'] 
  if (token) {
      jwt.verify(token, serverSecret, (err, decoded) => {
          if (err) {
              if (err.expiredAt) {
                  console.log('tokenul tau a expirat')
                  res.status(403)
                  res.send('expiredToken')
              }
              else  {
                  console.log('tokenul tau nu este bun')
                  res.status(403)
                  res.send('brokenToken')
              }
          } else {
              console.log(decoded)
              req.email = decoded.data
              next()
          }
      })


      next()
  } else {
      res.status(401)
  }
  
}


app.get('/', (req, res) => {
res.status(200);
res.send(db)
});

//REGISTER
app.post('/user', async (req, res) => {
  console.log('YOU ARE USING -POST- METHOD WITH:', req.body)

  let data = req.body
  console.log(data)
  let emailExist = false;
  const userRef = db.collection("users")
  console.log(userRef)

  const snapshot = await userRef.where("email", "==", data.email).get();
  if (!snapshot.empty) {
    emailExist = true;
  }

  if (emailExist) {
    console.log("Email already linked to an account!")
    res.send("Email already linked to an account!")
  } else {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(data.password, salt, async function(err, hash) {
            data.password = hash
            // console.log("===============================================") used for debugging
            console.log(data)
            // console.log("===============================================") used for debugging
            const user = await db.collection("users").add(data)
            console.log(`You have succesfully registered with mail ${user.id}`)
            res.send("Successful registration!")
        })
    });
  }
});

app.post("/login", async (req, res) => {
  // console.log('vrei sa te autentifici cu ', ${dataemailAddress})
  let data = req.body
  let existingUser = false

   
  const userDb = db.collection("users")
  const user = await userDb.where("email", "==", data.email).get()
  
  if ( user.empty) {
      let response = {}
      response.user = false
      response.message = "No user found"
      res.json(response)
      console.log('utilizatorul nu exista')
  } else {
      existingUser = true
      user.forEach((doc) => {
      bcrypt.compare(data.password, doc.password, function(err, result) {
          if (result) {

              let token = jwt.sign(
                { 
                  data: user.emailAddress
                },
                  serverSecret,
                    { expiresIn: '1h' }
                );

              console.log('tokenul tau este: ', token)
              res.send({token})
              response.message = "You have access to edit resources for 1 hour"
          } else {
            let response = {}
            response.message = "Wrong password or email"
            res.json(response)
            console.log('Wrong password or email address')
          } 
        })
      });
  }

  
  // res.send(response)

})

app.post('/tasks', verifyToken,(req, res) => {

  if (req.email === 'mihai.gheorghe@gdm.ro') {
      console.log('vrei sa adaugi taskul cu detaliile ', req.body)
      res.send('am adaugat')
  } else {
      res.status(403)
      res.send('Incerci sa adaugi o resursa pentru alta adresa de email')
  }


})

app.listen(port, () => {
console.log(`Example app listening on port ${port}!`)
});