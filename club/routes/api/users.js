const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const Jwt= require('jsonwebtoken');   

 
router.get('/test', (req, res) => res.json({msg:'user works'}));

//@route GET api/users/register
//@desc Register user 
// @access public  

router.post('/register', (req, res) => 
{
    User.findone({email: req.body.email})
    .then(user => {
        if(user) {
            return res.status(400).json({email: 'Email already exists'});
        } else {
           const avatar = gravatar.url(req.body.email,{
               s: '200', //Size
               r: 'pg', // Rating
               d: 'mm' //Default
           });


            const newUser = new User ({
                name: req.body.name, 
                email: req.body.email,
                avatar,
                password: req.body.password
            });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
               if(err) throw err;
               newUser.password = hash;
               newUser.save()
                   .then(user => res.json(user))
                   .catch(err => console.log(err)); 
            })
        })
        }
    })
});


//@route GET api/users/login 
//@desc Login User / Returning JWT token 
// @access public  
router.post('/login' , (req, res) => {
    const email = req.body.email;
    const password = req.body.password;


    // Find user by email
   User.findone({ email })
       .then(user  => {
           //check for user
           if(!user) {
               return res.status(404).json({ email: 'User not found'});

           }
           
           // check password 
           bcrypt.compare(password, user.password)
             .then(isMatch => {
                 if(isMatch) {
                    res.json({msg: 'success'});
                  } else{
                      return res.status(400).json({ password: 'password incorrect'});
                  }
             })

            });
        });

module.exports = router;