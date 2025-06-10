const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  candidate: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  opening: {type: mongoose.Schema.Types.ObjectId,ref: 'Opening',required: true},
  status: { type: String,enum: ['applied' , 'accepted', 'rejected'],default: 'applied'},
  resumeLink: { type: String}
}, { timestamps: true });


const ApplicationModel =mongoose.model('Application', applicationSchema);

module.exports = {ApplicationModel} 



