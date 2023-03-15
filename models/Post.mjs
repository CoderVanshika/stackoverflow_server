import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {type: String, required: true},
    userPosted : { type : String},
    postdescription: {type: String},
    postedOn : { type : Date, default: Date.now},
    likes: {type: Number, default: 0},
    likedBy: {type: [String]},
    noOfComments : { type : Number, default:0},
    comments: [{
        commentBody: {type: String},
        userCommented: {type: String},
        commentedto: {type: String},
        commentedOn: {type: Date, default: Date.now},
        userId: {type: String},
    }],
    imageUrl: {type: String},
    videoUrl: {type: String,},
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);


//likes: {type: [String],default: [],},