// require prompt, index.js
const prompt = require("prompt");
const index=require("./index.js")

prompt.start();
prompt.get(['searchTerm'], (err, result) => {

    args = result.searchTerm;
    const options = {
        url: `https://icanhazdadjoke.com/search?term=${args}`,
        headers: { 'Accept': 'application/json' }

    };

    if (args === "leaderboard") {
        index.leaderboard()

    } else {
        //To request from the api server
        index.requestApi(options);
    }
})