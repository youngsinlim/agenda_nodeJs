const express = require('express')
const R = express.Router()
const Users = require('./modelo_usuario.js')
const session = require('express-session')

//Valida login
R.post('/login', function(req, res) {

  let x = req.body.user
  var y = req.body.pass


  Users.findOne({
    email: x
  }, (err, result) => {

    if (err) console.log(err)
    if (!result) {
      res.send("Usuario Incorrecto");
    }
    result.comparePassword(y, function(err, isMatch) {
      if (isMatch && isMatch == true) {
        req.session.El_id = result.userId;
        res.send("Validado");
      } else {
        res.send("Contraseña Incorrecta");
      }
    })

  })

});

module.exports = R;
