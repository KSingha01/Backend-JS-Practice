const mongoose=require("mongoose");
const Chat = require("../models/chat");

main()
    .then(()=>{
        console.log("Connection Successful")
})
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats=[
    {
        from: "neha",
        to: "priya",
        msg: "send me your exam sheets",
        created_at: new Date()
    },
    {
        from: "rahul",
        to: "amit",
        msg: "let's meet after the lecture",
        created_at: new Date()
    },
    {
        from: "priya",
        to: "neha",
        msg: "I’ll send them by evening",
        created_at: new Date()
    },
    {
        from: "ananya",
        to: "sneha",
        msg: "are you coming to the group study?",
        created_at: new Date()
    },
    {
        from: "amit",
        to: "rahul",
        msg: "sure, I’ll wait at the canteen",
        created_at: new Date()
    },
    {
        from: "sneha",
        to: "ananya",
        msg: "yes, I’m on my way!",
        created_at: new Date()
    }
]

Chat.insertMany(allchats)