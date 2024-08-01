
const SubCategory = require('../models/subcategorymodel')

function addsubcategory(req,res){
    console.log(req.body)
    console.log(req.file)
    var validation = ""
    if(req.body.category_name == "")
    {
        validation += "Category Id is required \n"
    }
    if(req.body.sub_category_name == "")
    {
        validation += "Sub Category name is required \n"
    }
    if(req.body.sub_category_image == "")
    {
        validation += "Image is required \n"
    }
    if(req.body.sub_category_desc == "")
    {
        validation += "Description is required"
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
        SubCategory.findOne({sub_category_name:req.body.sub_category_name})
        .then(subcategorydata=>{
            // console.log(branddata)
            if(subcategorydata == null)
            {
                //insert
                let categoryobject = new SubCategory()
                categoryobject.category_name = req.body.category_name
                categoryobject.sub_category_name = req.body.sub_category_name
                // categoryobject.sub_category_image = req.body.sub_category_image
                if(req.file)
                {
                    categoryobject.sub_category_image = "subcategory/"+req.file.filename
                }
                categoryobject.sub_category_desc = req.body.sub_category_desc
                categoryobject.save()
                res.json({
                    success:true,
                    status:200,
                    msg:'Sub Category inserted'
                })
            }
            else{
                res.json({
                    'status':200,
                    'success':true,
                    'msg':'Sub Category already exist',
                    'data':req.body
                })
            }
        })
    }    
}

allsubcategory = (req,res)=>{
    SubCategory.find(req.body)
    .then(subsubcategorydata=>{
        res.json({
            'status':200,
            'success':true,
            'msg':'data loaded',
            'data':subsubcategorydata
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

getsingle = (req,res)=>{
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
        SubCategory.findOne({_id:req.body._id})
        .then(subcategorydata=>{
            res.json({
                'status':200,
                'success':true,
                'msg':'data loaded',
                'data':subcategorydata
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

updatesubCategory = (req,res)=>{
    var validation = ""
    if(req.body._id == "")
    {
        validation += "ID is required \n"
    }
    if(req.body.sub_category_name == "")
    {
        validation += "Sub Category name is required \n"
    }
    if(req.body.sub_category_image == "")
    {
        validation += "image is required "
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
        SubCategory.findOne({_id:req.body._id})
        .then(subcategorydata=>{
            if(subcategorydata == null)
            {
                res.json({
                    status:409,success:false,msg:'Data not found'
                })
            }
            else{
                //updateCategory 
                subcategorydata.category_name = req.body.category_name
                subcategorydata.sub_category_name = req.body.sub_category_name
                // subcategorydata.sub_category_image = req.body.sub_category_image
                if(req.file)
                {
                    subcategorydata.sub_category_image = "subcategory/" + req.file.filename
                }
                subcategorydata.sub_category_desc = req.body.sub_category_desc
                subcategorydata.save()

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
    addsubcategory,
    allsubcategory,
    getsingle,
    updatesubCategory
}