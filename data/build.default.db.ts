import { startDBConnection } from "../src/persistence/db.connection";
import { SpellSchema } from "../src/domain/models/spell";
import { readFile } from "fs/promises";

const path = "data/spells/";
const spellFileName = "spells.json";
const defaultSpellCollection = "default_spells";

async function readDefaultSpellData(path: string) {
  const spellsData = await readFile(path);
  return JSON.parse(spellsData.toString());
}

async function deleteSpellData() {
  const conn = startDBConnection();
  const spellsDocs = conn.model(defaultSpellCollection, SpellSchema);

  const deleteQuery = await spellsDocs.deleteMany({}, undefined);
  conn.close();

  return deleteQuery;
}

async function writeSpellsToDb(spells: any) {
  const conn = startDBConnection();
  const spellsDocs = conn.model(defaultSpellCollection, SpellSchema);

  const insertedData = await spellsDocs.insertMany(spells, undefined);
  conn.close();

  return insertedData;
}

deleteSpellData()
  .then(() => readDefaultSpellData(path + spellFileName))
  .then((data) => writeSpellsToDb(data))
  .catch((e) => console.log(e));
