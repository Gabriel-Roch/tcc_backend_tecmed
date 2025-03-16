import { medicine_manufacturer } from "@prisma/client";

type newManafacturer = Omit<medicine_manufacturer, "id_mm" | "dt_create" | "fk_last_update_user" | "dt_last_update">

export type newManufacturerDTO = newManafacturer & {
    fk_insert_user: number
};