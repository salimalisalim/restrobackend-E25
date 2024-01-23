const Restaurant = require("../models/restaurantModel");

exports.addRestaurant = async(req,res)=>{

    const {name,address, neighborhood, cuisine} = req.body;

    const photograph = req.file.path;


    try {
        

        const restaurant = await Restaurant.create({
            name,
            address,
            neighborhood,
            cuisine,
            photograph
        })

        if(!restaurant){
            return res.status(500).json({
                success:false,
                message:"Restaurant added failed!"
            });
        }

        res.status(201).json({
            success:true,
            message:"Retaurant added successfully!",
            restaurant
        });


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.getRestaurants = async(req,res)=>{

    try {

        const restaurants = await Restaurant.find();

        if(!restaurants){
            return res.status(404).json({
                success:false,
                message:"Restaurant not found!"
            });
        }

        res.status(200).json({
            success:true,
            restaurants
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }

}