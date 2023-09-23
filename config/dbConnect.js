const mongoose = require('mongoose')

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log('Db connected')
    }catch (e) {
        console.log('Db connection failed', e.message)
    }
}

dbConnect();