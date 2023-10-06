import React from "react"

const image = {
    
};
const description = {
    font: "12px",
    fontFamily: "Arial",
    color: "blue"
};
const price = {
    font: "15px",
    fontFamily: "Arial",
    color: "black"
};


function Medicine(props) {
    return(
        <div>
            <div style={image}>
                <img src={props.image} alt="" />
            </div>
            <div style={description}>
                <h1>{props.name}</h1>
                <p>{props.description}</p>
            </div>
            <div style={price}>
                <p>{props.price}</p>
            </div>
        </div>
    );
  }

export default Medicine;