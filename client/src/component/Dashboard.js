import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("user");
  const [books, setBooks] = useState([]);
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/books/find`
      );
      setBooks(response.data);
      setTemp(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_API}/books/delete/${id}`
      );
      toast.success("Book deleted");
      loadData();
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Cannot delete book");
    }
  };

  const filterData = (e) => {
    setTemp(
      books.filter((f) => f.bookname.toLowerCase().includes(e.target.value))
    );
  };

  const handleSort = (e) => {
    if (sort === "🔼") {
      const sorted = [...books].sort((a, b) => (b.price > a.price ? 1 : -1));
      setTemp(sorted);
      setSort("🔽");
    } else {
      const sorted = [...books].sort((a, b) => (b.price > a.price ? -1 : 1));
      setTemp(sorted);
      setSort("🔼");
    }
  };

  const [isExpanded, setIsExpanded] = useState({});
  const toggleReadMore = (index) => {
    setIsExpanded((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const [sort, setSort] = useState("🔽");

  const maxLength = 20;
  return (
    <div className="container-fluid">
      <Navbar />
      <div
        style={{ marginTop: "70px" }}
        className=" row d-flex justify-content-center"
      >
        <ToastContainer />
        <div className="container d-flex justify-content-center">
          <div
            style={{ width: "150px" }}
            className="form-control  mx-1"
            onClick={handleSort}
          >
            Sort Price {sort}
          </div>
          <input
            type="text"
            className="form-control w-75 m-auto mx-1"
            name="name"
            id=""
            onChange={filterData}
            placeholder="🔍 Search product here..."
          />
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
              className=" card col-md-3 col-lg-2 col-sm-4 col-xl-2 m-2 p-0"
            >
              <div className="card-body">
                <img
                  src={x.img}
                  alt={x.bookname}
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
                <div className="card-body p-3" style={{fontSize:"12px" ,wordSpacing:"inherit"}}>
                  <p className="text-success card-title">{x.bookname}</p>


                  <p className="fs-6">{x.ratings} </p>
                  <p className="fs-6">{x.catagory} </p>

                  <p>₹{x.price}.0</p>

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
                        onClick={() => deleteBook(x._id)}
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
                        onClick={() => toast.success("You liked this book")}
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
