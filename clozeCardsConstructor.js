var inquirer = require("inquirer");
var fs = require("fs");
var cardData = require("./clozeCards.json");

function ClozeCard(fullText,answer){
    var clozePositions = clozeDelete(fullText, answer);
    
    this.partial = getPartial(fullText,clozePositions);
    this.answer = answer;

    function clozeDelete(fullText,ansewer){
        var start = fullText.indexOf(answer);
        if(start !== -1){
            return [start, start+answer.length];
    }
    throw Error("Could not find position");
}

function getPartial(fullText,clozePositions){
    var start = fullText.slice(0,clozePositions[0]);
    var end = fullText.slice(clozePositions[1],fullText.length);
    return start+"..."+end;
    }
}

ClozeCard.prototype.displayCard = function displayCar(){
    console.log(this.partial.replace("...",this.answer));
}

function createNewCard(){
    inquirer.prompt([{
        type: "input",
        name: "fullText",
        message: "What is full text of card you want to create?"
    },{
        type: "input",
        name: "answer",
        message: "What is the answer to the card?"
    }]).then(function(input){
            var card = new ClozeCard(input.fullText,input.answer);
            card.displayCard();
            cardData.push(card);
            var newCardData = JSON.stringify(cardData,null,"\t");
            fs.writeFile("./clozeCards.json",newCardData,function(err){
                if(err)throw err;
                console.log("Done");
            })
        })
    }

    createNewCard();