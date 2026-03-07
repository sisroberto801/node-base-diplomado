import 'dotenv/config'

const env = {
  port: process.env.PORT || '3000',
  db_port: process.env.DB_PORT,
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_database: process.env.DB_DATABASE,
  db_dialect: process.env.DB_DIALECT,
}

export default env