const mongoose = require('mongoose')

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected succesfully.`);
        
    } catch (error){
        console.log(`Error in connecting to MongoDb atlas: ${error}`);
        process.exit(1);
    }
};

module.exports = connectDb