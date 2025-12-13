import { DataTypes } from 'sequelize'
import db from '../db/conn.js'

import User from './User.js'

// Define o model Vibe
const Vibe = db.define('Vibe', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

// Define relacionamento: cada Vibe pertence a um User
Vibe.belongsTo(User)

// Define relacionamento: cada User pode ter várias Vibes
User.hasMany(Vibe)

export default Vibe
