const {Schema, model} = require('mongoose');
const {Types: {ObjectId}} = Schema;
const homeworkSchema = new Schema(
    {
        //  _id: Schema.Types.ObjectId,
        value: {
            type: String,
            required: true,
            unique: true,
        },
        userId:{
            type: ObjectId,
            ref: 'users',
            required: true
        },
        pairId: {
            type: Number,
            required: true
        },
        date: {
            type: String,
        }
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)

module.exports = model('homeworks', homeworkSchema);
