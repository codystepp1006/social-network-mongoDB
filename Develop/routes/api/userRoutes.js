const router = require('express').Router();
const { User, Thought } = require('../../models')

async function getUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts')
      res.json(users)
    } catch (err) {
      res.status(500).json(err)
    }
  }
    async function getSingleUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId }).populate('thoughts')
    
          if (!user) {
            return res.status(404).json({ message: 'No user with that ID' })
          }
    
          res.json(user)
        } catch (err) {
          res.status(500).json(err)
        }
      }
    
      async function createUser(req, res) {
        try {
          const user = await User.create(req.body)
          res.json(user)
        } catch (err) {
          console.log(err)
          return res.status(500).json(err)
        }
      }
    
      async function deleteUser(req, res) {
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId })
    
          if (!user) {
            res.status(404).json({ message: 'No user with that ID' })
          }
    
          await Thought.deleteMany({ _id: { $in: user.thoughts } })
          res.json({ message: 'User and thoughts deleted!' })
        } catch (err) {
          res.status(500).json(err)
        }
      }
    
      async function updateUser(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          )
    
          if (!user) {
            res.status(404).json({ message: 'No user with this id!' })
          }
    
          res.json(user)
        } catch (err) {
          res.status(500).json(err)
        }
      }
    
      async function addFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            {$push: {friends: req.params.friendId}}
          )
    
          res.json(user)
        } catch (err) {
          console.log(err)
          return res.status(500).json(err)
        }
      }
    
      async function removeFriend(req, res) {
        try {
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            {$pull: {friends: req.params.friendId}}
          )
    
          if (!user) {
            res.status(404).json({ message: 'No user with that ID' })
          }
    
          res.json(user)
        } catch (err) {
          res.status(500).json(err)
        }
      }


module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend
};