const Category = require("../models/categorymodel")
const Subcategory = require("../models/subcategorymodel")


dashboard = async (req,res)=>{
    totalcategory = 0
    totalsubcategory = 0

    await Category.countDocuments().then(categorycount =>{
        totalcategory = categorycount
    })
    await Subcategory.countDocuments().then(subcategorycount =>{
        totalsubcategory = subcategorycount
    })

    res.json({
        status:200,
        success:true,
        total_subcategories : totalsubcategory,
        total_categories : totalcategory, 
      
     })
}

module.exports = {
    dashboard
}