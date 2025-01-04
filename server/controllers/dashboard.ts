import { Request, Response } from "express";

export const dashboard = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID not found" });
    }
    res.status(200).json({ message: "Hello, welcome to your dashboard!", userId });
  } catch (err) {
    console.error(err + ' error in dashboard.ts');
    res.status(500).json({ message: "Server error" });
  }
};
