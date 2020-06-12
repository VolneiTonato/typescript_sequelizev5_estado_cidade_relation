import dotenv from 'dotenv'
import {resolve as resolvePath} from 'path'

let fileEnv = process.env.NODE_ENV === 'production' ? '.env.local' : '.env.development.local'

dotenv.config({
    path: resolvePath(__dirname, '..', '..', fileEnv)
})