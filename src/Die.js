import React from "react";

export default function Die(props){
    // This styling is used to change the die color is if it is held
    const styles={
        backgroundColor:props.isHeld ? "#59E391" : "white"
    }
    return(
        <div className="die-face" style={styles}  onClick={props.holdDice}>
            <h2 className="die-num">{props.value}</h2>
        </div>
    )
}