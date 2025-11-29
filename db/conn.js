import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('Vibes', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

try {
    sequelize.authenticate()
    console.log("Conectamos com sucesso!")
} catch (err){
    console.log("Não foi possível conectar:  ${err}")
}

export default sequelize