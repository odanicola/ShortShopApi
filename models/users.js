/*var connection = require('../config/conn');
var bcrypt = require('bcryptjs');

var User = function(data){
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(data.password, salt);
    var hashedPassword = bcrypt.compareSync(data.password, hash);

    this.email = data.email;
    this.password = hash;
    this.nama = data.nama;
    this.created_at = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
}

User.getAllUsers = function getAllUsers(result){
    connection.query("SELECT * FROM tasks", (err, rows, meta) => {
        if (err) throw err;
        result(null, rows);
      });
};

User.createUser = function createUser(newUser, result){
  let query = "INSERT INTO users (email,password,nama,created_at) VALUES('"+newUser.email+"','"+newUser.password+"','"+newUser.nama+"','"+newUser.created_at+"')";
  connection.query(query, function(err, res){
    if(err) {
      console.log("Error: ", err)
      result(err, null)
    }else {
      console.log(res.insertId)
      result(null, res.insertId)
    }
  })
};

User.getUser = function getUser(userId, result){
  connection.query("SELECT * FROM users WHERE email = ?", userId, function(err,res){
    if (err){
      console.log("Error: ", err);
      result(err, null);
    }else{
      result(null, res);
    }
  })
}

module.exports=User;
*/
