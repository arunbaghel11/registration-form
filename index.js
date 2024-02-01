// Importing the Express.js framework
const  express = require("express")

// Importing the bodyParser middleware
const  bodyParser = require("body-parser")

// Importing the Mongoose library
const mongoose = require("mongoose")

// Creating an Express application instance
const app = express()

// Using bodyParser middleware to parse JSON-encoded bodies
app.use(bodyParser.json())

// Serving static files from the 'public' directory
app.use(express.static('public'))

// Using bodyParser middleware to parse URL-encoded bodies with extended syntax
app.use(bodyParser.urlencoded({
    extended: true
}))

// Connecting to a MongoDB database named 'Database' running on the local machine at port 27017
mongoose.connect('mongodb://localhost:27017/Database')

// Creating a reference to the connection to the MongoDB database
const db = mongoose.connection

// Event handler for error when connecting to the database
db.on('error', () => console.log("Error in Connecting to Database"))

// Event handler for successful connection to the database
db.once('open', () => console.log("Connected to Database"))

// Handling HTTP POST requests to the '/sign_up' endpoint
app.post("/sign_up", (req, res) => {
    // Extracting request body parameters
    const name = req.body.name
    const age = req.body.age
    const email = req.body.email
    const phno = req.body.phno
    const gender = req.body.gender
    const password = req.body.password

    // Creating a data object with extracted parameters
    let data = {
        "name": name,
        "age": age,
        "email": email,
        "phno": phno,
        "gender": gender,
        "password": password
    }

    // Inserting data into the 'users' collection in the MongoDB database
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully")
    })

    // Redirecting to 'signup_successful.html' after successful sign-up
    return res.redirect('signup_successful.html')
})

// Handling HTTP GET requests to the root URL ('/')
app.get("/", (req, res) => {
    // Setting response headers
    res.set({
        "Allow-acces-Allow-Origin": '*'
    })

    // Redirecting to 'index.html'
    return res.redirect('index.html')
}).listen(3000);

// Logging a message indicating that the Express application is listening on port 3000
console.log("Listening on port 3000")
