const {ApplicationModel} = require('../models/applicationModel'); 
const {OpeningModel} = require('../models/openingModel');
const {UserModel} = require('../models/userModel');




// For get all interview requests
const getAllInterviewRequests = async (req, res) => {
    try {
        const applications = await ApplicationModel.find()
            // .populate('candidate', 'name email')
            // .populate('opening', 'title description');
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};




// For add a new interview request
const addInterviewRequest = async (req, res) => {
    console.log(req.body)
    try {
        const newApplication = new ApplicationModel(req.body);
        await newApplication.save();
        res.status(201).json({ msg: 'Interview request added successfully', application: newApplication });
    } catch (error) {
        console.error('Error adding interview request:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};




// For accept an interview request
const acceptInterviewRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const application = await ApplicationModel.findByIdAndUpdate( id,{ status: 'accepted' } );
        res.status(200).json({ msg: 'Interview request accepted successfully', application });
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};



// For reject an interview request
const rejectInterviewRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const application = await ApplicationModel.findByIdAndUpdate(id,{ status: 'rejected' });
        res.status(200).json({ message: 'Interview request rejected successfully', application });
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};




module.exports = { getAllInterviewRequests, addInterviewRequest,acceptInterviewRequest,rejectInterviewRequest};