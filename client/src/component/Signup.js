import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    otpVal: "",
    role: "",
  });

  const [verify, setVerify] = useState({
    backgroundColor: "black",
    text: "Verify",
  });
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);
  const { name, email, password, otpVal } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
      return secure_url;
    } catch (error) {
      console.log(error);
    }
  };
  let flag = false;

  const handleMail = async (e) => {
    e.preventDefault();
    if (email) {
      setOtpStyle({ display: "flex" });
    }

    
    const val = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}/customers/send`,
      {
        email,
      }
    );
    setOtp(val.data.otp);
  };
  const [otp, setOtp] = useState();

  const checkOtp = (e) => {
    e.preventDefault();
    if (otp == otpVal) {
      // setVerify({backgroundColor:"green",text:"Verified"})
      flag = true;
    } else {
      // setVerify({backgroundColor:"black",text:"Verify"})
      flag = false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "" || otpVal === "") {
      toast.error("Please provide all fields");
    }
    if (name === "" || email === "" || password === "" ) {
      toast.error("Please provide all fields");
    }
    setLoading(true);
    if (flag === true) {
      const imgUrl = await uploadImage("image");
      await axios
        .post(`${process.env.REACT_APP_BACKEND_API}/customers/save`, {
          name: name,
          email: email,
          img: imgUrl,
          password: password,
          role: "user",
        })
        .then((e) => {
          setImg(null);
          setLoading(false);
          navigate("/");
        })
        .catch((e) => {
          setLoading(false);
          toast.error("Invalid credentials");
        });
    } else {
      setLoading(false);
      toast.error("Please verify otp first");
    }
  };

  const [otpStyle, setOtpStyle] = useState({
    display: "none",
  });

  return (
    <div className="container">
      <ToastContainer />
      <form action="" className="form-control my-5 w-75 m-auto">
        <h2 className="text-center">Register</h2>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          className="form-control my-2"
          placeholder="Enter your name"
        />
        <div className="form-group col-md-5 mx-auto text-center my-2">
          <button
            type="button"
            className="form-control btn-secondary mt-2"
            onClick={() => document.getElementById("image").click()}
          >
            Upload Image
          </button>
          <input
            type="file"
            accept="image/*"
            id="image"
            className=" d-none"
            onChange={(e) => setImg(e.target.files[0])}
          />
        </div>
        <div className="d-flex">
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            className="form-control my-2 flex-grow-1"
            placeholder="Enter your email"
          />


         

          <button onClick={handleMail} className="btn btn-dark h-100 my-2 mx-1">
            Verify
          </button>
        </div>
        <div style={otpStyle}>
          <input
            type="text"
            name="otpVal"
            id="otpVal"
            value={otpVal}
            onChange={handleChange}
            className=" form-control my-2  "
            placeholder="Enter your email"
          />

        <button onClick={checkOtp} className="btn h-100 my-2 mx-1">
        Validate
        </button>
       
        </div>

        <input
          type="text"
          name="password"
          value={password}
          onChange={handleChange}
          id="password"
          className="form-control my-2"
          placeholder="Create your password"
        />
        <div className="text-center my-3">
          <button
            className="btn btn-info"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Please Wait..." : "Signup"}
          </button>
        </div>
        <div className="text-center my-3">
          <Link to="/" className="text-decoration-none text-danger">
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
