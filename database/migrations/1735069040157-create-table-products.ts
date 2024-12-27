import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

const tableName = 'products';

export class CreateTableProducts1735069040157 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        length: '250',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'text',
                        isNullable: false,
                    },
                    {
                        name: 'price',
                        type: "decimal",
                        precision: 10,
                        scale: 4,
                        isNullable: false,
                    },
                    {
                        name: 'discount',
                        type: "decimal",
                        precision: 10,
                        scale: 4,
                    },
                    // {
                    //     name: 'product_type_id',
                    // },
                    {
                        name: 'active',
                        type: 'boolean',
                        default: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        // await queryRunner.createForeignKey(
        //     tableName,
        //     new TableForeignKey({
        //         columnNames: ["product_type_id"],
        //         referencedColumnNames: ["id"],
        //         referencedTableName: "product_type",
        //         onUpdate: "CASCADE",
        //     })
        // );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // // foreing key
        // const table = await queryRunner.getTable(tableName);
        // const foreignKey = table?.foreignKeys.find(
        //     (fk) => fk.columnNames.indexOf("product_type_id") !== -1
        // );
        // if (foreignKey) {
        //     await queryRunner.dropForeignKey(tableName, foreignKey);
        // }
        // table
        await queryRunner.dropTable(tableName);
    }

}
