const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema({
  movie_ID: {
    type: Number,
    unique: true,
    required: true
  },
  movie_title: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "actors",
      required: true
    }
  ]
});

const moviesCollection = mongoose.model("movies", moviesSchema);

const Movies = {
  createMovie: function(newMovie) {
    return moviesCollection
      .create(newMovie)
      .then(createdMovie => {
        return createdMovie;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  getMovieByID: function(movieID) {
    return moviesCollection
      .findOne({ movie_ID: movieID })
      .then(foundMovie => {
        return foundMovie;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  removeActorFromMovieList: function(movieID, updatedActors) {
    return moviesCollection
      .findOneAndUpdate({ movie_ID: movieID }, { actors: updatedActors })
      .populate({ path: "actors" })
      .then(updatedMovie => {
        return updatedMovie;
      })
      .catch(err => {
        throw new Error(err);
      });
  }
};

module.exports = {
  Movies
};
