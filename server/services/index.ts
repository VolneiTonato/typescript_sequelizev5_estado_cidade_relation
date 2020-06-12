import {ServiceEstadoIBGE} from './estadoService'
import {ServiceMunicipioIBGE} from './municipioService'
 
class Api{

    readonly estadoIBG = new ServiceEstadoIBGE()
    readonly municipioIBGE = new ServiceMunicipioIBGE()

}

export const api = new Api()