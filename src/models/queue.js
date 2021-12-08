const {Schema, model} = require('mongoose');

const {Types: {ObjectId}} = Schema;

const queueSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        students: {
            type: [ObjectId],
            ref: 'users',
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

module.exports = model('queue', queueSchema);
