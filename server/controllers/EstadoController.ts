import {Request, Response, NextFunction} from 'express'
import {ExceptionError, CodeError} from '../exceptios/customException'
import {createResponse} from '../helpers/response'
import {EstadoModel, Database, MunicipioModel} from '../models/entities'
import {IEstadoModel} from '../models/entities/estado'
import {api} from '../services'

class EstadoController{

    public async show(req: Request, res: Response, next: NextFunction) {
        try{

            let municipio = await EstadoModel.findByPk(14, {include: [{model:MunicipioModel, as:'municipios'}]})

            res.send(municipio)

        }catch(err){
            next(new ExceptionError({status:CodeError.BAD_REQUEST, message:String(err)}))
        }
    }

    public async import(req:Request, res:Response, next:NextFunction){
        try{          

            let estadosExistentes = await EstadoModel.findAll()

            let estados =  await api.estadoIBG.findEstados()

            let filterEstados = estados.filter(row => {
                if(!estadosExistentes.find(exists => exists.id === row.id))
                    return row
            })

            if(filterEstados.length){

                Database.transaction(async t => {

                    for(let estado of estados){
                        await EstadoModel.build(estado).save({transaction:t})
                        
                    } 

                })

                return res.send(createResponse('Estados importados com sucesso!'))
            }else{
                res.send(createResponse('Nenhum estado para importar!'))
            }
        }catch(err){
            next(new ExceptionError({status: CodeError.BAD_REQUEST, message: String(err)}))
        }
    }
}


export const estadoController = new EstadoController()