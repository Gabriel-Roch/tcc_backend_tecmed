export interface IcreateAtendimento {
    descricao: string
    medicamentos: Array<{
        id_mp: string | number,
        quantidade: string | number
    }>
    id_service: string
}