import express from "express";
import cors from "cors";
import router from "./routes/myRoutes.routes.js";
import environmentVariables from "./config/environmentVariables.js";

const app = express();
const { serve_port } = environmentVariables;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(serve_port || 3001, () => console.log(`Servidor rodando na porta ${serve_port || 3001}!`));