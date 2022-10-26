const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role');

const { validarCampos } = require('../middlewares/validar-campos');

const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/',[
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('password', 'el password debe de ser de mas de seis letras').isLength({ min: 6 }),
    check('correo', 'el correo no es valido').isEmail(),
   // check('rol', 'no es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( async(rol = '') => {
     const existeRol = await Role.findOne({ rol });
     if ( !existeRol) {
        throw new Error('El rol no esta registrado en la base de datos')
     } 
   }),
    validarCampos
], usuariosPost );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );

module.exports = router;