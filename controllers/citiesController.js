const City = require('../models/City.js')


//get all cities
module.exports.getCities = (req, res) =>{
    City.find({}, (err, cities) => {
        if(err) res.json({ success: false, err });
        //create through postman
        //res.json({ success: true, payload: cities })
        //render page for web app
        res.render('cities/citiesIndex', { success: true, payload: cities })
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
    let { id } = req.params
    console.log(id)
    City.findById(id, (err, city) =>{
        if(err) res.json({ success: false, err })
        //postman view
        //res.json({ success: true, payload: city })
        res.render('cities/show', { success: true, payload: city })
    })
}

//update a specific city
module.exports.updateCity = (req, res) => {
    let { id } = req.params;
    City.findByIdAndUpdate(id, req.body, { new: true }, (err, updatedCity) => {
        if (err) res.json({ success: false, payload: err});
        //postman view
        res.json({ success: true, payload: updatedCity });
        //view in webapp
        //res.render('cities/show', {payload: updatedCity} )
    })
}

//remove a city
module.exports.removeCity = (req, res) =>{
    City.findByIdAndRemove(req.params.id, (err, deletedCity) =>{
        if(err) res.json({ success: false, err })
        res.json({ success: true, payload: deletedCity })
    })
}

// //get posts for specific city
// module.exports.getPostsForCity = (req, res) =>{
//     City.findById(req.params.id, (err, city) =>{
//         if(err) res.json({ success: false, err })
//         let posts = city.posts
//         res.json({ success: true, payload: posts })
//     })
// }

// //add post to specific city
// module.exports.addPostToSpecificCity = (req, res) => {
//     City.findById(req.params.id, (err, city) =>{
//         if(err) res.json({ success: false, err })
//         let post = {...req.body}
//         city.posts.push(post);
//         city.save((err, city) => {
//             if (err) res.json({ success: false, err })
//             res.json({ success: true, payload: city })
//         })
//     })
// }