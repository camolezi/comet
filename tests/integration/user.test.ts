import chai, { expect } from "chai";
import app from "../../src/app";
import { startDBConnection } from "../../src/database/db.connection";
import UserRepository from "../../src/database/user.repository";
import User, { UserSchema } from "../../src/domain/models/user";

const createUserFixture = (
  name = "TestName",
  email = "testEmail@mail.com"
): User => {
  return { name, email };
};

describe("ENDPOINT /users", function () {
  beforeEach(function (done) {
    const conn = startDBConnection();
    const userModel = conn.model("users", UserSchema);

    userModel.deleteMany({}, undefined, (err) => {
      if (err) done(err);
      else done();

      conn.close();
    });
  });

  describe("POST /users", function () {
    it("should create a new user", async function () {
      const userFixture = createUserFixture();

      const response = await chai.request(app).post("/users").send(userFixture);

      expect(response).to.have.status(201);
      expect(response.body).to.have.property("_id");
      expect(response.body).to.deep.contain(userFixture);

      const userConn = startDBConnection();
      const userRepository = new UserRepository(userConn);

      const savedUser = await userRepository.getUserById(response.body._id);
      expect(savedUser).to.deep.contain(userFixture);

      userConn.close();
    });
  });

  describe("GET /users", function () {
    it("should return the user object", async function () {
      const userFixture = createUserFixture();
      const userConn = startDBConnection();

      const userRepository = new UserRepository(userConn);
      const newlyCreatedUser = await userRepository.saveNewUser(userFixture);
      userConn.close();

      const response = await chai
        .request(app)
        .get("/users")
        .send({ email: newlyCreatedUser.email });

      expect(response).to.have.status(200);
      expect(response.body).to.eql(newlyCreatedUser);
    });
  });
});
