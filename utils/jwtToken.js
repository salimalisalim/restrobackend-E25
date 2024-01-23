const jwt = require("jsonwebtoken");

exports.getToken = async (req, res) => {

    const userID = req.user._id;

    const options = {
        id: userID,
        time: Date.now(),
    }

    const token = await jwt.sign(options, process.env.JWT_SECRET_KEY, { expiresIn: '30min' });

    if (!token) {
        return res.status(500).json({
            success: false,
            message: "Failed to generate token",
            isAuthenticated: false
        });
    }

    res.status(200).cookie("token", token).json({
        success: true,
        message: "Logged in successfull",
        isAuthenticated: true,
        user:req.user,
        token 
    });


}