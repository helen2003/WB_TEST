import Router from "express";
const router = Router();

import googleSheetsRouter from "./google-table.router.js";

router.use("/google", googleSheetsRouter);

export default router;
