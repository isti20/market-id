import express from "express"
import cors from "cors"
import { PORT } from "./src/config/secret.js"

// import router
import r_users from "./src/routers/r_users.js";
import r_roles from "./src/routers/r_roles.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb"} ));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// router
app.use("/api/v1", r_users);
app.use("/api/v1", r_roles);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})