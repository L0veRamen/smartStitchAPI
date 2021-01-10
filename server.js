const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'root123',
        database: 'smart-brain'
    }
});

console.log(db.select('*').from('users'));


const app = express();
app.use(cors());
app.use(express.json());


// const dataBase = {
//     users: [
//         {
//             id: "001",
//             name: "JC",
//             email: "jc@gmail.com",
//             password: "123",
//             entries: 0,
//             joined: new Date(),
//         },
//         {
//             id: "002",
//             name: "jay",
//             email: "jay123@gmail.com",
//             password: "123456",
//             entries: 0,
//             joined: new Date(),
//         },
//         {
//             id: "003",
//             name: "Bob",
//             email: "bob@gmail.com",
//             password: "123",
//             entries: 0,
//             joined: new Date(),
//         },
//     ],
//     login: [
//         {
//             id: "999",
//             hash: "",
//             email: "jc123@gmail.com",
//         },
//     ],
// };

/**
 * Test main
 */
app.get('/', (req, res) => {
    res.send(dataBase.users);
})

/**
 * SignIn post database
 */

app.post("/signIn", signIn.handleSignIn(db,bcrypt));

// no database sample signin
// app.post("/signIn", (req, res) => {
//     if (
//         req.body.email === dataBase.users[1].email &&
//         req.body.password === dataBase.users[1].password) {
//         res.json("success");
//     } else {
//         res.status(400).json("error logging in !!!");
//     }
// });

/**
 * register  post database
 */

app.post("/register", (req,res)=> {register.handleRegister(req,res,db,bcrypt)});

// no database sample register
// app.post("/register", (req, res) => {
//   const { email, name, password } = req.body;
//
//   dataBase.users.push({
//     id: "004",
//     name: name,
//     email: email,
//     entries: 0,
//     joined: new Date(),
//   });
//   res.json(dataBase.users[dataBase.users.length-1]);
// });

/**
 * profile get database
 */

app.get("/profile/:id", profile.handleProfileGet(db));


// no database sample profile
// app.get("/profile/:id", (req, res) => {
//   const { id } = req.params;
//   let found = false;
//   dataBase.users.forEach((user) => {
//     if (user.id === id) {
//       found = true;
//       return res.json(user);
//     }
//   })
//   if (!found) {
//     res.status(400).json("Not Found");
//   }
// });

/**
 * image put database
 */
app.put("/image",  image.handleImage(db));

// no database sample image
// app.put("/image", (req, res) => {
//   const { id } = req.body;
//   let found = false;
//   dataBase.users.forEach((user) => {
//     if (user.id === id) {
//       found = true;
//       user.entries++;
//       return res.json(user.entries);
//     }
//   })
//   if (!found) {
//     res.status(400).json("Not Found");
//   }
// });

app.post("/imageUrl", (req, res) => image.handleApiCall(req,res));



/**
 * Listen port
 */
app.listen(3000, () => {
    console.log("app is running on port 3000");
});


