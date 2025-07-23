// routes/savedImages.js
const express = require('express');
const router = express.Router();
const { createImage, deleteImage } = require('../controllers/savedImageController');

router.post('/save', createImage);
router.delete('/delete/:id', deleteImage);

module.exports = router;
