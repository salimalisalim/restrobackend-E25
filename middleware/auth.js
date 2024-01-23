const jwt = require("jsonwebtoken");

exports.authToken = (req,res,next) => {

    const {token} = req.cookies;

    jwt.verify(token,process.env.JWT_SECRET_KEY, (err,decode) =>{

        if(err){
            return res.status(401).json({
                success: false,
                message: "Invalid Token",
                isAuthenticated: false
            });
        }

        next();

    });

}