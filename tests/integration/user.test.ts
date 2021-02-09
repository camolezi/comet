import chai, { expect } from "chai";
import app from "../../src/app";
import { startDBConnection } from "../../src/database/db.connection";
import UserRepository from "../../src/database/user.repository";
import UserSchema from "../../src/domain/models/user";

const userTest = { name: "TestName", email: "testEmail@mail.com" };
const autoGeneratedProperties = ["_id", "__v"];

describe("ENDPOINT /users", function () {
  beforeEach(function (done) {
    const userConn = startDBConnection();
    const userModel = userConn.model("users", UserSchema);

    userModel.deleteMany({}, undefined, (err) => {
      if (err) done(err);
      else done();
    });
  });

  describe("POST /users", function () {
    it("should create a new user", async function () {
      const response = await chai.request(app).post("/users").send(userTest);

      expect(response).to.have.status(201);
      expect(response.body).to.have.property("_id");
      expect(response.body)
        .excluding(autoGeneratedProperties)
        .to.be.eql(userTest);

      const userConn = startDBConnection();
      const userRepository = new UserRepository(userConn);

      const savedUser = await userRepository.getUserById(response.body._id);
      expect(savedUser).excluding(autoGeneratedProperties).to.be.eql(userTest);

      userConn.close();
    });
  });
});
