-- CreateTable
CREATE TABLE `master_blood` (
    `id_b` INTEGER NOT NULL AUTO_INCREMENT,
    `b_name` VARCHAR(5) NOT NULL,
    `b_active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id_b`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medical_agreement` (
    `id_ma` INTEGER NOT NULL,
    `ma_name` VARCHAR(120) NULL,
    `fk_insert_user` INTEGER NOT NULL,
    `fk_last_update_user` INTEGER NULL,
    `last_date_update` TIMESTAMP(0) NULL,
    `dt_create` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_insert_user`(`fk_insert_user`),
    INDEX `fk_last_update_user`(`fk_last_update_user`),
    PRIMARY KEY (`id_ma`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicine_manufacturer` (
    `id_mm` INTEGER NOT NULL AUTO_INCREMENT,
    `m_name` VARCHAR(120) NOT NULL,
    `cnpj` VARCHAR(30) NULL,
    `fk_insert_user` INTEGER NOT NULL,
    `dt_create` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fk_last_update_user` INTEGER NULL,
    `dt_last_update` TIMESTAMP(0) NULL,

    INDEX `fk_insert_user`(`fk_insert_user`),
    INDEX `fk_last_update_user`(`fk_last_update_user`),
    PRIMARY KEY (`id_mm`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicine_products` (
    `id_mp` INTEGER NOT NULL AUTO_INCREMENT,
    `mp_name` VARCHAR(255) NOT NULL,
    `category` ENUM('medicamento', 'limpeza', 'insumos') NULL,
    `distribution_unit_of_measure` ENUM('micrograma', 'miligrama', 'gramas', 'mililitro', 'gotas', 'microgotas', 'unidade', 'litro', 'quilograma', 'comprimidos') NULL,
    `quantity_per_measure` DECIMAL(10, 3) NOT NULL,
    `current_stock` INTEGER NOT NULL,
    `reserved_stock` INTEGER NOT NULL,
    `min_stock_level` INTEGER NOT NULL,
    `fk_medicine_manufacturer` INTEGER NOT NULL,
    `fk_insert_user` INTEGER NOT NULL,
    `dt_create` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fk_update_user` INTEGER NOT NULL,
    `dt_last_update` TIMESTAMP(0) NULL,

    INDEX `fk_insert_user`(`fk_insert_user`),
    INDEX `fk_medicine_manufacturer`(`fk_medicine_manufacturer`),
    INDEX `fk_update_user`(`fk_update_user`),
    UNIQUE INDEX `mp_name`(`mp_name`, `fk_medicine_manufacturer`, `distribution_unit_of_measure`),
    PRIMARY KEY (`id_mp`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `moving_products` (
    `id_mov` INTEGER NOT NULL AUTO_INCREMENT,
    `fk_id_product` INTEGER NOT NULL,
    `fk_requester_id_user` INTEGER NOT NULL,
    `fk_destination_patient` VARCHAR(36) NOT NULL,
    `qty` DECIMAL(10, 3) NOT NULL,
    `_type` ENUM('input', 'output') NULL,
    `_status` ENUM('pending', 'success', 'cancelled') NULL,
    `status_updated_at` TIMESTAMP(0) NULL,

    INDEX `fk_destination_patient`(`fk_destination_patient`),
    INDEX `fk_id_product`(`fk_id_product`),
    INDEX `fk_requester_id_user`(`fk_requester_id_user`),
    PRIMARY KEY (`id_mov`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients` (
    `id_p` VARCHAR(36) NOT NULL,
    `p_name` VARCHAR(120) NOT NULL,
    `sex` ENUM('M', 'F') NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `rg` VARCHAR(20) NOT NULL,
    `fk_type_blood` INTEGER NOT NULL,
    `fk_medical_agreement` INTEGER NULL,
    `fk_insert_user` INTEGER NOT NULL,
    `fk_last_update_user` INTEGER NULL,
    `medical_agreement_number` VARCHAR(45) NULL,
    `last_date_update` TIMESTAMP(0) NULL,
    `dt_create` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `email` VARCHAR(120) NOT NULL,

    UNIQUE INDEX `unique_cpf`(`cpf`),
    UNIQUE INDEX `unique_rg`(`rg`),
    INDEX `fk_insert_user`(`fk_insert_user`),
    INDEX `fk_last_update_user`(`fk_last_update_user`),
    INDEX `fk_medical_agreement`(`fk_medical_agreement`),
    INDEX `fk_type_blood`(`fk_type_blood`),
    PRIMARY KEY (`id_p`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients_address` (
    `fk_id_pa` VARCHAR(36) NOT NULL,
    `zip_code` VARCHAR(45) NULL,
    `street` VARCHAR(80) NULL,
    `complement` VARCHAR(80) NULL,
    `unit` VARCHAR(80) NULL,
    `neighborhood` VARCHAR(80) NULL,
    `city` VARCHAR(80) NULL,
    `state_abbr` VARCHAR(80) NULL,
    `state` VARCHAR(80) NULL,
    `region` VARCHAR(80) NULL,
    `_description` VARCHAR(80) NULL,

    PRIMARY KEY (`fk_id_pa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `patients_telephone` (
    `fk_id_p` VARCHAR(36) NOT NULL,
    `tell` VARCHAR(20) NOT NULL,
    `description` VARCHAR(80) NULL,

    UNIQUE INDEX `fk_id_p`(`fk_id_p`, `tell`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id_u` INTEGER NOT NULL AUTO_INCREMENT,
    `u_name` VARCHAR(120) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL,
    `password` VARCHAR(80) NOT NULL,
    `dt_create` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `cpf`(`cpf`),
    PRIMARY KEY (`id_u`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `medical_agreement` ADD CONSTRAINT `medical_agreement_ibfk_1` FOREIGN KEY (`fk_insert_user`) REFERENCES `user`(`id_u`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `medical_agreement` ADD CONSTRAINT `medical_agreement_ibfk_2` FOREIGN KEY (`fk_last_update_user`) REFERENCES `user`(`id_u`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `medicine_manufacturer` ADD CONSTRAINT `medicine_manufacturer_ibfk_1` FOREIGN KEY (`fk_insert_user`) REFERENCES `user`(`id_u`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `medicine_manufacturer` ADD CONSTRAINT `medicine_manufacturer_ibfk_2` FOREIGN KEY (`fk_last_update_user`) REFERENCES `user`(`id_u`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `medicine_products` ADD CONSTRAINT `medicine_products_ibfk_1` FOREIGN KEY (`fk_medicine_manufacturer`) REFERENCES `medicine_manufacturer`(`id_mm`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `medicine_products` ADD CONSTRAINT `medicine_products_ibfk_2` FOREIGN KEY (`fk_insert_user`) REFERENCES `user`(`id_u`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `medicine_products` ADD CONSTRAINT `medicine_products_ibfk_3` FOREIGN KEY (`fk_update_user`) REFERENCES `user`(`id_u`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `moving_products` ADD CONSTRAINT `moving_products_ibfk_1` FOREIGN KEY (`fk_id_product`) REFERENCES `medicine_products`(`id_mp`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `moving_products` ADD CONSTRAINT `moving_products_ibfk_2` FOREIGN KEY (`fk_requester_id_user`) REFERENCES `user`(`id_u`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `moving_products` ADD CONSTRAINT `moving_products_ibfk_3` FOREIGN KEY (`fk_destination_patient`) REFERENCES `patients`(`id_p`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_ibfk_1` FOREIGN KEY (`fk_insert_user`) REFERENCES `user`(`id_u`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_ibfk_2` FOREIGN KEY (`fk_last_update_user`) REFERENCES `user`(`id_u`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_ibfk_3` FOREIGN KEY (`fk_type_blood`) REFERENCES `master_blood`(`id_b`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `patients` ADD CONSTRAINT `patients_ibfk_4` FOREIGN KEY (`fk_medical_agreement`) REFERENCES `medical_agreement`(`id_ma`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `patients_address` ADD CONSTRAINT `patients_address_ibfk_1` FOREIGN KEY (`fk_id_pa`) REFERENCES `patients`(`id_p`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `patients_telephone` ADD CONSTRAINT `patients_telephone_ibfk_1` FOREIGN KEY (`fk_id_p`) REFERENCES `patients`(`id_p`) ON DELETE NO ACTION ON UPDATE NO ACTION;
