import {
    Association, DataTypes, Model, Sequelize,
    BelongsToGetAssociationMixin,
    BelongsToSetAssociationMixin
} from 'sequelize'

import EstadoModel from './estado'

interface IMunicipioModel{
    id:number,
    nome:string,
    readonly createAt:Date,
    readonly updateAt:Date
}


class MunicipioModel extends Model implements IMunicipioModel{
    readonly createAt!: Date
    readonly updateAt!: Date
    public id!:number
    public nome!:string
    


    public getEstado!: BelongsToGetAssociationMixin<EstadoModel>
    public setEstado!: BelongsToSetAssociationMixin<EstadoModel, number>

    public static associations:{
        estado: Association<EstadoModel>
    }

    public static initialize(sequelize:Sequelize){
        this.init({
            id: {type: DataTypes.INTEGER.UNSIGNED, primaryKey:true, autoIncrement:true},
            nome:{type:DataTypes.STRING(100), allowNull:false},
            createAt:{type:DataTypes.DATE, defaultValue:Date.now, allowNull:false},
            updateAt:{type:DataTypes.DATE, defaultValue:Date.now, allowNull:false}
        }, {
            sequelize:sequelize,
            underscored:true
        })
    }
}

export default MunicipioModel