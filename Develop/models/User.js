const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required:true,
            unique: true,
            validate: {
                validator: function(username) {
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(username)
                  },
                  message: username => `${username.value} is not a valid email`
                }
            },
            thoughts: [],
            friends: [],
        },{
            toJSON: {
                virtuals: true,
                getters:true
            },
        }

)
userSchema
  .virtual('friendCount')
  .get(function() {
    return this.friends.length
  })

const User = model('user', userSchema);

module.exports = User;