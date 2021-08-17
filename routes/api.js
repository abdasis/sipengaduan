const router = require('express').Router();
const multer = require('multer');
const PengaduanController = require('../app/Http/Controllers/PengaduanController');

console.log(PengaduanController);

router.post('/pengaduan', multer().none() ,PengaduanController.store);
router.get('/semua-pengaduan', PengaduanController.index);
router.delete('/pengaduan/:id', PengaduanController.destroy);
router.put('/pengaduan/:id', multer().none() ,PengaduanController.update);

module.exports = router;