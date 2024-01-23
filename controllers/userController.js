const bcrypt = require("bcrypt");
const saltRound = 10;
const User = require("../models/userModel");
const { getToken } = require("../utils/jwtToken");


//CRUD 

exports.userRegister = async (req,res)=>{

    const {fullname, email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password,saltRound);

    try {

        const user = await User.create({
            fullname,
            email,
            password:hashedPassword
        });

        if(!user){
            return res.status(500).json({
                success:false,
                message:"Registration failed!"
            });
        }

        console.log(user);

        res.status(201).json({
            success:true,
            message:"Registration completed successfully!",
            user
        });

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }

}

exports.userLogin = async (req,res) =>{

    const {email, password} = req.body;

    try {

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            });
        }

        // console.log("user",user);

        const isPasswordSame = await bcrypt.compare(password, user.password);

        
    if(!isPasswordSame){
        return res.status(401).json({
            success:false,
            message:"Invalid credentials"
        });
    }

    req.user = user;

        getToken(req,res);

        // res.status(200).json({
        //     success:true,
        //     message:"Logged in successfull",
        //     isAuthenticated:true,
        //     user,
        //     token:"f24323rderfsf"
        // });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
        
    }
 

}

exports.getAllUsers = async (req,res)=>{

    
    try {

        const users = await User.find();

        if(!users){
            return res.status(404).json({
                success:false,
                message:"Users not found!"
            });
        }

        res.status(200).json({
            success:true,
            message:"Users fetched successfully!",
            users,
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }

}

exports.getUser = async (req,res)=>{

    const {id} = req.params;

    try {

        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found!"
            });
        }

        res.status(200).json({
            success:true,
            user,
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

exports.updateUser = async (req,res)=>{

    const {id} = req.params;

    const {fullname, email} = req.body;

    try {
        
        const user = await User.findById(id);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found!"
            });
        }

        user.fullname = fullname;
        user.email = email;

        user.save();

        res.status(200).json({
            success:true,
            user,
            message:"User updated successfully"
        })


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}

exports.deleteUser = async (req,res)=>{

    const {id} = req.params;

    try {

        const user = await User.findByIdAndDelete(id);

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found!"
            });
        }

        res.status(200).json({
            success:true,
            message:"User deleted successfully!"
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}