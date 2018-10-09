const 
    express = require('express'),
    router = new express.Router(),
    citiesController = require('../controllers/citiesController')

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

module.exports = router