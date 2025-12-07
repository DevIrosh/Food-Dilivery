import mongoose from "mongoose";    

const userschema = new mongoose.Schema({
    name: {
        type: String, required: true},
    email: {
        type: String, required: true, unique: true},
    password: {
        type: String, required: true},
   cartdata: {type:Object,default:{}}   
},{minimize:false});

const User = mongoose.models.User || mongoose.model("User", userschema);


export default User;