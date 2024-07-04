import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    customerid:{
        type:String,
        required:true
    },
    productid:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    productname:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    catagory:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        
    }
},
{
    timestamps:true
})

const Cart = mongoose.model('cart',cartSchema)
export default Cart