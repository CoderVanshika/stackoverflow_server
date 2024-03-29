import Questions from '../models/Questions.mjs'
import mongoose from 'mongoose'
import Payments from '../models/Payment.mjs';

export const AskQuestion = async (req, res) => {
    const postQuestionData = req.body;
    const {questionTitle, questionBody, questionTags, userPosted, userId, noOfQuestions} = req.body
    //console.log("User id:",userId)
    const paidUserList = await Payments.findOne({userId});
    {
        //console.log("Paid user list:",paidUserList)
        paidUserList.noOfQuestions=noOfQuestions

        //console.log("Questions:", noOfQuestions, "Paid list:",paidUserList)
        await Payments.findByIdAndUpdate(paidUserList._id,paidUserList)
    }
    //const userId = req.userId;
    //const postQuestion = new Questions({ ...postQuestionData, userId});
    const postQuestion = new Questions({questionTitle, questionBody, questionTags, userPosted, userId });

    try {
        console.log("Server side controller:", postQuestion)
        await postQuestion.save();
        res.status(200).json("Posted a question successfully")
    } catch (error) {
        console.log(error)
        res.status(409).json("Couldn't post a new question")        
    }
}



export const getAllQuestions = async (req, res) => {
    try {
       const questionList = await Questions.find();
       res.status(200).json(questionList);

    } catch (error) {
        res.status(404).json({message: error.message});
    }

}


export const deleteQuestion = async (req, res) => {
    const { id:_id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).send('question unavailable...');
    }
    try {
        await Questions.findByIdAndRemove( _id );
        res.status(200).json({ message: "Successfully deleted"})  
    } catch (error) {
       res.status(404).json({ message : error.message })
    }
}

export const voteQuestion = async (req, res) => {
    const { id:_id } = req.params;
    const { value, userId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).send('question unavailable...');
    }
     try{
        const question = await Questions.findById(_id)
        const upIndex = question.upVote.findIndex((id) => id === String(userId))
        const downIndex = question.downVote.findIndex((id) => id === String(userId))

        if(value === 'upVote'){
            if(downIndex !== -1){
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }

            if(upIndex === -1){
                question.upVote.push(userId) 
            } else {
                question.upVote = question.upVote.filter((id) => id!== String(userId))
            }
        }

        else if(value === 'downVote'){
            if(upIndex !== -1){
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }

            if(downIndex === -1){
                question.downVote.push(userId) 
            } else {
                question.downVote = question.downVote.filter((id) => id!== String(userId))
            }
        }
         await Questions.findByIdAndUpdate( _id, question )
         res.status(200).json({ message: "Voted Successfully..."})
     } catch (error) {
        res.status(404).json({ message: "Id not found.."})

     }

}