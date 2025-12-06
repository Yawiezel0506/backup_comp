import { postgraphile } from 'postgraphile'
import dotenv from "dotenv"

dotenv.config()

const { DATABASE, PG_USER, PASSWORD, HOST, PG_PORT } = process.env

export const myPostgraphile = postgraphile(
    {
        database: DATABASE,
        user: PG_USER,
        password: PASSWORD,
        host: HOST,
        port: Number(PG_PORT),
    },
    'public',
    {
        watchPg: true,
        graphiql: true,
        enhanceGraphiql: true,
    }
)