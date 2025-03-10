import { GoogleAuth } from "google-auth-library";
import { sortAllTariffs } from "#controller/dates.controller.js";

class GoogleService {
    async google_sheets(id: string, googleSheets: any, auth: GoogleAuth) {
        const spreadsheetId = id;

        const dataChangeList = [
            {
                updateSheetProperties: {
                    properties: {
                        sheetId: 0,
                        title: "stocks_coefs",
                    },
                    fields: "title",
                },
            },
        ];

        await googleSheets.spreadsheets.batchUpdate({
            spreadsheetId,
            requestBody: {
                requests: dataChangeList,
            },
        });

        const warehouseList = await sortAllTariffs();
        let rows = [
            [
                "Дата",
                "Дата начала следующего тарифа",
                "Дата окончания последнего установленного тарифа",
                "Название склада",
                "Коэффициент, %",
                "Доставка 1 литра, ₽",
                "Доставка каждого дополнительного литра, ₽",
                "Хранение 1 литра, ₽",
                "Хранение каждого дополнительного литра, ₽",
            ],
        ];
        warehouseList.forEach((warehouse) => {
            let { date, dtNextBox, dtTillMax, warehouseName, ...list } = warehouse;
            let arrList = Object.values(list);
            rows.push([date, dtNextBox, dtTillMax, warehouseName, ...arrList]);
        });

        await googleSheets.spreadsheets.values.update({
            auth,
            spreadsheetId,
            range: "stocks_coefs!A1",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                range: "stocks_coefs!A1",
                majorDimension: "ROWS",
                values: rows,
            },
        });
    }
}

export const { google_sheets } = new GoogleService();
