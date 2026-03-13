import { AppDataSource } from "../config/database";
import { Campaign } from "../models/Campaign";

const campaignRepo = AppDataSource.getRepository(Campaign);

export const getCampaigns = async () => {
  return campaignRepo.find({
    order: { id: "ASC" },
  });
};

export const createCampaign = async (title: string, subtitle: string) => {
  const newCampaign = campaignRepo.create({
    title,
    subtitle,
    theme: "teal",
    type: "bookmark",
    inboxCount: 0,
    clockCount: 0,
    status: "Draft",
    delivered: "0",
    opened: "0%",
    clicked: "0%",
    converted: "0%",
  });

  return campaignRepo.save(newCampaign);
};

export const updateCampaignStatus = async (id: number, status: string) => {
  const campaign = await campaignRepo.findOneBy({ id });

  if (!campaign) {
    throw new Error("Campaign not found");
  }

  campaign.status = status;

  return campaignRepo.save(campaign);
};
