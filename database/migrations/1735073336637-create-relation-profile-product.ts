import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

const tableName = 'products';

export class  CreateRelationProfileProduct1735073336637 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            tableName,
            new TableColumn({
                name: 'profile_id',
                type: 'int',
                isNullable: true,
            })
        );

        await queryRunner.createForeignKey(
            tableName,
            new TableForeignKey({
                columnNames: ['profile_id'],
                referencedTableName: 'profiles', 
                referencedColumnNames: ['id'],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(tableName);
        const foreignKey = table?.foreignKeys.find(
            fk => fk.columnNames.indexOf('profile_id') !== -1
        );

        if (foreignKey) {
            await queryRunner.dropForeignKey(tableName, foreignKey);
        }

        await queryRunner.dropColumn(tableName, 'profile_id');
    }

}
