let questions = require("../data/question.json");
const { v4:uuidv4} = require("uuid");
const { writeDataToFile } = require("../utils");


const getAllQuestion = () => {
    return new Promise((resolve, reject) => {
        resolve(questions);
    })
}

const findQuestionById = (id) => {
    return new Promise((resolve, reject) => {
        const question =  questions.find((question) => question.id === id);
        resolve(question);
    })
}

const create = (newQuestion) => {
    return new Promise((resolve, reject) => {
        const createdQuestion = {id: uuidv4(), ...newQuestion}
        questions.push(createdQuestion);
        writeDataToFile("./data/question.json", questions);
        resolve(createdQuestion);
    })
}


const update = async(id, question) => {
    return new Promise((resolve, reject) => {
        const index = questions.findIndex(q => question.id === id);
        questions[index] = question;
        writeDataToFile("./data/question.json", questions);
        resolve(questions[index]);
    })
}


const remove = async(id) => {
    return new Promise((resolve, reject) => {
        questions = questions.filter(que => que.id !== id);
        writeDataToFile("./data/question.json", questions);
        resolve();
    });
}


module.exports = {
    getAllQuestion,
    findQuestionById,
    create,
    update,
    remove
}