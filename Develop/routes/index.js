const router = require('express').Router();
const apiRoutes = require('./api');

const {   getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend} = require('./api/userRoutes')

const { getThoughts, 
    getSingleThought,
    removeReaction , 
    addReaction, 
    deleteThought,
    createThought} = require('./api/thoughtRoutes')


//user routes
router.route('/api/getUsers').get(getUsers);
router.route('/api/createUser').post(createUser);
router.route('/api/getSingleUser').get(getSingleUser);
router.route('/api/deleteUser').delete(deleteUser);
router.route('/api/updateUser').put(updateUser);
router.route('/api/addFriend').post(addFriend);
router.route('/api/removeFriend').delete(removeFriend);

//thought routes
router.route('/api/getThoughts').get(getThoughts);
router.route('/api/createThought').post(createThought);
router.route('/api/getSingleThought').get(getSingleThought);
router.route('/api/removeReaction').delete(removeReaction);
router.route('/api/addReaction').put(addReaction);
router.route('/api/deleteThought').delete(deleteThought);

module.exports = router;
