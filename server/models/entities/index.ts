
import { database} from '../../database/provider.mysql'
import EstadoModel from './estado'
import MunicipioModel from './municipio'



let models = [ EstadoModel, MunicipioModel ]


models.forEach(model => model.initialize(database.conexaoSequelize))


MunicipioModel.belongsTo(EstadoModel, {foreignKey:'estado_id', targetKey:'id', as:'estado'})

EstadoModel.hasMany(MunicipioModel, {foreignKey:'estado_id', as:'municipios'})

const Database  = database.conexaoSequelize

export {
    Database,
    EstadoModel, 
    MunicipioModel
}