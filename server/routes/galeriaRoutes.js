// routes/savedImages.js
const express = require('express');
const router = express.Router();
const {verificarToken} = require('../middleware/autenticacionMiddleware.js')
const { createImage, deleteImage } = require('../controllers/savedImageController');

router.post('/save' ,verificarToken, createImage);
router.delete('/delete/:id',verificarToken, deleteImage);

module.exports = router;
