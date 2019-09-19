var chai  = require("chai");
var chaiHttp = require("chai-http")
var app = require('../app')

chai.use(chaiHttp);
chai.should();

describe("Short Shop API", () => {
    describe("Get All Department", () => {
      it("returns status 200", (done) => {
        chai.request(app)
        .get('/')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
      });
  
    });
});