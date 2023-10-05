import React from "react"

const description = {
    font: "12px",
    fontFamily: "Arial",
    color: "blue"
};


function Medicine(props) {
    return(
        <div>
            <div style={image}>
                <img>{props.image}</img>
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