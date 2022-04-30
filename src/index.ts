import { AppDataSource } from "./data-source";
import * as express from "express";
import * as cors from "cors";

import router from "./routes";

const PORT = process.env.PORT || 9000;

// establecer conexion de base de datos
AppDataSource.initialize()
  .then(() => {
    console.log("BD is Connected");
  })
  .catch((err) => {
    console.log(err);
    console.log("Ocurrion un error");
  });

// Crear y configurar la aplicacion express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.get("/", (req, res) => res.status(200).json({ msg: "I am from backend" }));

app.use("/", router);

// Start express server
app.listen(PORT, () => console.log(`Server running`));
