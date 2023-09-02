const mongoose = require('mongoose');
// const User = require('../models/user');
// const Post = require('../models/post');
// const { posts, users } = require('../data/data');
const connectDB = async () => {
    try{
        mongoose.set("strictQuery", false);
        const conn = await mongoose.connect(process.env.DB_URI_LOCAL);
        console.log(`Database connected ${conn.connection.host}`.yellow.underline);
        // Add dummy users and posts
        // User.insertMany(users);
        // Post.insertMany(posts);
    }catch(err){
        console.log("Error connecting to database");
        process.exit(1)
    }
}

module.exports= connectDB;