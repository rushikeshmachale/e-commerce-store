import express from "express";

import { addproduct, addproducts, getAllproducts, getproductByID ,deleteproductByid, updateproduct} from "../controllers/productController.js";

const productrouter = express.Router()

// authentication
productrouter.post('/save',addproduct)
productrouter.post('/save/products',addproducts)
productrouter.get('/find',getAllproducts)
productrouter.get('/get/:id',getproductByID)
productrouter.put('/edit/:id',updateproduct)
productrouter.delete('/delete/:id',deleteproductByid)

export default productrouter