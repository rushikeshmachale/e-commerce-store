import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Orders = () => {
  const id = localStorage.getItem("customerid");
  const [orders, setOrders] = useState([]);

  const role = localStorage.getItem("role");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      let res;
      if (role === "admin") {
        res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/orders/get`);
      } else {
        res = await axios.get(`${process.env.REACT_APP_BACKEND_API}/orders/find/${id}`);
      }
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h2 className="mt-4 text-body-tertiary">Orders</h2>
      <table className="table table-striped mt-4 table-borderless">
        <thead className="bg-primary text-white">
          <tr>
            <th></th>
            <th>CustomerID</th>
            <th>Product</th>
            <th>Catagory</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Status</th>
            {role === 'admin' ? <th>Update</th>:<th></th>}
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((x) => (
              <tr key={x._id}>
                <td>
                  <img src={x.img} alt={x.productname} style={{maxHeight:"60px",maxWidth:"100px",minHeight:"60px",minWidth:"100px"}}  className="rounded-2" />
                </td>
               
                <td>{x.customerid}</td>
                <td>{x.productname}</td>
                <td>{x.catagory}</td>
                <td>{x.quantity}</td>
                <td><b>₹</b> {x.price}/-</td>

                <td>{x.status}</td>
                <td>
                {role !== "admin" ?
                  
                 (
                  <div></div>
                ): (
                  <Link
                    to={`/order/update/${x._id}`}
                    className="text-decoration-none"
                  >
                    Edit
                  </Link>
                ) 
                }
              </td>
                <td>
                  <sup>
                    {new Date(x.createdAt).toLocaleString()}
                  </sup>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={role === 'admin' ? 7 : 6}>Make your first order</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
