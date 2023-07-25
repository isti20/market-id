import express from "express"
import cors from "cors"
import { PORT } from "./src/config/secret.js"
import r_users from "./src/routers/r_users.js"

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb"} ));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(r_users);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})