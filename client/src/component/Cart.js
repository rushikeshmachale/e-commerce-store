import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  // const { id } = useParams();
  const customerid = localStorage.getItem("customerid");
  const [cart, setCart] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_API}/carts/get/${customerid}`
    );
    setCart(res.data);
    console.log(cart);
  };
  const handleDelete = async (id) => {
    await axios
      .delete(`${process.env.REACT_APP_BACKEND_API}/carts/delete/${id}`)
      .then(() => {
        loadData();
        toast.success("product deleted successfully!!");
      })
      .catch(() => {
        toast.error("product not deleted !");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_API}/orders/save`, {
        customerid: customerid,
        productid: cart.productid,
        img: cart.img,
        productname: cart.productname,
        catagory: cart.catagory,
        price: cart.price,
        status: "pending",
      });
      navigate("/orders");
    } catch (error) {
      toast.error("Couldn't add order");
    }
    // .then(()=>navigate('/orders')).catch(()=>  toast.error("Couldn't add order"))
  };
  return (
    <div className="container">
      <Navbar />
      <ToastContainer />
      <div style={{ marginTop: "60px" }}>
        <h2 className=" text-body-tertiary">Cart</h2>
        <table className="table table-responsive table-borderless ">
          <thead>
            <tr>
              <th></th>
              <th>
                <sup>Product</sup>
              </th>
              <th>
                <sup>Catagory</sup>
              </th>
              <th>
                <sup>Price</sup>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.length > 0 ? (
              cart.map((x) => (
                <tr key={x._id}>
                  <td>
                    <img
                      src={x.img}
                      style={{
                        maxHeight: "60px",
                        maxWidth: "100px",
                        minHeight: "60px",
                        minWidth: "100px",
                      }}
                      className=" rounded-2"
                      alt="Img not found"
                    />
                  </td>
                  <td>{x.productname}</td>
                  <td>{x.catagory}</td>
                  <td>
                    <b> ₹ </b>
                    {x.price} /.
                  </td>
                  <td className="justify-content-center  text-end d-flex ">
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(x._id)}
                    >
                      🗑
                    </button>
                    {/**
                      <button
                      className="btn btn-warning mx-1"
                      onClick={handleSubmit}
                      >
                      💲
                      </button>
                      */}
                  
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
      </div>
    </div>
  );
};

export default Cart;
