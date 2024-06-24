import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("user");
  const [products, setProducts] = useState([]);
  const [temp, setTemp] = useState([]);
  const [sort, setSort] = useState("🔽");
  const [isExpanded, setIsExpanded] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/products/find`
      );
      setProducts(response.data);
      setTemp(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_API}/products/delete/${id}`
      );
      toast.success("Product deleted");
      loadData();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Cannot delete product");
    }
  };

  const filterData = (e) => {
    setTemp(
      products.filter((f) => f.productname.toLowerCase().includes(e.target.value.toLowerCase()))
    );
  };

  const handleSort = () => {
    if (sort === "🔼") {
      const sorted = [...products].sort((a, b) => (b.price > a.price ? 1 : -1));
      setTemp(sorted);
      setSort("🔽");
    } else {
      const sorted = [...products].sort((a, b) => (b.price > a.price ? -1 : 1));
      setTemp(sorted);
      setSort("🔼");
    }
  };

  const toggleReadMore = (index) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const searchData = (catagory) => {
    setSelectedCategory(catagory);
    if (catagory === "all") {
      setTemp(products);
    } else {
      setTemp(products.filter(product => product.catagory === catagory));
    }
  };

  const maxLength = 20;

  return (
    <div className="container-fluid">
      <Navbar />
      <div
        style={{ marginTop: "70px" }}
        className="row d-flex justify-content-center"
      >
        <ToastContainer />
        <div className="container justify-content-center">
          <input
            type="text"
            autoComplete="off"
            className="form-control w-75 m-auto"
            name="name"
            id=""
            onChange={filterData}
            placeholder="🔍 Search product here..."
          />
          <div className="my-2 d-flex w-75 m-auto">
            <div className="form-control w-25 m-1" onClick={handleSort}>
              Sort Price {sort}
            </div>
            <div className="d-flex flex-wrap border justify-content-between w-75 border-1 rounded-2 align-items-center">
              <div className="btn m-1 flex-fill text-center" onClick={() => searchData("all")}> all </div>
              <div className="btn m-1 flex-fill text-center" onClick={() => searchData("electronics")}> electronics </div>
              <div className="btn m-1 flex-fill text-center" onClick={() => searchData("fashion")}> fashion </div>
              <div className="btn m-1 flex-fill text-center" onClick={() => searchData("footwear")}> footwear </div>
              <div className="btn m-1 flex-fill text-center" onClick={() => searchData("home")}> home </div>
            </div>
          </div>
        </div>
        {temp.map((x, index) => {
          const needsTruncation = x.reviews.length > maxLength;
          const isCurrentExpanded = isExpanded[index] || false;
          const displayedReview = isCurrentExpanded
            ? x.reviews
            : `${x.reviews.slice(0, maxLength)}...`;

          return (
            <div
              key={index}
              className="card col-md-3 col-lg-2 col-sm-4 col-xl-2 m-2 p-0"
            >
              <div className="card-body">
                <img
                  src={x.img}
                  alt={x.productname}
                  className="card-img-top card-text rounded-top img-fluid"
                  style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    minHeight: "150px",
                    maxHeight: "150px",
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
                <div
                  className="card-body p-3"
                  style={{ fontSize: "12px", wordSpacing: "inherit" }}
                >
                  <p className="text-success card-title">{x.productname}</p>
                  <p>{x.ratings}</p>
                  <p>{x.catagory}</p>
                  <p className="fs-6">₹{x.price}.0</p>
                  <div className="w-75">
                    <p className="text-wrap">
                      {displayedReview}
                      {needsTruncation && (
                        <button
                          onClick={() => toggleReadMore(index)}
                          className="btn p-0"
                        >
                          {isCurrentExpanded ? " 🔼" : " 🔽"}
                        </button>
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  {role === "admin" ? (
                    <div className="card-text mx-2 d-flex justify-content-between align-items-center">
                      <button
                        onClick={() => deleteProduct(x._id)}
                        className="btn btn-danger"
                      >
                        🗑
                      </button>
                      <Link
                        to={`/view/${x._id}`}
                        className="btn btn-warning mx-2"
                      >
                        👁
                      </Link>
                      <Link to={`/edit/${x._id}`} className="btn btn-success">
                        ✒
                      </Link>
                    </div>
                  ) : (
                    <div className="card-text mx-2 d-flex justify-content-between align-items-center">
                      <button
                        onClick={() => toast.success("You liked this product")}
                        className="btn btn-danger"
                      >
                        ♥
                      </button>
                      <Link to={`/view/${x._id}`} className="btn btn-info">
                        🛒
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
