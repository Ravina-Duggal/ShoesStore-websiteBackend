const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    category_name : { type:String,default:null },
    categoryId : {type:mongoose.SchemaTypes.ObjectId,ref:'category',default:null},
    sub_category_name : { type:String,default:null },
    categoryId : {type:mongoose.SchemaTypes.ObjectId,ref:'subcategory',default:null},
    product_name : { type:String,default:null },
    product_image: { type:String,default:'no-image.jpg'},
    product_quantity: { type:Number,default:null},
    product_price: { type:Number,default:null},
    product_desc: { type:String,default:null},
    product_color: { type:String,default:null},
    status : { type:Boolean,default:true},
    created_at : { type:Date,default:Date.now()}
})

module.exports = new mongoose.model('product',productschema)