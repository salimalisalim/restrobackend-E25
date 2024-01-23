const dotenv = require("dotenv");
const app = require("./app");
const databaseConnection = require("./config/databaseConnection");

dotenv.config({path:"./config/config.env"});

databaseConnection();

const userRoutes = require("./routes/userRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");

app.use("/api/v1", userRoutes);
app.use("/api/v1", restaurantRoutes);



// const router = express.Router();


// HTTP Protocol  >>> GET POST PUT/PATCH DELETE 

//Middlewares >>> Functions - 









// app.get('/', (req,res)=>{
//     res.sendFile(__dirname + '/index.html')
//     // throw Error("Some error");

// });

// app.get('/about', (req,res)=>{
//     res.send("This is About page");
// });

// app.get('/profile', (req,res)=>{
//     res.send("This is Profile page");
// });


// Router level middleware
// router.get('/contact', (req,res)=>{
//     res.send("Contact");
// });

// app.use('/', router);




// Error handling middleware
app.use((err,req,res,next)=>{  
    res.send(err.message);
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
