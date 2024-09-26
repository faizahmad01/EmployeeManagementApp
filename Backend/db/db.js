import mongoose from "mongoose";

const connectToDatabase = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        
    }
}

export default connectToDatabase