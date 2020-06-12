import {Model, Sequelize, DataTypes} from 'sequelize'

export interface IEstadoModel{
    id:number,
    nome:string,
    sigla:string,
    readonly createAt:Date,
    readonly updateAt:Date
}

class EstadoModel extends Model<IEstadoModel> implements IEstadoModel{
    readonly createAt!: Date
    readonly updateAt!: Date
    public id!:number
    public nome!:string
    public sigla!:string


    public static initialize(sequelize:Sequelize){
        this.init<EstadoModel>({
            id: {type: DataTypes.INTEGER.UNSIGNED, primaryKey:true, autoIncrement:true},
            nome:{type:DataTypes.STRING(60), allowNull:false},
            sigla:{type:DataTypes.STRING(4), allowNull:false},
            createAt:{type:DataTypes.DATE, allowNull:false, defaultValue:Date.now},
            updateAt:{type:DataTypes.DATE, allowNull:false, defaultValue:Date.now}
        }, {
            sequelize:sequelize,
            underscored:true
        })
    }
}

export default EstadoModel