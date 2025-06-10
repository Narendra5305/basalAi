

const {OpeningModel} = require('../models/openingModel'); 
const {UserModel} = require('../models/userModel'); 



// For add a new opening
const getOpening = async (req, res) => {
    try {
        const openings = await OpeningModel.find().populate({path : "postedBy", select : "-password -_id"})
        res.status(201).json({openings});
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};



// For add a new opening
const createOpening = async (req, res) => {
    try {
        const newOpening = new OpeningModel(req.body);
        await newOpening.save();
        res.status(201).json({ msg: 'Opening created successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};


// For close an opening
const closeOpening = async (req, res) => {
    const { id } = req.params;
    try {
        const opening = await OpeningModel.findByIdAndUpdate(id,{ isActive: false });
        res.status(200).json({ msg: 'Opening closed successfully'});
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};



// for delete an opening
const deleteOpening = async (req, res) => {
    const { id } = req.params;
    try {
        const opening = await OpeningModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Opening deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = { getOpening,createOpening,closeOpening,deleteOpening};