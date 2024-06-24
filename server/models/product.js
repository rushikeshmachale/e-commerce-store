import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    ratings:{
        type:String,
        required:true
    },
    catagory:{
        type:String,
        required:true
    },
    reviews:{
        type:String,
        required:true
    },
    
},{
    timestamps:true
})

const products = mongoose.model('products',productsSchema)
export default products



