const {Schema, model} = require('mongoose');
const {Types: {ObjectId}} = Schema;
const materialSchema = new Schema(
    {
        value: {
            type: String,
            required: true,
            unique: true,
        },
        title: {
            type: String,
            required: true
        },
        group: {
            type: String,
            required: true
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)

module.exports = model('materials', materialSchema);
