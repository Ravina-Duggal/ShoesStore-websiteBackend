const Category = require('../models/categorymodel')

function addcategory(req, res) {
    console.log(req.body)
    console.log(req.file)
    var validation = ""
    if (req.body.category_name == "") {
        validation += "Category name is required \n"
    }
    if (req.body.category_image == "") {
        validation += "Image is required"
    }

    if (!!validation) {
        res.json({
            status: 409,
            success: false,
            msg: validation
        })
    }
    else {
        //check duplicacy
        Category.findOne({ category_name: req.body.category_name })
            .then(categorydata => {
                // console.log(branddata)
                if (categorydata == null) {
                    //insert
                    let categoryobject = new Category()
                    categoryobject.category_name = req.body.category_name
                    // categoryobject.category_name = req.body.category_name
                    if (req.file) {
                        categoryobject.category_image = "category/" + req.file.filename
                    }
                    categoryobject.save()
                    res.json({
                        'status': 200,
                        'success': true,
                        'msg': 'Category Added',
                        'data': req.body
                    })
                }
                else {
                    res.json({
                        'status': 200,
                        'success': true,
                        'msg': 'Category already exist',
                        // 'data': req.body
                    })
                }
            })



    }

}

getallcategory = (req, res) => {
    Category.find(req.body)
        .then(categorydata => {
            res.json({
                'status': 200,
                'success': true,
                'msg': 'data loaded',
                'data': categorydata
            })
        })
        .catch(err => {
            res.json({
                status: 500,
                success: false,
                msg: 'Error Occur',
                error: String(err)
            })
        })

}

getsingle = (req, res) => {
    var validate = ""
    if (req.body._id == "") {
        validate += "_id is required"
    }

    if (!!validate) {
        res.json({
            status: 409,
            success: false,
            msg: validate
        })
    }
    else {
        Category.findOne({ _id: req.body._id })
            .then(categorydata => {
                res.json({
                    'status': 200,
                    'success': true,
                    'msg': 'data loaded',
                    'data': categorydata
                })
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    msg: 'Error Occur',
                    error: String(err)
                })
            })
    }
}

updateCategory = (req, res) => {
    var validation = ""
    if (req.body._id == "") {
        validation += "ID is required \n"
    }
    if (req.body.category_name == "") {
        validation += "Category name is required \n"
    }
    if (req.body.category_image == "") {
        validation += "image is required "
    }

    if (!!validation) {
        res.json({
            status: 409,
            success: false,
            msg: validation
        })
    }
    else {
        //check whether data exists or not wrt particular id
        Category.findOne({ _id: req.body._id })
            .then(categorydata => {
                if (categorydata == null) {
                    res.json({
                        status: 409, success: false, msg: 'Data not found'
                    })
                }
                else {
                    //updateCategory 
                    categorydata.category_name = req.body.category_name
                    // categorydata.category_image = req.body.category_image
                    if (req.file) {
                        categorydata.category_image = "category/" + req.file.filename
                    }
                    categorydata.save()

                    res.json({
                        status: 200, success: true, msg: 'Record updated'
                    })
                }
            })
            .catch(err => {
                res.json({
                    status: 500,
                    success: false,
                    msg: 'Error',
                    error: String(err)
                })
            })
    }
}

module.exports = {
    addcategory,
    getallcategory,
    getsingle,
    updateCategory
}