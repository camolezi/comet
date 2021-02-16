import chai, { expect } from "chai";
import app from "../../src/app";
import Spell, { SpellSchema } from "../../src/domain/models/spell";
import { startDBConnection } from "../../src/persistence/db.connection";
import SpellRepository from "../../src/persistence/spell.repository";

const createSpellFixture = (name = "Fire ball"): Spell => {
  return { name };
};

describe("ENDPOINT /spells", function () {
  beforeEach(function (done) {
    const conn = startDBConnection();
    const spellsDocs = conn.model("spells", SpellSchema);

    spellsDocs.deleteMany({}, undefined, (err) => {
      if (err) done(err);
      else done();

      conn.close();
    });
  });

  describe("POST /spells", function () {
    it("should create a new spell", async function () {
      const spellFixture = createSpellFixture();

      const response = await chai
        .request(app)
        .post("/spells")
        .send(spellFixture);

      expect(response).to.have.status(201);
      expect(response.body).to.have.property("_id");
      expect(response.body).to.deep.contain(spellFixture);

      const userConn = startDBConnection();
      const spellRepository = new SpellRepository(userConn);

      const savedUser = await spellRepository.getSpellById(response.body._id);
      expect(savedUser).to.deep.contain(spellFixture);

      userConn.close();
    });
  });

  describe("GET /users", function () {
    it("should return the user object", async function () {
      const spellFixure = createSpellFixture();

      const spellConnection = startDBConnection();
      const spellRepository = new SpellRepository(spellConnection);

      const savedSpell = await spellRepository.saveNewSpell(spellFixure);
      spellConnection.close();

      const response = await chai
        .request(app)
        .get("/spells")
        .send({ name: savedSpell.name });

      expect(response).to.have.status(200);
      expect(response.body).to.eql(savedSpell);
    });
  });
});
