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

//show a specific post
module.exports.show = (req, res) => {
    let { city_id, id } = req.params;
    City.findById(city_id, (err, city) =>{
        if (err) res.json({ success: false, err });

        if (city.posts.id(id)) {
            let post = city.posts.id(id)
            res.json({ success: true, payload: post })
        } else {
            res.json({ success: false, payload: "Post does not exist." })
        }
    })
}
//edit post
module.exports.edit = (req, res) =>{
    let { city_id, id } = req.params;
    City.findById(city_id, (err, city) =>{
        if (err) res.json({ success: false, err });

        let post = city.posts.id(id)
        console.log(post)
        if (post) {
            res.render('./posts/editPost', { success: true, payload: post })
        } else {
            res.json({ success: false, payload: "Post does not exist." })
        }
    })
}

//update specific post
module.exports.update = (req, res) => {
    let { city_id, id } = req.params;
    let { body } = req;
    City.findById(city_id, (err, city) => {
        if(err) res.json({ success: false, err });

        let post = city.posts.id(id)
        if (post) {
            for (let key in body) { post[key] = body[key] }
            city.save((err, city) => {
                if (err) res.json({ success: false, err });
                res.json({ success: true, payload: city })
            });
        } else {
            res.json({ success: false, payload: "Post does not exist." })
        }
    })
};

//delete post
exports.delete = (req, res) => {
    let { city_id, id } = req.params;
    City.findById(city_id, (err, city) => {
        if (err) res.json({ success: false, err });

        let post = city.posts.id(id);
        if (post) {
            post.remove();
            city.save((err, card) => {
                if (err) res.json({ success: false, err });
                res.json({ success: true, payload: city });
            })
        } else {
            res.json({ success: false, payload: "Post does not exist." })
        }
    })
}

//get all posts made by user

