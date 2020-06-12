import {AbstractService} from './abastract.service'

export interface IEstadoServiceResponse{
    id?:number,
    sigla?:string,
    nome?:string
}

class ServiceEstadoIBGE extends AbstractService{


    async findEstados(){
        try{
            const { data } : {data:IEstadoServiceResponse[]} = await this.axios.get('/estados')

            return data
        }catch(err){
            throw err
        }
        
    }
}

export {ServiceEstadoIBGE}