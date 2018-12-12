const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");

chai.use(chaiHttp);
chai.should();

describe("Return not found", () => {
  describe("GET /", () => {
    it("should receive not found", done => {
      const request = chai
        .request(app)
        .get("/")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.an("object");
          done();
        });
    });
  });

  describe("GET /material/search?keyword=Fe", () => {
    it("should receive array with results", function(done) {
      this.timeout(15000);
      const request = chai
        .request(app)
        .get(`/material/search?keyword=Fe`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array");
          done();
        });
    });
  });

  describe("GET /material/search?keyword=invalid", () => {
    it("should receive array with results", function(done) {
      this.timeout(15000);
      const request = chai
        .request(app)
        .get(`/material/search?keyword=invalid`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("array").that.is.empty;
          done();
        });
    });
  });
});
