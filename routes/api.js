const router = require('express').Router();
const multer = require('multer');
const PengaduanController = require('../app/Http/Controllers/PengaduanController');
const UserController = require('../app/Http/Controllers/UserController');
const AuthController = require('../app/Http/Controllers/AuthController');
const passport = require('passport');
const localStrategi = require('passport-local').Strategy;

passport.use(new localStrategi({usernameField: 'email'}, AuthController.localStrategy));

router.post('/auth/register', multer().none() ,UserController.register);
router.post('/auth/login', multer().none() ,AuthController.login);
router.post('/auth/logout', AuthController.logout);
router.get('/me', AuthController.me);
router.post('/auth/logout', AuthController.logout)

router.post('/pengaduan', multer().none() ,PengaduanController.store);
router.get('/pengaduan/semua', PengaduanController.index);
router.delete('/pengaduan/:id', PengaduanController.destroy);
router.put('/pengaduan/:id', multer().none() ,PengaduanController.update);


module.exports = router;