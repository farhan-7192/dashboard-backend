import { Request, Response } from "express";
import * as campaignService from "../services/campaignService";

export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await campaignService.getCampaigns();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
};

export const createCampaign = async (req: Request, res: Response) => {
  try {
    const { title, subtitle } = req.body;

    const campaign = await campaignService.createCampaign(title, subtitle);

    res.json({
      message: "Campaign created successfully",
      id: campaign.id,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create campaign" });
  }
};

export const updateCampaignStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await campaignService.updateCampaignStatus(Number(id), status);

    res.json({ message: "Campaign status updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update campaign" });
  }
};
