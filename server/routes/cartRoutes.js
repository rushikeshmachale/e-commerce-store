import express from 'express'
import { addToCart, deleteCartProduct, findbyproductname, getCartByCustID, getCastbyProductid, getallcartelements, updateCart } from '../controllers/cartController.js'

const cartrouter = express.Router()

cartrouter.get('/get/:customerid',getCartByCustID)
cartrouter.post('/add',addToCart)
cartrouter.get('/find',getallcartelements)
cartrouter.get('/find/:productname',findbyproductname)
cartrouter.delete('/delete/:id',deleteCartProduct)
cartrouter.put('/update/:id',updateCart)
cartrouter.get('/getbyp/:id',getCastbyProductid)

export default cartrouter