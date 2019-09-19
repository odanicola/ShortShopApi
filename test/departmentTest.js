var expect  = require("chai").expect;
var request = require("request");

describe("Short Shop API", function() {
    describe("Get All Department", function() {
      var url = "http://localhost:3000/departments";
  
      it("returns status 200", function() {
        request(url, function(error, response, body) {
          expect(response.statusCode).to.equal(200);
        });
      });
  
    });
});