import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT | 3001;
const URL_DB = process.env.URL_DB;
const SECRET_KEY = process.env.SECRET_KEY;

export { PORT, URL_DB, SECRET_KEY };