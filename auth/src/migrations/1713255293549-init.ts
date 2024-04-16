import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1713255293549 implements MigrationInterface {
  name = 'Init1713255293549';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE \`auth\`
        (
            \`id\`       int          NOT NULL AUTO_INCREMENT,
            \`email\`    varchar(255) NOT NULL,
            \`password\` varchar(255) NOT NULL,
            PRIMARY KEY (\`id\`)
        ) ENGINE = InnoDB
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`auth\``);
  }
}
