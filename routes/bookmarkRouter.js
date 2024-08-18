const express = require(`express`)
const { getAllBookmarks, addBookmark, deleteBookmarks } = require('../controllers/bookMarkController.js')
const router = express.Router()


router.route('/').get(getAllBookmarks)
router.route('/').post(addBookmark)
router.route('/').delete(deleteBookmarks)

module.exports = router;