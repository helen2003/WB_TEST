import { createOrUpdateDates } from "#controller/dates.controller.js";
import { createOrUpdateList } from "#controller/warehouseList.controller.js";
import axios from "axios";
import cron from "node-cron";
import env from "#common/config/env/env.js";

// const tariffs = cron.schedule("0 * * * *", async () => {
const tariffs = cron.schedule("* * * * *", async () => {
    const dateNow = new Date().toISOString().split("T")[0];
    try {
        const response = await axios({
            url: `https://common-api.wildberries.ru/api/v1/tariffs/box`,
            method: "get",
            headers: {
                "Authorization": env.API_KEY,
            },
            params: { date: `${dateNow}` },
        });
        const tariffs = response.data.response.data;
        createOrUpdateDates({ date: dateNow, dtNextBox: tariffs.dtNextBox, dtTillMax: tariffs.dtTillMax });
        createOrUpdateList(dateNow, tariffs.warehouseList);
    } catch (error) {
        console.log(error);
    }
});

export { tariffs };
