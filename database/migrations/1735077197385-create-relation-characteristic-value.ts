import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

const tableName = 'characteristic_values';

export class  $npmConfigName1735077197385 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            tableName,
            new TableColumn({
                name: 'characteristic_id',
                type: 'int',
                isNullable: true,
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(tableName);
        const foreignKey = table?.foreignKeys.find(
            fk => fk.columnNames.indexOf('characteristic_id') !== -1
        );

        if (foreignKey) {
            await queryRunner.dropForeignKey(tableName, foreignKey);
        }

        await queryRunner.dropColumn(tableName, 'characteristic_id');
    }

}
