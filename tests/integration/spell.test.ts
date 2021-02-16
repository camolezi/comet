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

  describe("GET /spells/:spellName", function () {
    it("should return the spell with the specified name", async function () {
      const spellFixure = createSpellFixture();

      const spellConnection = startDBConnection();
      const spellRepository = new SpellRepository(spellConnection);

      const savedSpell = await spellRepository.saveNewSpell(spellFixure);
      spellConnection.close();

      const response = await chai
        .request(app)
        .get(`/spells/${savedSpell.name}`);

      expect(response).to.have.status(200);
      expect(response.body).to.eql(savedSpell);
    });
  });

  describe("GET /spells/:spellID", function () {
    it("should return the spell with the specified id", async function () {
      const spellFixure = createSpellFixture();

      const spellConnection = startDBConnection();
      const spellRepository = new SpellRepository(spellConnection);

      const savedSpell = await spellRepository.saveNewSpell(spellFixure);
      spellConnection.close();

      const response = await chai
        .request(app)
        .get(`/spells/id/${savedSpell._id}`);

      expect(response).to.have.status(200);
      expect(response.body).to.eql(savedSpell);
    });
  });
});
