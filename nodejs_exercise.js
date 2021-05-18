// require fs, request, prompt
const fs = require("fs");
const request = require("request");
const prompt = require("prompt");

prompt.start();
prompt.get(['searchterm'], (err, result) => {


    args = result.searchterm;
    const options = {
        url: `https://icanhazdadjoke.com/search?term=${args[2]}`,
        headers: { 'Accept': 'application/json' }

    };
    if (args === "leaderboard") {
        leaderboard()

    } else {
        //To request from the api server
        request.get(options, (ERR, response, body) => {
            let bodyvalue = JSON.parse(body);

            if (bodyvalue.total_jokes > 0) {
                let random = Math.floor(Math.random() * bodyvalue.results.length);
                let joke = bodyvalue.results[random].joke;
                //To append a random joke into jokes.txt
                fs.appendFileSync("./jokes.txt", `${joke}\n`);

            } else {
                console.log("No jokes present");
            }
        })
    }
})

//To get leaderboard
function leaderboard() {
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
function Maxvalue(givenArray) {
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