import React from "react";
function onSearch(){
    
}

function BookForm(props) {
  return (
    <div>
      <form>
        <label>Search for a book: </label>
        <input type="text" value={props.querySearch} />
        <button onClick={onSearch}>Search</button>
      </form>
    </div>
  );
}

export default BookForm;
