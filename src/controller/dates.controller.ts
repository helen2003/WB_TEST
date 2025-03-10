import { DatesInput } from "#dto/dates-dto/dates-input.dto.js";
import { DatesModel } from "#dto/dates-dto/dates-model.dto.js";
import { WarehouseListModel } from "#dto/warehouseList-dto/dates-model.dto.js";
import { create_update, get_all, get_by_date } from "#service/dates.service.js";

class DatesController {
    async createOrUpdateDates(dataDates: DatesInput): Promise<number> {
        const date = await create_update(dataDates);
        return JSON.parse(JSON.stringify(date)).rowCount;
    }

    async getAllTariffs(): Promise<Array<WarehouseListModel>> {
        const allTariffs = await get_all();
        const newList = allTariffs.map(({ id, datesId, ...list }) => {
            return list;
        });
        return newList;
    }

    async getOneDatesByDate(date: string): Promise<DatesModel> {
        return get_by_date(date);
    }

    async sortAllTariffs(): Promise<Array<WarehouseListModel>> {
        const warehouseList = await getAllTariffs();
        warehouseList.sort((a, b) => {
            if (a.warehouseName == "Маркетплейс") return -1;
            if (b.warehouseName == "Маркетплейс") return 1;
            return Number(a.boxDeliveryAndStorageExpr) - Number(b.boxDeliveryAndStorageExpr) || a.warehouseName.localeCompare(b.warehouseName);
        });
        warehouseList.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf());
        return warehouseList;
    }
}

export const { createOrUpdateDates, getAllTariffs, getOneDatesByDate, sortAllTariffs } = new DatesController();
