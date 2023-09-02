const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user");



// Register User
const register = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } =req.body
        
        const saltRounds = 12;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password : hashedPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json({ error : err.message });
    }
}

//LOGIN USER
const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email : email });
        if(!user) return res.status(400).json({ message : "User does not exist" });
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message : "Wrong credentials" });
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({user, token});
    }catch(err) {
        res.status(500).json({ error : err.message });
    }
} 

module.exports = {
    register, 
    login
};