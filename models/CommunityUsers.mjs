import mongoose from 'mongoose'

const CommunitySchema = new mongoose.Schema({
    postDescription : { type : String},
    image : { type : String},
    userId : {type: String},
    askedOn : { type : Date, default: Date.now},
})

const Communitys = new mongoose.model("Communitys", CommunitySchema)
export default Communitys

 
