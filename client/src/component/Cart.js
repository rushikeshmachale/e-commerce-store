// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "./Navbar";
// import { ToastContainer, toast } from "react-toastify";

// const Cart = () => {
//   // const { id } = useParams();
//   const customerid = localStorage.getItem("customerid");
//   const [cart, setCart] = useState([]);
  
//   const [cartid,setcartid]=useState()

//   const [priceval,setPriceval] = useState(1)
//   const [cartdata,setcartdata] = useState({ 
//     productid:"",
//     img:"",
//     productname:"",
//     catagory:"",
//     price:"",})
//     const {productid,img,productname,catagory,price}=cartdata

//   const navigate = useNavigate();
//   useEffect(() => {
//     loadData();
//   }, []);
//   const loadData = async () => {
//     const res = await axios.get(
//       `${process.env.REACT_APP_BACKEND_API}/carts/get/${customerid}`
//     );
//     setCart(res.data)
//     setcartdata({customerid: res.customerid,
//     productid: res.productid,
//     img: res.img,
//     productname: res.productname,
//     quantity:res.quantity,
//     catagory: res.catagory,
//     price: res.price,});
    
//     // console.log(cart);
//   };
//   const [quantity,setQuantity] = useState(2)
//   const handleDelete = async (id) => {
//     await axios
//       .delete(`${process.env.REACT_APP_BACKEND_API}/carts/delete/${id}`)
//       .then(() => {
//         loadData();
//         toast.success("product deleted successfully!!");
//       })
//       .catch(() => {
//         toast.error("product not deleted !");
//       });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${process.env.REACT_APP_BACKEND_API}/orders/save`, {
//         customerid: customerid,
//         productid: cart.productid,
//         img: cart.img,
//         productname: cart.productname,
//         catagory: cart.catagory,
//         price: cart.price,
//         status: "pending",
//       });
//       navigate("/orders");
//     } catch (error) {
//       toast.error("Couldn't add order");
//     }
//     // .then(()=>navigate('/orders')).catch(()=>  toast.error("Couldn't add order"))
//   };


//   // const handleCart=async(e)=>{
//   //   e.preventDefault();
//   //   try {
//   //     await axios.put(`${process.env.REACT_APP_BACKEND_API}/carts/update/${cartid}`, {
//   //       customerid: customerid,
//   //       productid: cart.productid,
//   //       img: cart.img,
//   //       productname: cart.productname,
//   //       catagory: cart.catagory,
//   //       price: (cart.price)/quantity,
//   //       quantity: cart.quantity,
//   //     })
//   //     // .then(()=>console.log("object")).catch(()=>toast.error("error while updating cart"))
//   //   }catch(error){
//   //     toast.error(error)
//   //   }
//   // }
//   const quantityplus=async(x)=>{
//     setQuantity(quantity+1)
//     setPriceval((price+1000) )

//     // console.log();
   
//     setcartdata({customerid: x.customerid,
//       productid: x.productid,
//       img: x.img,
//       productname: x.productname,
//       quantity:x.quantity,
//       catagory: x.catagory,
//       price: x.price,});
//     // let y=quantity

//     console.log(price);
//     try {
//       await axios.put(`${process.env.REACT_APP_BACKEND_API}/carts/update/${x}`, {
//         customerid: customerid,
//         productid: x,
//         img: img,
//         productname: productname,
//         catagory: catagory,
//         price:price,
//         quantity: quantity,
//       })
//       .then(()=>loadData()).catch(()=>toast.error("error while updating cart"))
//     }catch(error){
//       toast.error(error)
//     }
//   }
//   const quantityminus=async(x)=>{
//     quantity>1&& setQuantity(quantity-1)

//     // console.log();
   
//     setcartdata({customerid: x.customerid,
//       productid: x.productid,
//       img: x.img,
//       productname: x.productname,
//       quantity:x.quantity,
//       catagory: x.catagory,
//       price: x.price,});
//     // let y=quantity

//     console.log(price);
//     try {
//       await axios.put(`${process.env.REACT_APP_BACKEND_API}/carts/update/${x}`, {
//         customerid: customerid,
//         productid: x,
//         img: img,
//         productname: productname,
//         catagory: catagory,
//         price:price,
//         quantity: quantity,
//       })
//       .then(()=>loadData()).catch(()=>toast.error("error while updating cart"))
//     }catch(error){
//       toast.error(error)
//     }
//   }
//   return (
//     <div className="container">
//       <Navbar />
//       <ToastContainer />
//       <div style={{ marginTop: "60px" }}>
//         <h2 className=" text-body-tertiary">Cart</h2>
//         <table className="table table-responsive table-borderless ">
//           <thead>
//             <tr>
//               <th></th>
//               <th>
//                 <sup>Product</sup>
//               </th>
//               <th>
//                 <sup>Catagory</sup>
//               </th>
             
