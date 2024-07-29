import React from "react";
import './App.css';
import Die from './Die';
import {nanoid} from 'nanoid'
import Confetti from "react-confetti"

export default function App(){

  const [dice, setDice]=React.useState(allNewDice())
  const [tenzies,setTenzies]= React.useState(false)

  React.useEffect(() =>{
    const allHeld =dice.every(die => die.isHeld) 
    //conditional rendering whether all dice are held
    const firstValue=dice[0].value
    const allSameValue =dice.every(die=> die.value === firstValue)

    if(allHeld && allSameValue){
      setTenzies(true)
      console.log("You won !")
    }
  },[dice])


  
  function generateNewDie(){
    return {
      value:Math.ceil(Math.random()*6),
      isHeld:false,
      id:nanoid()
    }
  }


  function allNewDice(){
    const newDice=[]
    for(let i=0;i<10;i++){
      // Creation of random number
      newDice.push(generateNewDie())
    }
    return newDice
  }
  
  

  function rolldice(){
    if(!tenzies){
    setDice(oldDice => oldDice.map(die=>{
      return die.isHeld ? die : generateNewDie()

    })) }
    // this block is to reset after completion of game
    else{
      setTenzies(false)
      setDice(allNewDice())

    } // THis function is to reload the die elemnets while onclick
  }

  function holdDice(id){
    setDice(oldDice=> oldDice.map(die => {
      return die.id=== id ?{...die,isHeld:!die.isHeld} : die
    }))
    }

  // Using map function to create 10 die bloc without hardcoding
  const diceElements= dice.map((die) => 
  <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
);

  return(
    <div>
      <div className="dice-title">
        <h1 className="title"><span>T</span>enzies <span>D</span>ice <span>G</span>ame</h1>
        <p className="instructions">Roll until all dice are same. Click each die to freeze it at its current value between rolls</p>
      </div>
      <main className="dice-container">
        {tenzies && <Confetti />}
      
        {diceElements}
        
        
      </main>
      <button 
        className="roll-dice" onClick={rolldice}>
          { tenzies ? "New Game" : "Roll"}
        </button>
    </div>
  )
}

