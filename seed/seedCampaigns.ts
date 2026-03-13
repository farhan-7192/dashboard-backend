import { AppDataSource } from "../config/database";
import { Campaign } from "../models/Campaign";

export const seedCampaigns = async () => {
  const repo = AppDataSource.getRepository(Campaign);

  const count = await repo.count();

  if (count === 0) {
    const campaigns = repo.create([
      {
        title: "Special Offers for Loyal Customers",
        subtitle:
          "Thank you for being our loyal customer! As a token of our appreciation...",
        theme: "indigo",
        type: "bookmark",
        inboxCount: 2,
        clockCount: 4,
        status: "Running",
        delivered: "5.72K",
        opened: "60.5%",
        clicked: "17.7%",
        converted: "1.2%",
      },
      {
        title: "Customer Feedback Request",
        subtitle:
          "We would love to hear your thoughts! Please take a moment...",
        theme: "pink",
        type: "message",
        inboxCount: 2,
        clockCount: 2,
        status: "Running",
        delivered: "4.82K",
        opened: "34.5%",
        clicked: "6.9%",
        converted: "2.3%",
      },
    ]);

    await repo.save(campaigns);

    console.log("Dummy campaigns seeded.");
  }
};
