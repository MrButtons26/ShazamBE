const User = require(`../model/userModel`);
const jwt = require(`jsonwebtoken`);
const { promisify } = require(`util`);


exports.login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json({
            status: `failed`,
            data: {
                error: `Email and password cannot be empty`,
            },
        });
    }

    //finding the user in the DB
    const user = await User.findOne({ email }).select(`+password`);
    console.log(user);
    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(401).json({
            status: `failed`,
            data: {
                error: `Incorrect email or password`,
            },
        });
    }
    //verifying the jwt 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "265d",
    });
    res.status(201).json({
        status: `success`,
        data: {
            _id: user._id,
            token,
        }
    });
}
exports.signUp = async (req, res) => {
    const { userName, email, password } = req.body;
    try {

        //creating new user
        const query = User.create({ userName, email, password });
        const newUser = await query;

        //signing user and sending jwt to the client
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "90d",
        });
        res.status(201).json({
            status: `success`,
            data: {
                _id: newUser._id,
                token,
            },
        });
    } catch (e) {
        res.status(400).json({
            status: `failed`,
            data: {
                error: e,
            },
        });
    }
}
exports.protect = async (req, res, next) => {
    try {
        //verifying the jwt
        const token = req.headers.authorization.split(" ")[1];
        const id = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            status: `Please log in `,
        });
    }
};
