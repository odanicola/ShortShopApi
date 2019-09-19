var chai  = require("chai");
var chaiHttp = require("chai-http")
var app = require('../app')

chai.use(chaiHttp);
chai.should();
var header = {chai:chai, app: app}

module.exports=header;