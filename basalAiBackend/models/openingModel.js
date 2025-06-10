const mongoose = require('mongoose');

const openingSchema = new mongoose.Schema({
  title: {type: String,required: true },
  description: {type: String},
  postedBy: {type: mongoose.Schema.Types.ObjectId,ref: 'User', required: true},
  isActive: { type: Boolean,default: true},
}, { timestamps: true  });


const OpeningModel = mongoose.model('Opening', openingSchema);

module.exports ={OpeningModel}
