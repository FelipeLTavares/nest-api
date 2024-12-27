import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = 'product_characteristics';

export class  CreateTableProductCharacteristics1735096090975 implements MigrationInterface {

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
            name: 'form',
            type: 'varchar',
            length: '250',
            isNullable: false,
          },
          {
            name: 'value',
            type: 'varchar',
            length: '250',
            isNullable: false,
          },
          {
            name: 'measurement_unit',
            type: 'varchar',
            length: '250',
            isUnique: true,
            isNullable: false,
          },
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(tableName);
  }

}
