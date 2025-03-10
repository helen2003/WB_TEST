import { migrate } from "#common/postgres/knex.js";
import express from "express";
import cors from "cors";
import env from "#common/config/env/env.js";
import router from "#router/index.router.js";
import allCron from "./cron/index.js";

const PORT = env.APP_PORT || 7000;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);

const start = async () => {
    try {
        await migrate.latest();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
        allCron();
    } catch (e) {
        console.log(e);
    }
};

start();
