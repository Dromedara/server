const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        login: {
            type: String,
            required: true,
            unique: true,
        },
        pass: {
            type: String,
            required: true
        },
        name: {
            type: String,
        },
        group: {
            type: String,
        },
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)

module.exports = model('user', userSchema);
