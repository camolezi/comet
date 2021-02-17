import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import SpellRepository from "../persistence/spell.repository";

function SpellController(spellRepository: SpellRepository): Router {
  const spellRouter = Router();

  spellRouter.get("/:spellName", async (req, res) => {
    res.status(StatusCodes.OK);

    const spell = await spellRepository.getSpellByName(req.params.spellName);
    res.json(spell);
  });

  spellRouter.get("/id/:spellId", async (req, res) => {
    res.status(StatusCodes.OK);

    const spell = await spellRepository.getSpellById(req.params.spellId);
    res.json(spell);
  });

  return spellRouter;
}

export default SpellController;
