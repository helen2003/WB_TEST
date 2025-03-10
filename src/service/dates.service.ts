import knex from "#common/postgres/knex.js";
import { DatesInput } from "../dto/dates-dto/dates-input.dto.js";

class DatesService {
    async create_update(dataDates: DatesInput) {
        return knex("dates")
            .insert({ ...dataDates })
            .onConflict(["date"])
            .merge(["dtNextBox", "dtTillMax"]);
    }

    async get_all() {
        return knex("dates").join("warehouseLists", "dates.id", "warehouseLists.datesId").select("dates.*", "warehouseLists.*");
    }

    async get_by_date(date: string) {
        return knex("dates").where("date", date).first();
    }
}

export const { create_update, get_all, get_by_date } = new DatesService();
