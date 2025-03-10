import { WarehouseListInput } from "#dto/warehouseList-dto/warehouseList-input.dto.js";
import { create_update } from "#service/warehouseList.service.js";
import { getOneDatesByDate } from "./dates.controller.js";

class WarehouseListController {
    async createOrUpdateList(date: string, list: Array<WarehouseListInput>): Promise<number> {
        const dateRow = await getOneDatesByDate(date);
        list.map((item) => (item.datesId = dateRow.id));
        const res = await create_update(list);
        return JSON.parse(JSON.stringify(res)).rowCount;
    }
}

export const { createOrUpdateList } = new WarehouseListController();
