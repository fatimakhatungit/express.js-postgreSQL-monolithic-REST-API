import dotenv from "dotenv"
import { connect } from "http2";
import path from "path"

dotenv.config({
path : path.join(process.cwd(), '.env')

})

const config = {
    port : process.env.PORT,
    connection_string: process.env.DATABASE_URL as string,
};

export default config;