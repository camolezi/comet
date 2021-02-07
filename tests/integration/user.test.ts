import chai, { expect } from "chai";
import app from "../../src/app";

const userTest = { name: "TestName", email: "testEmail@mail.com" };

describe("ENDPOINT /user", function () {
  describe("POST /user", function () {
    it("should create a new user", async function () {
      const response = await chai.request(app).post("/user").send(userTest);

      expect(response).to.have.status(200);
      expect(response.body).to.be.eql(userTest);
    });
  });
});
