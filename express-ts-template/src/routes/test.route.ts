import { Router } from "express";
import { createTestHandler } from "../controllers/test.controller";

const router = Router();

router.post("/", createTestHandler);

export default router;
