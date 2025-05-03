const mongoose = require('mongoose');

main()
    .then((re)=>{
        console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

const User = mongoose.model("User", userSchema)



User.findByIdAndDelete("680e2582abea20929a16853d")
    .then((res) => {
        console.log(res);
    })





// User.deleteMany({ age: 30 })
//     .then((res) => {
//         console.log(res);
//     })







// User.findOneAndUpdate({ name :"Eve"}, {age: 50},{new :true})
// .then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })





// User.updateOne({ age:{$gt:30}}, {age: 50})
// .then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// })




// User.findById("680e266e61fd2f40b80b0ba5")
// .then((res)=>{
//     console.log(res)
// }).catch((err)=>{
//     console.log(err)
// })






// User.insertMany([
//     {
//         name: "Alice",
//         age: 25,
//         email: "Alice@gmail.com"
//     },
//     {
//         name: "Bob",
//         age: 30,
//         email: "Bob@gmail.com"
//     },
//     {
//         name: "Charlie",
//         age: 35,
//         email: "charlie@gmail.com"
//     }
// ])
// .then((res)=>{
//     console.log(res);
// })



// const user2=new User({
//     name:"Eve",
//     age: 45,
//     email: "Eve@gmail.com"
// });

// user2
//     .save()
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });