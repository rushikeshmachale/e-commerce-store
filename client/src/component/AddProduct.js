import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [productData, setproductData] = useState({
    productname: "",
    price: "",
    ratings: "",
    catagory: "",
    reviews: "",
  });
  const { productname, price, ratings, catagory, reviews } = productData;

  const handleChange = (e) => {
    setproductData({ ...productData, [e.target.name]: e.target.value });
  };
  const uploadImage = async (type) => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "images_preset");

    try {
      let cloudName = process.env.REACT_APP_CLOUD_NAME;
      let resourceType = "image";
      let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const imgUrl = await uploadImage("image");
    await axios
      .post(`${process.env.REACT_APP_BACKEND_API}/products/save`, {
        productname:productname,
        img: imgUrl,
        price:price,
        ratings:ratings,
        reviews:reviews,
        catagory:catagory
      })
      .then(() => {
        setImg(null);
        setLoading(false);
        navigate("/home");
      })
      .catch(() => {
        setLoading(true);

        toast.error("Product not added");
      });
  };
  return (
    <div className="container">
      <Navbar />
      <div style={{ marginTop: "100px" }}></div>
      <ToastContainer />
      <form action="" className="form-control my-5">
        <h4 className=" text-center">Add new product</h4>
        <div className="form-row my-3 d-flex flex-wrap justify-content-center">
          <div className="form-group col-md-5 mx-4 my-2">
            <input
              type="text"
              className="form-control "
              name="productname"
              
            autoComplete="off"
              value={productname}
              onChange={handleChange}
              placeholder="Enter Product name"
            />
          </div>

          <div className="form-group col-md-5 mx-4  my-2">
            <input
              type="file"
              accept="image/"
              id="image"
              onChange={(e) => setImg((prev) => e.target.files[0])}
              className=" form-control my-2 "
            />
          </div>
          <div className="form-group col-md-5 mx-4  my-2">
            <input
              type="text"
              className="form-control "
              name="ratings"
              
            autoComplete="off"
              value={ratings}
              onChange={handleChange}
              placeholder="Enter ratings"
            />
          </div>

          <div className="form-group col-md-5 mx-4  my-2">
            <input
              type="text"
              className="form-control "
              name="reviews"
              
            autoComplete="off"
              value={reviews}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </div>
          <div className="form-group col-md-5 mx-4  my-2">
            <input
              type="text"
              className="form-control "
              name="catagory"
              
            autoComplete="off"
              value={catagory}
              onChange={handleChange}
              placeholder="Enter catagory"
            />
          </div>
          <div className="form-group col-md-5 mx-4  my-2">
            <input
              type="text"
              className="form-control "
              name="price"
              
            autoComplete="off"
              value={price}
              onChange={handleChange}
              placeholder="Enter price"
            />
          </div>
          <div className="form-group  mx-4  my-2">
            <button className="btn btn-info" onClick={handleSubmit}>
              {loading ? "Please Wait..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;