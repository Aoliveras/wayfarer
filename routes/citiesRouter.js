const 
    express = require('express'),
    router = new express.Router(),
    citiesController = require('../controllers/citiesController')
    postsController = require('../controllers/postsController')


//CITIES ROUTES
//get index of cities
router.get('/', citiesController.getCities)
//create new city
router.post('/', citiesController.createCity)
//get specific city
router.get('/:id', citiesController.getCity)
//edit specific city
router.patch('/:id', citiesController.updateCity)
//delete specific city
router.delete('/:id', citiesController.removeCity)
//get posts belonging to city
//router.get('/:id/posts', citiesController.getPostsForCity)
//add a post to a specific album
// router.post('/:id/posts', citiesController.addPostToSpecificCity)

//POSTS ROUTES
router.post('/:id/posts', postsController.create)
router.get('/:id/posts', postsController.index)
router.get('/:city_id/posts/:id', postsController.show)
router.get('/:city_id/posts/:id/edit', postsController.edit)
router.put('/:city_id/posts/:id', postsController.update)
router.delete('/:city_id/posts/:id', postsController.delete)


module.exports = router