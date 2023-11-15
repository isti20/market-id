import express from "express"
import cors from "cors"
import { PORT } from "./src/config/secret.js"

// import router
import r_users from "./src/routers/r_users.js";
import r_roles from "./src/routers/r_roles.js";
import r_categories from "./src/routers/r_categories.js";
import r_products from "./src/routers/r_products.js";
import r_checkouts from "./src/routers/r_checkouts.js";
import r_addresses from "./src/routers/r_addresses.js";
import r_wilayah from "./src/routers/r_wilayah.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb"} ));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

// router
app.use("/api/v1", r_users);
app.use("/api/v1", r_roles);
app.use("/api/v1", r_categories);
app.use("/api/v1", r_products);
app.use("/api/v1", r_checkouts);
app.use("/api/v1", r_addresses);
app.use("/api/v1", r_wilayah);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})