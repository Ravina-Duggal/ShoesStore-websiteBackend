
const Product = require('../models/productmodel')

function addproduct(req,res){
    console.log(req.body)
    console.log(req.file)
    var validation = ""
    if(req.body.categoryId == "")
    {
        validation += "Category Id is required \n"
    }
    if(req.body.subcategoryId == "")
    {
        validation += "Sub Category Id is required \n"
    }
    if(req.body.product_name == "")
    {
        validation += "Product name is required \n"
    }
    if(req.body.product_image == "")
    {
        validation += "Product Image is required \n"
    }
    if(req.body.product_quantity == "")
    {
        validation += "product quantity is required"
    }
    if(req.body.product_price == "")
    {
        validation += "product price is required"
    }
    if(req.body.product_desc == "")
    {
        validation += "product description is required"
    }
    if(!!validation)
    {
        res.json({
            status:409,
            success:false,
            msg:validation
        })
    }
    else{
        //check duplicacy
        Product.findOne({product_name:req.body.product_name})
        .then(productdata=>{
            // console.log(branddata)
            if(productdata == null)
            {
                //insert
                let productobject = new Product()
                productobject.category_name = req.body.category_name
                // productobject.categoryId = req.body.categoryId
                productobject.sub_category_name = req.body.sub_category_name
                // productobject.subCategoryId = req.body.subCategoryId
                productobject.product_name = req.body.product_name
                // productobject.product_image = req.body.product_image
                if(req.file)
                {
                    productobject.product_image = "product/"+req.file.filename
                }
                productobject.product_quantity = req.body.product_quantity
                productobject.product_price = req.body.product_price
                productobject.product_desc = req.body.product_desc
                productobject.product_color = req.body.product_color
                productobject.save()
                res.json({
                    success:true,
                    status:200,
                    msg:'Product inserted'
                })
            }
            else{
                res.json({
                    'status':200,
                    'success':true,
                    'msg':'Product from this name already exist',
                    'data':req.body
                })
            }
        })
    }    
}

allproduct = (req,res)=>{
    Product.find(req.body)
    .then(productdata=>{
        res.json({
            'status':200,
            'success':true,
            'msg':'data loaded',
            'data':productdata
        })
    })
    .catch(err=>{
        res.json({
            status:500,
            success:false,
            msg : 'Error Occur',
            error : String(err)
        })
    })
    
}

getsingleproduct = (req,res)=>{
    var validate = ""
    if(req.body._id == "")
    {
        validate += "_id is required"
    }

    if(!!validate)
    {
        res.json({
            status:409,
            success:false,
            msg:validate
        })
    }
    else{
        Product.findOne({_id:req.body._id})
        .then(productdata=>{
            res.json({
                'status':200,
                'success':true,
                'msg':'data loaded',
                'data':productdata
            })
        })
        .catch(err=>{
            res.json({
                status:500,
                success:false,
                msg : 'Error Occur',
                error : String(err)
            })
        })
    }
}

updateproduct = (req,res)=>{
    var validation = ""
    if(req.body._id == "")
    {
        validation += "ID is required \n"
    }
    if(req.body.category_name == "")
    {
        validation += "category name is required \n"
    }
    if(req.body.sub_category_name == "")
    {
        validation += "Sub category name is required \n"
    }
    if(req.body.product_name == "")
    {
        validation += "product name is required \n"
    }
    if(req.body.product_image == "")
    {
        validation += "product image is required "
    }

    if(!!validation)
    {
        res.json({
            status:409,
            success:false,
            msg:validation
        })
    }
    else{
        //check whether data exists or not wrt particular id
        Product.findOne({_id:req.body._id})
        .then(productdata=>{
            if(productdata == null)
            {
                res.json({
                    status:409,success:false,msg:'Data not found'
                })
            }
            else{
                //updateCategory 
                productdata.category_name = req.body.category_name
                productdata.sub_category_name = req.body.sub_category_name
                productdata.product_name = req.body.product_name
                // productdata.product_image = req.body.product_image
                if(req.file)
                {
                    productdata.product_image = "product/" + req.file.filename
                }
                productdata.product_quantity = req.body.product_quantity
                productdata.product_desc = req.body.product_desc
                productdata.product_price = req.body.product_price
                productdata.save()

                res.json({
                    status:200,success:true,msg:'Record updated'
                })
            }
        })
        .catch(err=>{
            res.json({
                status:500,
                success:false,
                msg:'Error',
                error:String(err)
            })
        }) 
    }
}

module.exports = {
    addproduct,
    allproduct,
    getsingleproduct,
    updateproduct
}