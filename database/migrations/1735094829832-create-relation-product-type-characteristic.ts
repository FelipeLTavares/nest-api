import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

const tableName = 'characteristics';

export class $npmConfigName1735094829832 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            tableName,
            new TableColumn({
                name: 'product_type_id',
                type: 'int',
                isNullable: true,
            })
        );

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['product_type_id'],
                referencedTableName: 'product_types',
                referencedColumnNames: ['id'],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(tableName);
        const foreignKey = table?.foreignKeys.find(
            fk => fk.columnNames.indexOf('product_type_id') !== -1
        );

        if (foreignKey) {
            await queryRunner.dropForeignKey(tableName, foreignKey);
        }

        await queryRunner.dropColumn(tableName, 'product_type_id');
    }

}
