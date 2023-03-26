import { ConnectionOptions, createConnection, DataSource, DataSourceOptions } from 'typeorm';
import { TYPES } from '../utils/symbols';

const getTypeormConfig = () =>{
  const {
    TYPEORM_DATABASE,
    TYPEORM_DATABASE_URL,
    TYPEORM_DATABASE_PORT,
    TYPEORM_DATABASE_USER,
    TYPEORM_DATABASE_PASSWORD,
    TYPEORM_DATABASE_NAME
  } = process.env

  return {
    type: TYPEORM_DATABASE,
    host: TYPEORM_DATABASE_URL,
    port: TYPEORM_DATABASE_PORT,
    username: TYPEORM_DATABASE_USER,
    password: TYPEORM_DATABASE_PASSWORD,
    database: TYPEORM_DATABASE_NAME,
    synchronize: true,
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
    ],
    migrations: [
      __dirname + '/../repositories/typeOrm/migrations{.ts,.js}',
    ]
  } as DataSourceOptions

}
export const databaseProviders = [
  {
    provide: TYPES.DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource(getTypeormConfig())
      return dataSource.initialize();
    },
  },
];