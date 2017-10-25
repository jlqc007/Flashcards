var inquirer = require ("inquirer");
var fs = require("fs");
var cardData = require("./basicCards.json");

function BasicCard(frontSide,backSide){
    this.front = frontSide;
    this.back = backSide;
}

function createNewCard(){
inquirer.prompt([{
    type: "input",
    name: "frontSide",
    message: "What is your question?"
},{
    type: "input",
    name: "backSide",
    message: "What is the answer to the question?"
}]).then(function(input){
        var card = new BasicCard(input.frontSide,input.backSide);
        cardData.push(card);
        var newCardData = JSON.stringify(cardData,null,"\t");
        fs.writeFile("./basicCards.json",newCardData,function(err){
            if(err)throw err;
            console.log("Done");
        })
    })
}

createNewCard();