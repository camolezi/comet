import chai, { expect } from "chai";
import app from "../../src/app";

const userTest = { name: "TestName", email: "testEmail@mail.com" };

describe("ENDPOINT /users", function () {
  describe("POST /users", function () {
    it("should create a new user", async function () {
      const response = await chai.request(app).post("/users").send(userTest);

      expect(response).to.have.status(201);
      expect(response.body).to.be.eql(userTest);
    });
  });
});
