import dotenv from "dotenv";

dotenv.config();

const serve_port = process.env.SERVER_PORT;
const database_connection_string = process.env.DATABASE_CONNECTION_STRING;

export default {
    serve_port,
    database_connection_string
}