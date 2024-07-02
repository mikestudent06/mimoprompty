import mongoose from "mongoose";

let isConnected = false;
export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('DB connection already established.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "mimo_prompty",
            useNewUrlParser : true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log("***************************************MONGODB connection established***********************************************************")
    } catch (error) {
      console.log('error :>> ', error);  
    }
}