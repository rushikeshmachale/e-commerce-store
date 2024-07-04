import Product from "../models/product.js";

export const addproduct = async (req, res) => {

    const { productname, img, price, ratings,catagory, reviews } = req.body;
    const newproduct = await new Product({
      productname,
      img,
      price,
      ratings,
      catagory,
      reviews, 
    });

    await newproduct.save()
    .then(() => {
      return res.status(200).json("newproduct");
    })
    .catch((e) => {
      return res.status(400).json(e);
    });
};

export const addproducts = async (req, res) => {
  const productlist = req.body;

  productlist.forEach(async (e) => {
    const product = new Product({
      productname: e.productname,
      img: e.img,
      price: e.price,
      ratings: e.ratings,
      reviews: e.reviews,
    });
    await product
      .save()
      .then(() => {
        return res.status(200).json("products saved");
      })
      .catch((e) => {
        return res.status(400).json("products are not added");
      });
  });
};

export const getAllproducts = async (req, res) => {
  try {
    const product = await Product.find();
    return res.status(200).json(product);
  } catch (error) {
    return res.status(200).json(error);
  }
};
export const getproductByID = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);
  return res.status(200).json(product);
};

export const deleteproductByid = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Product.findByIdAndDelete(id);
    if (result) {
      return res.status(201).json({ message: "product deleted successfully" });
    } else {
      return res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json("product not found");
  }
};

export const updateproduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productname, img, price, ratings,catagory, reviews } = req.body;

    // const product = await products.findById(id);
    if (id) {
      await Product.findByIdAndUpdate(id, {
        productname,
        img,
        price,
        ratings,
        catagory,
        reviews,
      });
      return res.status(200).json("product updated");
    } else {
      return res.status(400).json("product not found");
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};
