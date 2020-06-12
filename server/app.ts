import express from 'express'

interface IApp{
    express: express.Application
}

interface IController{
    route: string,
    router: express.Router
}

interface IAppConstruct{
    _port:number,
    _middlewares: Array<any>,
    _constrollers:Array<IController>,
    _errorMiddlewares:Array<any>
}

class App implements IApp{
    express = express()
    private isReady = false
    private _port: number
    private _middlewares: Array<any>
    private _constrollers: Array<IController>
    private _errorMiddlewares: Array<any>

    constructor(args:IAppConstruct){

        this._port = args._port
        this._constrollers = args._constrollers
        this._errorMiddlewares = args._errorMiddlewares
        this._middlewares = args._middlewares

        this.runMap()

    }

    private async runMap(){
        this.isReady = false
        await this.midlewares()
        await this.routes()
        await this.middlewaresError()

        this.isReady = true
    }

    private async midlewares():Promise<void>{
        for(let midleware of this._middlewares)
            await this.express.use(midleware)
        

    }

    private async routes():Promise<void>{
        for(let controller of this._constrollers)
            await this.express.use(controller.route, controller.router)
        
    }

    private async middlewaresError():Promise<void>{
        for(let midleware of this._errorMiddlewares)
            await this.express.use(midleware)
    }


    private runApp(){
        this.express.listen(this._port)
        .on("listening", () => console.debug(`Server Is Running in ${this._port}`))
        .on("error", (error) => console.debug(`Server event error ${String(error)}`))
        .on("connection", () => console.debug(`Server event connection`))
        .on("close", () => console.debug(`Server event close`))
    }


    listen():void{

        let id = setInterval(() => {
            if(this.isReady){
                clearInterval(id)
                this.runApp()
            }

        }, 1000)
    }



}

export default App