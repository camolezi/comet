import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import SpellRepository from "../persistence/spell.repository";

function SpellController(spellRepository: SpellRepository): Router {
  const spellRouter = Router();

  spellRouter.post("/", async (req, res) => {
    res.status(StatusCodes.CREATED);

    const createdSpell = await spellRepository.saveNewSpell(req.body);
    res.json(createdSpell);
  });

  spellRouter.get("/", async (req, res) => {
    res.status(StatusCodes.OK);

    const user = await spellRepository.getSpellByName(req.body.name);
    res.json(user);
  });

  return spellRouter;
}

export default SpellController;
