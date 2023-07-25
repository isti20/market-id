import express from "express"
import cors from "cors"
import r_users from "./src/routers/r_users.js"

const app = express();

app.use(cors());
app.use(r_users);

app.listen(3001, () => {
    console.log(`Server running on http://localhost:${3001}`)
})