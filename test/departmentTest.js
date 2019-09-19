var header = require('./headerTest')

describe("Short Shop API | Department", () => {
    describe("Get All Department", () => {
      it("returns status 200", (done) => {
        header.chai.request(header.app)
        .get('/departments')
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
      });
    });

   
});