const router = require('express').Router()
const { Router } = require('express')
const categorycontroller = require('../controllers/categorycontroller')
const subcategorycontroller = require('../controllers/subcategorycontroller')
const productcontroller = require('../controllers/productcontroller')
const usercontroller = require('../controllers/usercontroller')
const dashboardcontroller = require('../controllers/dashboardcontroller')
const ordercontroller = require('../controllers/ordercontroller')
const multer = require('multer')
 
// --------------------------------------Multer session Start---------------------------------
// category Multer Start

const categorystorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/category')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log(file)
      cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
    }
  })
  const categoryupload = multer({ storage: categorystorage })

// category Multer End


//   Subcategory Multer start
const subcategorystorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/subcategory')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log(file)
      cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
    }
  })
  const subcategoryupload = multer({ storage: subcategorystorage })
//   Subcategory Multer end


//   Product Multer start
const productstorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/product')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      console.log(file)
      cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
    }
  })
  const productupload = multer({ storage: productstorage })
//   Product Multer end

router.post("/register",usercontroller.register)
router.post("/login",usercontroller.login )
// register and login routes end


// // middleware route start
// router.use(require('../config/middleware'))
// middleware route end


// change password start
router.post("/changepassword",usercontroller.changepassword)
router.post("/getallusers",usercontroller.getallusers)
router.post("/getsingleuser",usercontroller.getsingleuser)
// change password end


// Dashboard routes start
router.post("/dashboard",dashboardcontroller.dashboard)
// Dashboard routes end


// category routes start

router.post("/addcategory",categoryupload.single('category_image'),categorycontroller.addcategory)
router.post("/getallcategory",categorycontroller.getallcategory)
router.post("/getsinglecategory",categorycontroller.getsingle)
router.post("/updatecategory",categoryupload.single('category_image'),categorycontroller.updateCategory)
// category routes end


// sub categhory routes start

router.post("/addsubcategory",subcategoryupload.single('sub_category_image'),subcategorycontroller.addsubcategory)
router.post("/allsubcategory",subcategorycontroller.allsubcategory)
router.post("/singlesubcategory",subcategorycontroller.getsingle)
router.post("/updatesubcategory",subcategoryupload.single('sub_category_image'),subcategorycontroller.updatesubCategory)
// sub category routes end


// product routes start
// router.post("/addproduct",productcontroller.addproduct)
router.post("/addproduct",productupload.single('product_image'),productcontroller.addproduct)
router.post("/allproduct",productcontroller.allproduct)
router.post("/getsingleproduct",productcontroller.getsingleproduct)
router.post("/updateproduct",productupload.single('product_image'),productcontroller.updateproduct)
// product routes end


// order routes start
router.post("/orderplace",ordercontroller.add)
router.post("/allorders",ordercontroller.getall)
// order routes start

module.exports = router