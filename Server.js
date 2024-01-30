// const Express = require('express')
// const App = Express();
// const PORT = 5000;
// App.listen(PORT, () =>
//     console.log('Hi Guys is server in running in port 5000'
// ))

const Express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = Express();

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/Test')
.then(() => {
    console.log("mongodb connected")
}).catch((err)=>{console.log(err)});


const userschema = new mongoose.Schema({
firstname: String,
lastname: String,
email: String,
Phone: Number,
});

const User = mongoose.model('User',userschema);

app.get('/user',(req,res)=>{
    User.find()
    .then((users)=>{res.send(users)})
    .catch((err)=>{res.send(err)})
})

app.post('/users',(req,res) =>{
    const user = new User(req.body);
    user.save()
    .then(() =>{
        res.send(user);
        console.log(user,"Added User");
    })

    .catch((err)=>{
        res.send(err);
    })
})


app.listen(5000, ()=>{
    console.log('Server is Running on port 5000');
});
