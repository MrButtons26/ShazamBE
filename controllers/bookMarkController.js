const jwt = require(`jsonwebtoken`);
const { promisify } = require(`util`);
const User = require(`../model/userModel`);

exports.getAllBookmarks = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const id = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const user = await User.findById(id.id)
        res.status(200).json({
            status: 'success',
            data: [...user.likedSongs_id]
        })
    }
    catch (e) {

    }
}

exports.addBookmark = async (req, res) => {
    const body = req.body.songId
    try {
        const token = req.headers.authorization.split(" ")[1];
        const id = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const userOne = await User.findById(id.id)
        const user = await User.findByIdAndUpdate(id.id, { userName: userOne.userName, likedSongs_id: [...userOne.likedSongs_id, body] }, { new: true })
        res.status(200).json({
            status: `success`
        })
    }
    catch (e) {
        res.status(300).json({
            status: `failed`
        })
        console.log(e)
    }
}
exports.deleteBookmarks = async (req, res) => {
    const body = req.body.songId
    try {
        const token = req.headers.authorization.split(" ")[1];
        const id = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const userOne = await User.findById(id.id)
        const bookmark = userOne.likedSongs_id.filter((el) =>
            el !== body
        )
        console.log(bookmark)
        const user = await User.findByIdAndUpdate(id.id, { likedSongs_id: [...bookmark] }, { new: true })
        res.status(200).json({
            status: `success`
        })
    }
    catch (e) {
        console.log(e)
        res.status(300).json({
            status: `failed`
        })
    }
};
