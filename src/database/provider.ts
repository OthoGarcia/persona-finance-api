import { ConnectionOptions, createConnection } from 'typeorm';
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
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
    ],
    migrations: [
      __dirname + '/../repositories/typeOrm/migrations{.ts,.js}',
    ]
  } as ConnectionOptions

}
export const databaseProviders = [
  {
    provide: TYPES.DatabaseConnection,
    useFactory: async () => await createConnection(getTypeormConfig()),
  },
];