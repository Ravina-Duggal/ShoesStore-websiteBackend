const mongoose = require("mongoose")

const contactschema = new mongoose.Schema({
    category_name : { type:String,default:null },
    // category_image: { type:String,default:'no-image.jpg'},
    status : { type:Boolean,default:true},
    created_at : { type:Date,default:Date.now()}
})

module.exports = new mongooge.model('contact',contactschema)