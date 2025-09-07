import mongoose from "mongoose";
import environmentVariables from "./environmentVariables.js";

const { database_connection_string } = environmentVariables;

async function connectToTheDatabase() {
    try {
        await mongoose.connect(database_connection_string);

        console.log(`🟢 Banco de Dados conectado com sucesso!`);
    } catch (error) {
        console.log(`🔴 Erro ao conectar ao Banco de Dados: ${error}`);
    }
}

export default connectToTheDatabase;