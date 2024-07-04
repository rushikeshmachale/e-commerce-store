
import Cart from "../models/cart.js";

export const addToCart = async (req, res) => {
  //   const { id } = req.params;
const { customerid, productid, img, productname,quantity, catagory, price } = req.body;

  const cart = await new Cart({
    customerid,
    productid,
    productname,
    img,
    catagory,
    price,
    quantity
  });

  await cart
    .save()
    .then(() => {
      return res.status(200).json(cart);
    })
    .catch((e) => {
      return res.status(400).json(e);
    });
};


export const getallcartelements = async (req, res) => {
  try {
    const products = await Cart.find();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(404).json(error);
  }
};


export const findbyproductname=async(req,res)=>{
  const productNameToFind = req.params.productname;

  const products = await Cart.find({ productname: { $regex: new RegExp(productNameToFind, 'i') } });

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'Products not found' });
    }
}
export const getCartByCustID = async (req, res) => {
  const customerIdToFind = req.params.customerid;
  try {
    const products = await Cart.find({ customerid: customerIdToFind });

      res.status(200).json(products);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const deleteCartProduct = async(req,res)=>{
  const {id} = req.params

  if(id){

    await Cart.findByIdAndDelete(id)
    return res.status(200).json('product deleted')
  }else{
    return res.status(400).json('product not found')
  }
}

export const updateCart = async(req,res)=>{
  const {id} = req.params;

  const { customerid, productid, img, productname,quantity, catagory, price } = req.body;


  if(id){
    await Cart.findByIdAndUpdate(id,{customerid, productid, img, productname,quantity, catagory, price})
    return res.status(201).json("cart updated");
  } else {
    return res.status(401).json("cart not found");
  }
}

export const getCastbyProductid=async(req,res)=>{

  const id=req.params

  if(id){
    const cart=await Cart.findById({_id:id})
    return res.status(201).json(cart);
  } else {
    return res.status(401).json("cart not found");
  }
}