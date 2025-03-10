/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema
        .createTable("dates", function (table) {
            table.increments("id");
            table.string("date");
            table.string("dtNextBox");
            table.string("dtTillMax");

            table.unique("date");
        })
        .createTable("warehouseLists", function (table) {
            table.increments("id");
            table.string("boxDeliveryAndStorageExpr");
            table.string("boxDeliveryBase");
            table.string("boxDeliveryLiter");
            table.string("boxStorageBase");
            table.string("boxStorageLiter");
            table.string("warehouseName");
            table.integer("datesId").references("dates.id");

            table.unique(["warehouseName", "datesId"]);
        });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTable("dates").dropTable("warehouseLists");
}
