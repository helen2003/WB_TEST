import knex from "#common/postgres/knex.js";
import { WarehouseListInput } from "../dto/warehouseList-dto/warehouseList-input.dto.js";

class WarehouseListService {
    async create_update(dataList: Array<WarehouseListInput>) {
        return knex("warehouseLists").insert(dataList).onConflict(["warehouseName", "datesId"]).merge();
    }
}

export const { create_update } = new WarehouseListService();
