import { google } from "googleapis";
import { google_sheets } from "#service/google.service.js";

class GoogleController {
    async googleSheets(id_sheet_params: string[]) {
        const auth = new google.auth.GoogleAuth({
            keyFile: "./google.json",
            scopes: "https://www.googleapis.com/auth/spreadsheets",
        });
        const googleSheets = google.sheets({ version: "v4", auth });

        id_sheet_params.forEach(async (id: string) => {
            await google_sheets(id, googleSheets, auth);
        });
    }
}

export const { googleSheets } = new GoogleController();
