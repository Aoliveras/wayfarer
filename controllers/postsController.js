const City = require('../models/City.js')

//index for posts
module.exports.index = (req, res) =>{
    City.findById(req.params.id, (err, city) =>{
        if(err) res.json({ success: false, err })
        let posts = city.posts
        res.json({ success: true, payload: posts })
    })
}
//create new post
module.exports.create = (req, res) => {
    City.findById(req.params.id, (err, city) =>{
        if(err) res.json({ success: false, err })
        //let post = {...req.body, author: req.user._id} //through the site
        let post = {...req.body, author:"5bbbc0452426193495219450"} //for postman
        city.posts.push(post);
        city.save((err, city) => {
            if (err) res.json({ success: false, err })
            res.json({ success: true, payload: city })
        })
    })
}

//get all posts
//get specific post
//edit post
//delete post