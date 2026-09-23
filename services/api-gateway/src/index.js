import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`⚙️ api-gateway running at port : ${PORT}`);
});
