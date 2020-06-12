import {Sequelize} from 'sequelize'


const sequelize = new Sequelize(String(process.env.MYSQL_DB), String(process.env.MYSQL_USER), process.env.MYSQL_PW, {
    host:`${process.env.MYSQL_HOST}`, 
    dialect:'mysql',
    logging:false,
    pool:{
        idle:1000
    }
})

sequelize
    .authenticate()

export const database = {
    conexaoSequelize: sequelize,
    Sequelize
}
    
