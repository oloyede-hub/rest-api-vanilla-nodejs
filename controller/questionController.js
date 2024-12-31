const Questions = require("../model/questionModel");
const { getDataPost } = require("../utils");

// @desc Get all Question
// @desc GET /api/questions


const getQuestions = async (req, res) => {
    try {
        const questions = await  Questions.getAllQuestion();
        res.writeHead(200, {"Content-Type": "application/json"})
        res.end(JSON.stringify(questions));
    } catch (error) {
        console.log(error);
    }
}

// @desc Get a Question
// @desc GET /api/questions/:id
const getQuestion = async (req, res, id) => {
    try {
        const question = await Questions.findQuestionById(id);
        if(question) {
            res.writeHead(200, {"Content-Type": "application/json"});
            return res.end(JSON.stringify(question));
        }else {
        res.writeHead(404, {"Content-Type": "application/json"})
        res.end(JSON.stringify({message: "question not found"}));
        }
        
    } catch (error) {
        console.log(error)
    }
}

// @desc create a Question
// @desc POST /api/questions

const createQuestion = async (req, res) => {
    try {
        const body = await getDataPost(req);
        const {answers, question, correct} = JSON.parse(body);
        const newQuestion = { question ,answers, correct}
        const createdQuestion = await Questions.create(newQuestion);
        res.writeHead(201, {"Content-Type": "application/json"})
        return res.end(JSON.stringify(createdQuestion));
    } catch (error) {
        console.log(error)
    }
}

const updateQuestion = async (req, res, id) => {
    try {
        const initialQuestion = await Questions.findQuestionById(id);
        if(initialQuestion) {
            // Listen for DATA from the req url
            const body = await getDataPost(req);
            const {question, answers, correct } = JSON.parse(body);
            
            const updated = {
                question:  question || initialQuestion.question,
                answers:  answers || initialQuestion.answers,
                correct:  correct || initialQuestion.correct
            };
            const updateQuestion = await Questions.update(req, updated);
            res.writeHead(200, {"Content-Type": "application/json"})
            return res.end(JSON.stringify(updateQuestion));
        }else {
            res.writeHead(201, {"Content-Type": "application/json"});
            return res.end(JSON.stringify({ message: "Question has been updated successfully!"}));
        }

    } catch (error) {
        
    }
}


const deleteQuestion = async (req, res, id) => {
    try {
        const initialQuestion = await Questions.findQuestionById(id);
        if(initialQuestion) {
            await Questions.remove(id);
            res.writeHead(200, {"Content-Type": "application/json"})
            return res.end(JSON.stringify({message: "Question has beeen successfully deleted"}));
        }else {
            res.writeHead(201, {"Content-Type": "application/json"});
            return res.end(JSON.stringify({ message: "Question not Found!"}));
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getQuestions,
    getQuestion,
    createQuestion,
    updateQuestion,
    deleteQuestion
}