const MainRollButton = document.getElementById("RollButton1")
const ResetButton = document.getElementById("RollButton2")
const MainDiceDiv = document.getElementById("MainDiceDiv")
const PlayerDices = document.getElementById("PlayerUsedDices")
const ComputerDices = document.getElementById("ComputerUsedDices")

let CurrentDices = []
let DicesUsed = []
let DicesA = 3
let Dice = document.getElementById('Dice')
let YourTurn = true


function UpdateDices() {
    MainDiceDiv.innerHTML = ""
    CurrentDices.forEach((value, index) => {
        if (value != "-") {
        MainDiceDiv.innerHTML = MainDiceDiv.innerHTML + `<div class="DiceBox" id = "DiceN${index + 1}">
                                <h1>${value}</h1>
                            </div>`            
        }
    })
}


MainRollButton.addEventListener('click', () => {
    if (CurrentDices.length != DicesA) {
        if (YourTurn == true) {
            let currentval = Math.round(Math.random() * 5.49) + 1
            console.log(currentval)
            CurrentDices.push(currentval)
            UpdateDices()
            CurrentDices.forEach((_, index) => {
                if (_ != '-') {
                let e = index + 1
                const Dice = document.getElementById(`DiceN${e}`)
                Dice.addEventListener("click", () => {
                    console.log("e")
                    CurrentDices[index] = "-"
                    Dice.remove()
                    PlayerDices.innerHTML = PlayerDices.innerHTML + `<div class="DiceBox2">
                    <h1>${_}</h1>
                </div>`          
                    DicesA++
                    MainRollButton.innerHTML = `Roll new (${DicesA - CurrentDices.length})`
                })
            }
            })
            MainRollButton.innerHTML = `Roll new (${DicesA - CurrentDices.length})`
        }
    }
})

ResetButton.addEventListener("click", () => {
    if (YourTurn == true) {
        CurrentDices = []
        DicesA = 3
        YourTurn = false
        document.getElementById("CurrentTurn").innerHTML = "Current Turn: Computer"
        MainRollButton.innerHTML = `Roll new (3)`
        MainDiceDiv.innerHTML = ""        
    }

})