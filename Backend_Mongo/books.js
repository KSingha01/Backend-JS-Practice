const mongoose = require('mongoose');

main()
    .then((re)=>{
        console.log("Connected to MongoDB");
    })
    .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}

const bookSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        maxLength:20
    },
    author: {
        type:String
    },
    price: {
        type:Number,
        min:[1,"Price is too low for Amazon selling"]
    },
    discount:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        enum:["fiction","non-fiction"]
    },
    genre:[String]
});

const Book = mongoose.model('Book', bookSchema);

Book.findByIdAndUpdate("680e57b1553c9e540d1b8d40",{price:-500},{runValidators:true})
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err.errors.price.properties.message)
    })




// let book1 = new Book({
//     title: "Marvel Comic v2",
//     price: 200,
//     genre:["comics","superhero","fiction"]
// })

// book1.save().then(res => {
//     console.log(res)
// })
//     .catch((err) => {
//         console.log(err)
// })