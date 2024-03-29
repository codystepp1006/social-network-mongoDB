const router = require('express').Router()
const { User, Thought } = require('../../models')


  async function getThoughts(req, res) {
    try {
      const thoughts = await Thought.find()

      res.json(thoughts)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  }
  async function getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }

      res.json(thought)
    } catch (err) {
      console.log(err)
      return res.status(500).json(err)
    }
  }
  async function createThought(req, res) {
    try {
      const thought = await Thought.create(req.body)

      const user = await User.findOneAndUpdate(
        {username: req.body.username},
        {$push: {thoughts: thought._id}}
      )

      res.json(user)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  async function updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$set: req.body},
        { runValidators: true, new: true }
      )

      res.json(thought)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  async function deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId })

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' })
      }

      res.json({ message: 'Thought successfully deleted' })
    } catch (err) {
      console.log(err);
      res.status(500).json(err)
    }
  }
  async function addReaction(req, res) {
    console.log('You are adding a reaction')
    console.log(req.body)

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that id' })
      }

      res.json(thought)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  async function removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No reaction found with that id' })
      }

      res.json(thought)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  module.exports = {
    getThoughts, 
    getSingleThought,
    removeReaction , 
    addReaction, 
    deleteThought,
    createThought }