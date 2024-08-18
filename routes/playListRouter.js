const express = require(`express`)
const { addPlayList, deletePlayList, addSong, deleteSong } = require('../controllers/playListController.js')
const router = express.Router()


// router.route('/').get(getAllBookmarks)
router.route('/').post(addPlayList)
router.route('/').delete(deletePlayList)
router.route('/song').post(addSong)
router.route('/song').delete(deleteSong)
module.exports = router;