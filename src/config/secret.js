import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT | 3001;
const URL_DB = process.env.URL_DB;

export { PORT, URL_DB };