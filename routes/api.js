const router = require('express').Router();
const multer = require('multer');
const PengaduanController = require('../app/Http/Controllers/PengaduanController');
const UserController = require('../app/Http/Controllers/UserController');
const AuthController = require('../app/Http/Controllers/AuthController');
console.log(PengaduanController);

router.post('/auth/register', multer().none() ,UserController.register);
router.post('/auth/login', AuthController.login);
router.post('/auth/logout', UserController.logout);


router.post('/pengaduan', multer().none() ,PengaduanController.store);
router.get('/semua-pengaduan', PengaduanController.index);
router.delete('/pengaduan/:id', PengaduanController.destroy);
router.put('/pengaduan/:id', multer().none() ,PengaduanController.update);


module.exports = router;