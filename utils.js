const { rejects } = require("assert");
const { error } = require("console");
const fs = require("fs");
const { url } = require("inspector");
const { resolve } = require("path");



const writeDataToFile = (filename, data) => {
    fs.writeFileSync(filename, JSON.stringify(data), "utf8", (error) => {
        console.log(error);
    });
}

const getDataPost =(req) => {
    let body = ""
   return new Promise((resolve, rejects) => {
    req.on("data", (chunk) => {
        body += chunk
    });

    req.on("end", () => {
        resolve(body);
    })
   })

}


module.exports = {
    writeDataToFile,
    getDataPost
}