const router = require('express').Router()
const { Router } = require('express')
const categorycontroller = require('../controllers/categorycontroller')
const subcategorycontroller = require('../controllers/subcategorycontroller')
const productcontroller = require('../controllers/productcontroller')
const ordercontroller = require('../controllers/ordercontroller')


// category routes start
router.post("/getallcategory",categorycontroller.getallcategory)
router.post("/getsinglecategory",categorycontroller.getsingle)
// category routes end

// sub category route start
router.post("/allsubcategory",subcategorycontroller.allsubcategory)
router.post("/singlesubcategory",subcategorycontroller.getsingle)
// sub category route end

// product routes start
router.post("/allproduct",productcontroller.allproduct)
router.post("/getsingleproduct",productcontroller.getsingleproduct)
// product routes end

// order routes start
router.post("/orderplace",ordercontroller.add)
router.post("/allorders",ordercontroller.getall)
// order routes end

module.exports = router