import { Request, Response } from "express";
import { createTestService } from "../services/test.services";

export const createTestHandler = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const test = await createTestService(name);
    res.status(201).json(test);
  } catch (error: any) {
    console.error("Error creating test:", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong while creating test",
    });
  }
};
