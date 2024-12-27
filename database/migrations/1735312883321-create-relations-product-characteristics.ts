import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

const tableName = 'product_characteristics';

export class CreateRelationsOnProductCharacteristics1735312883321 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            tableName,
            new TableColumn({
                name: 'product_type_id',
                type: 'int',
                isNullable: true,
            })
        );
        await queryRunner.addColumn(
            tableName,
            new TableColumn({
                name: 'product_id',
                type: 'int',
                isNullable: true,
            })
        );
        await queryRunner.addColumn(
            tableName,
            new TableColumn({
                name: 'characteristic_id',
                type: 'int',
                isNullable: true,
            })
        );
        await queryRunner.addColumn(
            tableName,
            new TableColumn({
                name: 'characteristic_value_id',
                type: 'int',
                isNullable: true,
            })
        );

        //

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['product_type_id'],
                referencedTableName: 'product_types',
                referencedColumnNames: ['id'],
            })
        );
        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['product_id'],
                referencedTableName: 'products',
                referencedColumnNames: ['id'],
            })
        );
        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['characteristic_id'],
                referencedTableName: 'characteristics',
                referencedColumnNames: ['id'],
            })
        );
        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['characteristic_value_id'],
                referencedTableName: 'characteristic_values',
                referencedColumnNames: ['id'],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(tableName);

        const foreignKeyProductTypes = table?.foreignKeys.find(
            fk => fk.columnNames.indexOf('product_type_id') !== -1
        );
        const foreignKeyProduct = table?.foreignKeys.find(
            fk => fk.columnNames.indexOf('product_id') !== -1
        );
        const foreignKeyCharacteristic = table?.foreignKeys.find(
            fk => fk.columnNames.indexOf('characteristic_id') !== -1
        );
        const foreignKeyCharacteristicValue = table?.foreignKeys.find(
            fk => fk.columnNames.indexOf('characteristic_value_id') !== -1
        );

        if (foreignKeyProductTypes) {
            await queryRunner.dropForeignKey(tableName, foreignKeyProductTypes);
        }
        if (foreignKeyProduct) {
            await queryRunner.dropForeignKey(tableName, foreignKeyProduct);
        }
        if (foreignKeyCharacteristic) {
            await queryRunner.dropForeignKey(tableName, foreignKeyCharacteristic);
        }
        if (foreignKeyCharacteristicValue) {
            await queryRunner.dropForeignKey(tableName, foreignKeyCharacteristicValue);
        }

        await queryRunner.dropColumn(tableName, 'product_type_id');
        await queryRunner.dropColumn(tableName, 'product_id');
        await queryRunner.dropColumn(tableName, 'characteristic_id');
        await queryRunner.dropColumn(tableName, 'characteristic_value_id');
    }

}
