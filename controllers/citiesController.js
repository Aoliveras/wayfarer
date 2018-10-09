const 
    City = require('../models/City.js')



//get all cities
module.exports.getCities = (req, res) =>{
    City.find({}, (err, cities) => {
        if(err) res.json({ success: false, err });
        res.json({ success: true, payload: cities })
    })
}
//create new city
module.exports.createCity = (req, res) => {
    let { body } = req;
    City.create(body, (err, city) =>{
        if(err) res.json({ success: false, err })
        console.log(city)
        res.json({ success: true, payload: city })
    })
}
//get a specific city
module.exports.getCity = (req, res) =>{
    City.findOne({ _id: req.params.id }, (err, city) =>{
        if(err) res.json({ success: false, err })
        res.json({ success: true, payload: city })
    })
}

//update a specific city
module.exports.updateCity = (req, res) => {
    let { id } = req.params;
    City.findByIdAndUpdate(id, req.body, { new: true }, (err, updatedCity) => {
        if (err) res.json({ success: false, payload: err});
        res.json({ success: true, payload: updatedCity });
    })
}

//remove a city
module.exports.removeCity = (req, res) =>{
    City.findByIdAndRemove(req.params.id, (err, deletedCity) =>{
        if(err) res.json({ success: false, err })
        res.json({ success: true, payload: deletedCity })
    })
}