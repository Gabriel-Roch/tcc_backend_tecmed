import { medicine_products_category, medicine_products_distribution_unit_of_measure } from "@prisma/client"
import { z } from "zod"

export const newProductDTO = z.object({
    mp_name: z.string(),
    category: z.nativeEnum(medicine_products_category),
    distribution_unit_of_measure: z.nativeEnum(medicine_products_distribution_unit_of_measure),
    quantity_per_measure: z.number(),
    current_stock: z.number(),
    reserved_stock: z.number(),
    min_stock_level: z.number(),
    fk_medicine_manufacturer: z.number()
})