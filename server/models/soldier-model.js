const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Soldier = new Schema(
    {   avata: { type: String, required: false },
        name: { type: String, required: true },
        sex: { type: String, required: false },
        rank: { type: String, required: false },   
        startdate:{type:String,required:false},
        phone:{type:String,required:false},
        email:{type:String,required:false},
        superName:{type:String,required:false},
        subCount:{type:Number,required:false},
        fileName:{type:String,required:false},
        superId:{type:String,required:false},

    },
    { timestamps: true },
)

module.exports = mongoose.model('soldiers', Soldier)
