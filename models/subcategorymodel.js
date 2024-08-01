const mongoose = require('mongoose')

const subcategoryschema = new mongoose.Schema({
    categoryId : {type:mongoose.SchemaTypes.ObjectId,ref:'category',default:null},
    sub_category_name : { type:String,default:null },
    sub_category_image: { type:String,default:'no-image.jpg'},
    sub_category_desc: { type:String,default:null},
    status : { type:Boolean,default:true},
    created_at : { type:Date,default:Date.now()}
})

module.exports = new mongoose.model('subcategory',subcategoryschema)