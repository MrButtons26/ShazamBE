const jwt = require(`jsonwebtoken`);
const { promisify } = require(`util`);
const PlayList = require(`../model/playListsModel.js`);
const User = require(`../model/userModel`);


exports.addPlayList = async (req, res) => {
    const body = req.body.playlistName
    try {
        const token = req.headers.authorization.split(" ")[1];
        const id = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const userOne = await User.findById(id.id)
        const query = PlayList.create({ name: body });
        const newPlaylist = await query;
        console.log(newPlaylist.id, userOne)
        const user = await User.findByIdAndUpdate(id.id, { playLists: [...userOne.playLists, { playListName: body, playLists_id: newPlaylist.id }] }, { new: true })
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
exports.deletePlayList = async (req, res) => {
    const body = req.body.playlistName
    try {
        const token = req.headers.authorization.split(" ")[1];
        const id = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const userOne = await User.findById(id.id)
        const playlist = userOne.playLists.find((el, i) => el.playListName === body)
        console.log(playlist)
        const user = await User.findByIdAndUpdate(id.id, { playLists: userOne.playLists.filter((el, i) => el.playListName != body) }, { new: true })
        const query = await PlayList.findOneAndDelete({ _id: playlist.playLists_id });
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
exports.addSong = async (req, res) => {
    const { playListName, songId } = req.body
    try {
        const token = req.headers.authorization.split(" ")[1];
        const id = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const userOne = await User.findById(id.id)
        const playlist = userOne.playLists.find((el, i) => el.playListName === playListName)
        const query = await PlayList.findById({ _id: playlist.playLists_id });
        const newPlaylist = await PlayList.findByIdAndUpdate(playlist.playLists_id, { songs: [...query.songs, songId] });
        res.status(200).json({
            status: `success`,
            data: [...query.songs, songId]
        })

    }
    catch (e) {
        res.status(300).json({
            status: `failed`
        })
        console.log(e)
    }
}
exports.deleteSong = async (req, res) => {
    const { playListName, songId } = req.body
    try {
        const token = req.headers.authorization.split(" ")[1];
        const id = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const userOne = await User.findById(id.id)
        const playlist = userOne.playLists.find((el, i) => el.playListName === playListName)
        const query = await PlayList.findById({ _id: playlist.playLists_id });
        const newPlaylist = await PlayList.findByIdAndUpdate(playlist.playLists_id, { songs: [...query.songs.filter((el, i) => el != songId)] });
        res.status(200).json({
            status: `success`,
            data: [...query.songs.filter((el, i) => el != songId)]
        })
    }
    catch (e) {
        res.status(300).json({
            status: `failed`
        })
        console.log(e)
    }
}