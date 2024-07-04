import mongoose from "mongoose";

const orderShema = new mongoose.Schema({
    customerid:{
        type:String,
        required:true
    },
    productid:{
        type:String,
        required:true
    },
    productname:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    catagory:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    quantity:{
        type:Number
    }
    
},
{timestamps:true})

const Orders = mongoose.model('order',orderShema)
export default Orders