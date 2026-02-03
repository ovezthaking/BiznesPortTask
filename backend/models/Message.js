import { DataTypes } from "sequelize"
import sequelize from '../utils/database.js'

const Message = sequelize.define("Message", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Wiadomość musi mieć treść'
            },
            len: {
                args: [1, 1000],
                msg: 'Maksymalna liczba znaków: 1000'
            }
        }
    }
},{
    tableName: 'Messages',
    timestamps: true
})

export default Message
