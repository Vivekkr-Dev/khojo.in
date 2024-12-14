import { Router } from "express";
import { healthRouter } from "./healthRoute";

const router = Router();

router.use('/api/v1', healthRouter)

export default router;