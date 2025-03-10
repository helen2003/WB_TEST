import Router, { Request, Response } from "express";
const googleSheetsRouter = Router();

import { googleSheets } from "#controller/google.controller.js";

googleSheetsRouter.post("/sheets", async (req: Request, res: Response) => {
    try {
        const { id_sheet } = req.body;
        await googleSheets(id_sheet);
        res.status(200).json({ message: "Таблица создана" });
    } catch (error) {
        res.status(400).json(error);
    }
});
export default googleSheetsRouter;
