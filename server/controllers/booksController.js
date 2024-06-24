import Books from "../models/books.js";
import multer from "multer";
import cloudinary from "cloudinary";

export const addBook = async (req, res) => {
  try {
    const { bookname, img, price, ratings,catagory, reviews } = req.body;
    const newBook = new Books({
      bookname,
      img,
      price,
      ratings,
      catagory,
      reviews,
    });

    // Save the book to the database
    await newBook.save();

    
    return res.status(200).json({ message: "Book saved successfully" });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addBooks = async (req, res) => {
  const booklist = req.body;

  booklist.forEach(async (e) => {
    const book = new Books({
      bookname: e.bookname,
      img: e.img,
      price: e.price,
      ratings: e.ratings,
      reviews: e.reviews,
    });
    await book
      .save()
      .then(() => {
        return res.status(200).json("books saved");
      })
      .catch((e) => {
        return res.status(400).json("books are not added");
      });
  });
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await Books.find();
    return res.status(200).json(books);
  } catch (error) {
    return res.status(200).json(error);
  }
};
export const getBookByID = async (req, res) => {
  const { id } = req.params;

  const book = await Books.findById(id);
  return res.status(200).json(book);
};

export const deleteBookByid = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Books.findByIdAndDelete(id);
    if (result) {
      return res.status(201).json({ message: "Book deleted successfully" });
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(404).json("Book not found");
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookname, img, price, ratings,catagory, reviews } = req.body;

    // const book = await Books.findById(id);
    if (id) {
      await Books.findByIdAndUpdate(id, {
        bookname,
        img,
        price,
        ratings,
        catagory,
        reviews,
      });
      return res.status(200).json("book updated");
    } else {
      return res.status(400).json("book not found");
    }
  } catch (error) {
    return res.status(404).json(error);
  }
};
