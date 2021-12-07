//Schema Documentation: https://mongoosejs.com/docs/guide.html
const {Schema, model} = require('mongoose');
const {Types: {ObjectId}} = Schema;
const Mat_Schema = new Schema(
    {
        //
        value: {
            type: String,
            required: true,
            unique: true,
        },
        userId:{
            //Это айди юзера или новости?
            type: ObjectId,
            ref: 'users',
            required: true
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

module.exports = model('mtrl', Mat_Schema);