import chai, { expect } from "chai";
import app from "../../src/app";

const versionFixture = {
  version: "1.0",
};

describe("ENDPOINT /version", function () {
  it("Should return the current version of the running app", function (done) {
    chai
      .request(app)
      .get("/version")
      .end(function (err, res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.eql(versionFixture);

        done();
      });
  });
});
