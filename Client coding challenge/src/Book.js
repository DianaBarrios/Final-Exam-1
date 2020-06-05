import React from "react";

function Book(props) {
  return (
    <div>
      <div>
        <h1>{props.title}</h1>
        <ul>
            <li>{props.snippet}</li>
            <li>{props.authors[0]}</li>
        </ul>
        <img src={props.thumbnail} alt="bookimg"/>
      </div>
    </div>
  );
}

export default Book;
