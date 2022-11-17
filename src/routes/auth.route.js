const express = require('express');
const router = express.Router();
const jsonWebToken = require('jsonwebtoken'); //generar token
const bcrypt = require('bcryptjs'); // encriptaar contraseña
const {check, validationResult} = require('express-validator'); //check validation for request
const gravatar = require('gravatar');// obtener imagen de usuario por correo
const {generateId} = require('@codecraftkit/utils');
const userModel = require ('../models/User');
const auth = require('../Middleware/Auth');

router.get('/', auth, async(req, res) =>{
    try {
        //get user information by id
        const user = await userModel.findById(req.user.id).select('-password')
        res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server error')
        return error;
    }
})


router.post(
    '/register',
    [
        //validation
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include valid email').isEmail(),
        check('password', 'Please enter a passsword with 6 or more characters').isLength({min: 6}),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array()
            });
        }
       //get name, email and password from request
        const {name, email, password} = req.body;
        try {
            //comprobar que el usuario existe
            let user = await userModel.findOne({email});
            //si existe usuario
            if(user) {
                return res.status(400).json({
                    errors: [{msg: 'User already exists'}]
                });
            }
            //si no existe usuario obtener imaagen de gravatar
            const avatar = gravatar.url(email,{
                size: '200',
                rate: 'pg',
                d: 'mm'
            });
            //crear imagen de usuario
            user = new userModel({
                _id: generateId(),
                name,
                email,
                avatar,
                password
            });
            //encriptar contraseña
            const salt = await bcrypt.genSalt(10);//generate salt contains 10
            //guardar contraseña
            user.password = await bcrypt.hash(password, salt);
            //guardar usuario en la base de datos
            await user.save();
            //payload para generar token
            console.log("pepe");
            const payload = {
                
                user: {id: user.id}
            };
            jsonWebToken.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: 360000,// for development for production it will 3600
                },
            (err, token) => {
                //if (err) throw err;
                res.json({token});
                console.log(token, "llegop");
            }
          );
        } catch (error) {
            console.log(error.message);
            res.status(500).send('Server error');
        }
    }
);

router.post(
    '/login',
    [
        //validation for email and password
        check('email', 'please include a valid email').isEmail(),
        check('password', 'password is required').exists()
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
        });
      }
      
      //si todo está bien obtener email y password del request body
      const{email, password} = req.body;

      try {
        //encontrar usuario
        let user = await userModel.findOne({
            email
        });

        //no se encuentra la id del usuario en la base de datos
        if (!user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Invalid credentials'
                    },
                ],
            });
        }

        //know user founded by email lets compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'Invalid credentials'
                    },
                ],
            });
        }

        //payload for jsonWebtoken
        const payload = {
            user: {
                id: user._id,
            }
        };

        jsonWebToken.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: 360000
            },
            (err, token) => {
                if (err) throw err;
                res.json({
                    token
                });
            }
        );
      } catch (error) {
        console.log(error.message);
        res.status(500).send('server error');
        return error;
      }
    }
);

module.exports = router;