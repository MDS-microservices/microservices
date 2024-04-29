import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1713536053708 implements MigrationInterface {
  name = 'Init1713536053708';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`product\`
                             (
                                 \`id\`          int          NOT NULL AUTO_INCREMENT,
                                 \`name\`        varchar(255) NOT NULL,
                                 \`description\` varchar(255) NOT NULL,
                                 \`price\`       int          NOT NULL,
                                 \`quantity\`    int          NOT NULL,
                                 PRIMARY KEY (\`id\`)
                             ) ENGINE = InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`product\``);
  }
}
