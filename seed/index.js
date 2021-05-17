const mongoose = require('mongoose');
const User = require('../models/newUser')
const passport = require('passport')
const dbUrl = process.env.DB_URL  // || 'mongodb://localhost:27017/hris'
//
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

function generatePassword() {
    let password = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
    for (i = 1; i <= 8; i++) {
        let char = Math.floor(Math.random() * str.length + 1);
        password += str.charAt(char)
    }
    return password;
}

async function checkuser() {
    let user = await User.find()

    if (user) {
        console.log(typeof (user))
        console.log(user)
    }
    else {
        let password = generatePassword()
        const newuser = {
            id: 1,
            username: 'admin',
            fullname: 'Bigstep Technology',
            contactNumber: '9988776655',
            type: 'admin',
            department: 'Others',
            role: 'Director',
            email: 'bigstep@gmail.com',
            gender: 'male',
            dob: '01/01/1990',
            attendance: []
        }
        user = await User.register(newuser, password)
        await user.save()
        console.log(`Username: "admin" and Password: "${password}"`)
    }
}

checkuser().then(() => {
    mongoose.connection.close();
})