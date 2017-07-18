var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var url = 'mongodb://localhost/agenda';
var User = require('./modelo_usuario.js');


var promise = mongoose.connect(url, {
  useMongoClient: true
});

promise.then(function(db) {

  var insertarRegistro = function(callback) {
    let Usuario = new User({
      userId: "0",
      nombre: "Young",
      email: "young0@naver.com",
      password: "12345",
      birth: "29-08-1992"
    })

    Usuario.save((error) => {
      if (error) callback(error)
      callback(null, "Registro guardado")
    })
  }

  insertarRegistro((error, result) => {
    if (error) console.log(error)
    console.log(result)
    mongoose.connection.close()
  })

});
