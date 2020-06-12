import './config/env'
import App from './app'
import cors from 'cors'
import bodyParser from 'body-parser'
import {Routes} from './routes'
import {errorHandler} from './midleware/error.middleware'


new App({
    _port: Number(process.env.PORT),
    _middlewares:[
        cors(),
        bodyParser.urlencoded({extended:false}),
        bodyParser.json()
    ],
    _errorMiddlewares: [
        errorHandler
    ],
    _constrollers:Routes

}).listen()