//               <th>
//                 <sup>Quantity</sup>
//               </th>
//                <th>
//                 <sup>Price</sup>
//               </th>
//               <th>
//                 <sup>Action</sup>
//               </th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody>
//             {cart.length > 0 ? (
//               cart.map((x) => (
//                 <tr key={x._id}>
                
//                   <td>
//                     <img
//                       src={x.img}
//                       style={{
//                         maxHeight: "60px",
//                         maxWidth: "100px",
//                         minHeight: "60px",
//                         minWidth: "100px",
//                       }}
//                       className=" rounded-2"
//                       alt="Img not found"
//                     />
//                   </td>
//                   <td>{x.productname}</td>
//                   <td>{x.catagory}</td>
//                   <td> 
                  
//                   <button onClick={()=>quantityminus(x._id)}>-</button>
//                   {x.quantity}
//                   <button onClick={()=>quantityplus(x._id)}>+</button>
                  
                  
//                   </td>
//                   <td>{x.price}</td>
                  
//                   <td className="justify-content-center  text-end d-flex ">
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleDelete(x._id)}
//                     >
//                       🗑
//                     </button>
//                     {/**
//                       <button
//                       className="btn btn-warning mx-1"
//                       onClick={handleSubmit}
//                       >
//                       💲
//                       </button>
//                       */}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr className="card m-3 p-3">
//                 <td>Cart is empty</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Cart;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const customerid = localStorage.getItem("customerid");
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/carts/get/${customerid}`);
      setCart(res.data);
      calculateTotal(res.data);
    } catch (error) {
      toast.error("Failed to load cart data");
    }
  };

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    setTotalAmount(total);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_API}/carts/delete/${id}`);
      loadData();
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Product not deleted!");
    }
  };

  const updateCartQuantity = async (productId, newQuantity) => {
    try {
      const product = cart.find(item => item._id === productId);

      if (product) {
        const unitPrice = product.price / product.quantity;
        const updatedPrice = unitPrice * newQuantity;

        await axios.put(`${process.env.REACT_APP_BACKEND_API}/carts/update/${productId}`, {
          quantity: newQuantity,
          price: updatedPrice,
        });

        loadData();
      }
    } catch (error) {
      toast.error("Error while updating cart");
    }
  };

  const increaseQuantity = (productId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    updateCartQuantity(productId, newQuantity);
  };

  const decreaseQuantity = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1;
      updateCartQuantity(productId, newQuantity);
    }
  };

  const handleOrder = async (product) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_API}/orders/save`, {
        customerid: customerid,
        productid: product.productid,
        img: product.img,
        productname: product.productname,
        catagory: product.catagory,
        price: product.price,
        quantity: product.quantity,
        status: "pending",
      });
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      toast.error("Couldn't place order");
    }
  };

  const handleOrderAll = async () => {
    try {
      await Promise.all(cart.map((product) =>
        axios.post(`${process.env.REACT_APP_BACKEND_API}/orders/save`, {
          customerid: customerid,
          productid: product.productid,
          img: product.img,
          productname: product.productname,
          catagory: product.catagory,
          price: product.price,
          quantity: product.quantity,
          status: "pending",
        })
      ));
      toast.success("All orders placed successfully!");
      navigate("/orders");
    } catch (error) {
      toast.error("Couldn't place all orders");
    }
  };

  return (
    <div className="container">
      <Navbar />
      <ToastContainer />
      <div style={{ marginTop: "60px" }}>
        <h2 className="text-body-tertiary">Cart</h2>
        <table className="table table-responsive table-borderless">
          <thead>
            <tr>
              <th></th>
              <th><sup>Product</sup></th>
              <th><sup>Category</sup></th>
              <th><sup>Quantity</sup></th>
              <th><sup>Price</sup></th>
              <th className="d-flex align-items-center text-center justify-content-center"><sup>Actions</sup></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.img}
                      style={{
                        maxHeight: "60px",
                        maxWidth: "100px",
                        minHeight: "60px",
                        minWidth: "100px",
                      }}
                      className="rounded-2"
                      alt="Img not found"
                    />
                  </td>
                  <td>{item.productname}</td>
                  <td>{item.catagory}</td>
                  <td>
                    <button className="btn btn-warning m-1" onClick={() => decreaseQuantity(item._id, item.quantity)}>-</button>
                    {item.quantity}
                    <button className="btn btn-success m-1" onClick={() => increaseQuantity(item._id, item.quantity)}>+</button>
                  </td>
                  <td>₹ {item.price}/-</td>
                  <td className="d-flex align-items-center text-center justify-content-center ">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      🗑
                    </button>
                    <button
                      className="btn btn-success mx-1"
                      onClick={() => handleOrder(item)}
                    >
                      Order
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="card m-3 p-3">
                <td>Cart is empty</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="text-end mt-3">
        <hr />
          <h5>Total Amount: {totalAmount}</h5>
        </div>

        {cart.length > 0 && (
          <div className="text-end mt-3">
            <button className="btn btn-secondary" onClick={handleOrderAll}>
              Order All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
