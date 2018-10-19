const router = require('express').Router();
const { verifyToken } = require('../../../utils/verifyToken');
const express = require('express');
const admin = express.Router();
const web = express.Router();
const controller = require('./carousel.controller');

admin.delete('/carousel/:url',verifyToken,controller.deleteCarousel);
admin.put('/carousel/:id', verifyToken,controller.editCarousel);  
admin.post('/carousel',verifyToken, controller.addCarousel);  
web.get('/carousel', controller.carouselList);   
 

router.use('/admin', admin); 

router.use('/', web); 

module.exports = router;