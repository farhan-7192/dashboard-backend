import { Router } from "express";
import * as campaignController from "../controllers/campaignController";

const router = Router();

router.get("/", campaignController.getCampaigns);

router.post("/", campaignController.createCampaign);

router.patch("/:id", campaignController.updateCampaignStatus);

export default router;
