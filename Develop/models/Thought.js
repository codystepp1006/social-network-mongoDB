const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const { format_date } = require('../utils/helpers');

const thoughtSchema = new Schema(
    {
        thought: {
            type: String,
            required: true,
            maxlength:300
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema],
        reactMade: {
            type: Date,
            default: Date.now,
            get: format_date
        },
    },{
        toJSON: {
            virtuals:true,
            getters: true
          },
          id: false
    }
)

thoughtSchema
.virtual('reactionCount')
.get(function() {
    return this.reactions.length
})

const Thought = model('thought', thoughtSchema)

module.exports = Thought