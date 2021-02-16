import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import SpellRepository from "../persistence/spell.repository";

function SpellController(spellRepository: SpellRepository): Router {
  const spellRouter = Router();

  spellRouter.get("/:spellName", async (req, res) => {
    res.status(StatusCodes.OK);

    const user = await spellRepository.getSpellByName(req.params.spellName);
    res.json(user);
  });

  return spellRouter;
}

export default SpellController;
