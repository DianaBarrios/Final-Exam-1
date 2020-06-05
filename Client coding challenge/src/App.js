import React from "react";
import "./App.css";
import Book from "./Book";
import BookForm from "./BookForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiUrl: "https://www.googleapis.com/books/v1/volumes",
      results: [],
      querySearch: "",
      queryMade: ""
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    let url = `${this.state.apiUrl}?q=${this.state.querySearch}&maxResults=10`;
    let settings = {
      method: "GET"
    };
    fetch(url, settings)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(responseJSON => {
        this.setState({
          results: responseJSON
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  render() {
    return (
      <div>
        <BookForm
          querySearch={this.state.querySearch}
          handleSearch={this.handleSearch}
        />
        {this.state.results.map((book, index) => {
          return (
            <Book
              key={index}
              title={book.volumeInfo.title}
              authors={book.volumeInfo.authors}
              snippet={book.description}
              thumbnail={book.imageLinks.thumbnail}
            />
          );
        })}
      </div>
    );
  }
}

export default App;
