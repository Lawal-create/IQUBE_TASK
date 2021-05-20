// require fs, request
const fs = require("fs");
const request = require("request");

//To write the joke to the file
let writeToFile=(joke)=>{
    fs.appendFileSync("./jokes.txt", `${joke}\n`);
}

//Sends a request to the api
exports.requestApi=(options)=> {
    request.get(options, (ERR, response, body) => {
        let bodyvalue = JSON.parse(body);

        if (bodyvalue.total_jokes > 0) {
            let random = Math.floor(Math.random() * bodyvalue.results.length);
            let joke = bodyvalue.results[random].joke;
            //To append a random joke into jokes.txt
            console.log(joke);
            writeToFile(joke);


        } else {
            console.log("No jokes present");
        }
    });
}

//To get leaderboard
exports.leaderboard=()=> {
    fs.readFile("./jokes.txt", "utf8", (err, data) => {
        let value = data.split("\n");
        value = value.filter((empty) => {
            return (empty != "");
        })
        let maxValues = Maxvalue(value)
        console.log(maxValues);

    })
}

//To find the maximum value
Maxvalue=(givenArray)=> {
    let itemsMap = {};
    let maxValue = 0;
    let maxCount = 0;
    for (let item of givenArray) {
        // 4  
        if (itemsMap[item] == null) {
            itemsMap[item] = 1;
        } else {
            itemsMap[item]++;
        }

        //5
        if (itemsMap[item] > maxCount) {
            maxValue = item;
            maxCount = itemsMap[item];
        }
    }
    return maxValue;
}