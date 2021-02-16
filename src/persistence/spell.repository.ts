import mongoose, { Types } from "mongoose";
import Spell, { SpellSchema } from "../domain/models/spell";

class SpellRepository {
  private readonly spellModel: mongoose.Model<mongoose.Document>;

  constructor(conn: mongoose.Connection) {
    this.spellModel = conn.model("spells", SpellSchema);
  }

  async getSpellById(id: Types.ObjectId | string): Promise<Spell> {
    return this.spellModel.findById(id).lean();
  }

  async getSpellByName(name: string): Promise<Spell> {
    return await this.spellModel.findOne({ name }).lean();
  }

  async saveNewSpell(spell: Spell): Promise<Spell> {
    const userDoc = await this.spellModel.create(spell);
    const spellObj = userDoc.toObject();
    return { ...spellObj, _id: spellObj._id.toString() } as Spell;
  }
}

export default SpellRepository;
