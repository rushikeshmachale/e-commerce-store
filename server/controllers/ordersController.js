import Orders from "../models/orders.js";

export const addOrder = async (req, res) => {
  const { customerid, productid, productname, img, catagory, price,status,quantity } = req.body;

  const order = await new Orders({
    customerid,
    productid,
    productname,
    img,
    catagory,
    price,
    status,
    quantity
  });

  await order.save()
  .then(()=>{
    return res.status(200).json(order)
  }).catch(()=>{return res.status(400).json('order not added')})
};

export const getAllOrders = async(req,res)=>{
    try {
        const orders = await Orders.find()
        return res.status(200).json(orders)
    } catch (error) {
        return res.status(400).json(error)
    }
}

export const getOrdersByCustomerid=async(req,res)=>{
    try {
        const id = req.params.customerid
    
        const orders = await Orders.find({customerid:id})
        res.status(200).json(orders)
        
    } catch (error) {
        return res.status(400).json(error)
        
    }
}

export const getOrderByOrderid = async(req,res)=>{
    try {
        const {id} = req.params
    
        const order = await Orders.findById(id)
        return res.status(200).json(order)
    } catch (error) {
        return res.status(400).json(error)
        
    }
}

export const updateOrderByOrderid = async(req,res)=>{
    const {id} = req.params
    const { customerid, productid, productname, img, catagory, price,status ,quantity} = req.body;
    if (id) {
        await Orders.findByIdAndUpdate(id, { customerid, productid, productname, img, catagory, price,status,quantity } );
        return res.status(201).json("order updated");
      } else {
        return res.status(401).json("order not found");
      }
}