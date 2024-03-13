const { Schema, Types } = require('mongoose');
const { format_date } = require('./../utils/helpers');

const reactionSchema = new Schema(
    {
        reactiionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 300
        },
        username: {
            type: String,
            required: true
        }, createdAt: {
            type: Date,
            default: Date.now,
            get: format_date
          }
        },
          {
            toJSON: {
                virtuals: true,
                getters:true
            },
        }

)

module.exports = reactionSchema;