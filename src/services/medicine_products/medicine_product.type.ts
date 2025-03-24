import { medicine_products_category, medicine_products_distribution_unit_of_measure } from "@prisma/client"

export interface IcreateProduct {
    mp_name: string
    category: medicine_products_category
    distribution_unit_of_measure: medicine_products_distribution_unit_of_measure
    quantity_per_measure: number
    current_stock: number
    min_stock_level: number
    fk_medicine_manufacturer: number
    fk_insert_user: string
}


export interface IgetAll {
    id_mp : string | number
    mp_name: string
    category: string
    distribution_unit_of_measure: number
    quantity_per_measure: number
    current_stock: number
    reserved_stock: number
    min_stock_level: number
    id_register_user: string
    register_user: string
    name_manufacturer: string
}