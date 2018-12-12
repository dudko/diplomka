const expect = require("chai").expect;
const dotenv = require("dotenv").config();

const { search } = require("../routes/material");

describe("Material Search Route", () => {
  describe("search()", () => {
    it("should send response array from materialproject.org", function(done) {
      this.timeout(15000);

      const req = {
        query: {
          keyword: "Fe"
        }
      };

      search(req, {
        send: body => {
          expect(body).to.be.an("array");
          done();
        }
      });
    });
  });
});
