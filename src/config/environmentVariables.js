import dotenv from "dotenv";

dotenv.config();

const serve_port = process.env.SERVER_PORT;

export default {
    serve_port
}