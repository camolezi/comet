/*
    This script can generate a json with all the spells from D&D 5e.
    Courtesy of D&D 5e API (http://www.dnd5eapi.co/)
*/

import fetch from "node-fetch";
import { writeFile, mkdir } from "fs/promises";

const apiUrl = "https://www.dnd5eapi.co";
const path = "data/spells/";
const spellFileName = "spells.json";

async function fetchSpells(url: string) {
  const data = await fetch(`${url}/api/spells`);
  const spellsIndexes = await data.json();

  const spells = spellsIndexes.results.map(async (spellIndex) => {
    const spellData = await fetch(`${url}${spellIndex.url}`);
    return await spellData.json();
  });

  return Promise.all(spells);
}

async function writeJsonToDisk(relativePath: string, json: unknown) {
  const stringJson = JSON.stringify(json, undefined, "\t");
  return writeFile(relativePath, stringJson);
}

async function createDir(relativePath: string) {
  return mkdir(relativePath, { recursive: true });
}

fetchSpells(apiUrl)
  .then(async (data) => {
    await createDir(path);
    return data;
  })
  .then((data) => writeJsonToDisk(path + spellFileName, data))
  .then(() => console.log("Data build at " + path + spellFileName))
  .catch((e) => console.log(e));
