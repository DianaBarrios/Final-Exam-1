const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require("./config");
const errorHandler = require("./middleware/errorHandler");
const { Actors } = require("./models/actor-model");
const { Movies } = require("./models/movie-model");

const app = express();

app.patch(
  "/api/delete-movie-actor/:movie_ID",
  jsonParser,
  errorHandler,
  (req, res) => {
    let id = req.body.movie_ID;
    let movieID = req.params.movie_ID;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    if (!id) {
      errorHandler(1, req, res);
    }

    if (id != movieID) {
      errorHandler(2, req, res);
    }

    if (!firstName || !lastName) {
      errorHandler(3, req, res);
    }

    Actors.getActorByName(firstName, lastName)
      .then(actor => {
        Movies.getMovieByID(id)
          .then(movie => {
            if (!actor || !movie) {
              errorHandler(4, req, res);
            }

            let actorId = actor._id;
            let actorsInMovie = movie.actors;
            let updatedActors = [];

            for (i = 0; i < actorsInMovie.length; i++) {
              if (actorId != actorsInMovie[i]._id) {
                updatedActors.push(actorsInMovie[i]._id);
              }
            }

            Movies.removeActorFromMovieList(movie.id, updatedActors)
              .then(updatedMovie => {
                return res.status(201).json(updatedMovie);
              })
              .catch(err => {
                throw new Error(err);
              });
          })
          .catch(err => {
            throw new Error(err);
          });
      })
      .catch(err => {
        throw new Error(err);
      });
  }
);

app.listen(PORT, () => {
  console.log("This server is running on port 8080");
  new Promise((resolve, reject) => {
    const settings = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    };
    mongoose.connect(DATABASE_URL, settings, err => {
      if (err) {
        return reject(err);
      } else {
        console.log("Database connected successfully.");
        return resolve();
      }
    });
  }).catch(err => {
    console.log(err);
  });
});
