// edit


let MaxDicesInColumn = 5
let MaxDices = 3









const MainRollButton = document.getElementById("RollButton1")
const ResetButton = document.getElementById("RollButton2")
const MainDiceDiv = document.getElementById("MainDiceDiv")
const PlayerDices = document.getElementById("PlayerUsedDices")
const ComputerDices = document.getElementById("ComputerUsedDices")
let CurrentDices = []
let DicesUsed = []
let PlayerDicesAmount = 0
let ComputerDicesAmount = 0
let PlayerScore = 0
let PCScore
let ComputerDicesUsed = []
let DicesA = MaxDices
let Dice = document.getElementById('Dice')
let YourTurn = true

MainRollButton.innerHTML = `Roll new (${DicesA})`

function UpdateDices() {
    MainDiceDiv.innerHTML = ""
    CurrentDices.forEach((value, index) => {
        if (value != "-") {
            const Dice = document.getElementById(`DiceN${index + 1}`)
        MainDiceDiv.innerHTML = MainDiceDiv.innerHTML + `<div class="DiceBox" id = "DiceN${index + 1}">
                                <h1>${value}</h1>
                            </div>`
        }
    })
}



function InsertDice(ColumnNum, DiceValue) {
    if (ColumnNum === 1) {
        PlayerDices.innerHTML = PlayerDices.innerHTML + `<div class="DiceBox2" id="PlrUsedDice${DiceValue}"><h1>${DiceValue}</h1></div>`
        DicesUsed.push(DiceValue)   
    }else{
         ComputerDices.innerHTML = ComputerDices.innerHTML + `<div class="DiceBox2" id="PcUsedDice${DiceValue}"><h1>${DiceValue}</h1></div>` 
         ComputerDicesUsed.push(DiceValue)        
    }


}

function SkipTurn() {
    if (YourTurn == true) {
        CurrentDices = []
        DicesA = MaxDices
        YourTurn = false
        document.getElementById("CurrentTurn").innerHTML = "Current Turn: Computer"
        MainRollButton.innerHTML = `Roll new (${MaxDices})`
        MainDiceDiv.innerHTML = ""       
        ComputerPlay() 
    }
}


function CheckEndGame() {
    CalculateScore()
    if (PlayerDicesAmount === MaxDicesInColumn) {
        console.log("E")
        if (ComputerDicesAmount === MaxDicesInColumn) {
            console.log("E2")
            document.getElementById("CurrentTurn").innerHTML = `Game Over, Player score: ${PlayerScore}; Computer score: ${PCScore} `
            return true
            MaxDicesInColumn = 0
        }
    }
    return false
}


MainRollButton.addEventListener('click', () => {
    if (CurrentDices.length != DicesA) {
        if (YourTurn == true) {
            let currentval = Math.floor(Math.random() * 5.9999999) + 1
            console.log(currentval)
            CurrentDices.push(currentval)
            UpdateDices()
            CurrentDices.forEach((_, index) => {
                let e = index + 1
                if (_ != '-') {
                const Dice = document.getElementById(`DiceN${e}`)
                Dice.addEventListener("click", () => {
                    
                    if (PlayerDicesAmount < MaxDicesInColumn) {
                    
                    CurrentDices[index] = "-"
                    Dice.remove()

                    InsertDice(1, _)
                    Check(_, true)

                    // DicesA++
                    SkipTurn()
                    CheckEndGame()
                    PlayerDicesAmount++
                    }
                })
            }
            })
            MainRollButton.innerHTML = `Roll new (${DicesA - CurrentDices.length})`
        }
    }
})

ResetButton.addEventListener("click", () => {
    SkipTurn()
})




function ComputerPlay() {
    let DicesRn = []
    for (let i = 0; i < 1; i++) {
    //     let currentval = Math.floor(Math.random() * 5.9999999) + 1
    //     DicesRn.push(currentval)
    // }
        if (ComputerDicesAmount < MaxDicesInColumn) {
            let e = MaxDices - i
            ComputerDicesAmount++
            setTimeout(() => {
                let currentval = Math.floor(Math.random() * 5.9999999) + 1
                console.log(currentval)
                InsertDice(2, currentval)            
                // ComputerDicesUsed.push(currentval)
                Check(currentval, false)
            }, e * 500)            
        }
    }
    setTimeout(() => {
        const e = CheckEndGame()
        if (PlayerDicesAmount === MaxDicesInColumn) {
            if (e === false) {
                ComputerPlay()  
            }
        }else{
            if (e === false) {
                YourTurn = true
                document.getElementById("CurrentTurn").innerHTML = "Current Turn: Player"     
            }       
        }

    }, MaxDices * 500 + 500)
}

RunTimer()
let Min = 0
let sec = 0
const Timer = document.getElementById("Timer")
function RunTimer() {
    setTimeout(() => {
        sec++
        if (sec === 60) {
            Min++
            sec = 0
        }
        if (sec < 10) {
            if (Min < 10) {
                Timer.innerHTML = `0${Min}:0${sec}`
            }else{
                Timer.innerHTML = `${Min}:0${sec}`
            }
        }
        if (sec > 10) {
            if (Min < 10) {
                Timer.innerHTML = `0${Min}:${sec}`
            }else{
                Timer.innerHTML = `${Min}:${sec}`
            }
        }
        RunTimer()
    }, 1000)
}

function CalculateScore() {
    PCScore = 0
    PlayerScore = 0
    console.log(ComputerDicesUsed)
    ComputerDicesUsed.forEach((value) => {
        if (value != "-") {
            PCScore = PCScore + value
            console.log("PC value = " + value)
            console.log(PCScore)
        }
    })

    DicesUsed.forEach((value) => {
        if (value != "-") {
            PlayerScore = PlayerScore + value
            console.log("PLR value = " + value)
            console.log(PlayerScore)
        }
    })
}

function Check(DiceValue, Player) {
if (Player === true) {
    CalculateScore()
    ComputerDicesUsed.forEach((value, i) => {
        if (value === DiceValue) {
            if (document.getElementById(`PcUsedDice${DiceValue}`) != null) {
                ComputerDicesUsed[i] = "-"
                document.getElementById(`PcUsedDice${DiceValue}`).remove()  
                ComputerDicesAmount--            
            }

        }
    })
}else{
    console.log("Checking")
    CalculateScore()
    DicesUsed.forEach((value, i) => {
        if (value === DiceValue) {
            console.log("Detected")
            if (document.getElementById(`PlrUsedDice${DiceValue}`) != null) {
                DicesUsed[i] = "-"
                document.getElementById(`PlrUsedDice${DiceValue}`).remove()  

                PlayerDicesAmount--            
            }

        }
    })
}
}