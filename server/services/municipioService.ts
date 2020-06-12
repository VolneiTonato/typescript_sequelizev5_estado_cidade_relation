import {AbstractService} from './abastract.service'

export interface IMunicipioServiceResponse{
    id?:number,
    sigla?:string,
    nome?:string
}

class ServiceMunicipioIBGE extends AbstractService{


    async findMunicipisBySigla(sigla: string){
        try{
            const { data } : {data:IMunicipioServiceResponse[]} = await this.axios.get(`/estados/${sigla}/municipios`)

            return data
        }catch(err){
            throw err
        }
        
    }
}

export {ServiceMunicipioIBGE}