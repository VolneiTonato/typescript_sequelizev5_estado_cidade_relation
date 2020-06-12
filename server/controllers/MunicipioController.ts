import { Request, Response, NextFunction } from 'express'
import { ExceptionError, CodeError } from '../exceptios/customException'
import { createResponse } from '../helpers/response'
import { EstadoModel, Database, MunicipioModel } from '../models/entities'
import { api } from '../services'

class MunicipioController {


    public async show(req: Request, res: Response, next: NextFunction) {
        try{

            let municipio = await MunicipioModel.findByPk(14, {include: [{model:EstadoModel, as:'estado'}]})

            res.send(municipio)

        }catch(err){
            next(new ExceptionError({status:CodeError.BAD_REQUEST, message:String(err)}))
        }
    }


    public async import(req: Request, res: Response, next: NextFunction) {
        try {

            let estadosExistentes = await EstadoModel.findAll()

            const importInner = async () => {



                for (let estado of estadosExistentes) {

                    Database.transaction(async t => {

                        let municipios = await api.municipioIBGE.findMunicipisBySigla(estado.sigla)

                        new Promise(resolve => setTimeout(resolve, 500))

                        console.debug(`Importando ${municipios.length} municipios para o estado de ${estado.sigla}`)

                        try {
                            for (let municipio of municipios) {
                                new Promise(resolve => setTimeout(resolve, 100))
                                try {

                                    let model = await MunicipioModel.build(municipio)

                                    model.setEstado(estado.id, {save:false})

                                    await model.save({ transaction: t })
                                } catch (err) {

                                    if (/SequelizeUniqueConstraintError/ig.test(String(err)) === false)
                                        throw err
                                }

                            }

                            t.commit()

                        } catch (err) {
                            t.rollback()
                            return false
                        }

                    }).catch(err => {
                        return
                    })


                }


            }

            importInner()
            res.send('ok')


        } catch (err) {
            next(new ExceptionError({ status: CodeError.BAD_REQUEST, message: String(err) }))
        }
    }
}


export const municipioController = new MunicipioController()