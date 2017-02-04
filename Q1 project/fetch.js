function Movie(jsonMovieObj){
  this.title = jsonMovieObj.title;
  this.locations = [jsonMovieObj.locations]
}

// let url = "https://data.sfgov.org/resource/wwmu-gmzc.json";
function getMovieJson(url){
  return fetch(url)
  .then(function(promiseResponse){
  return promiseResponse.json()
  })
  .then(function(jsonResult){
    let movieDatabase = {};
    // create array of keys from json result object
    for(let i = 0; i < jsonResult.length; i++) {
      // build up an array of promises pass it into promise.all then
      let curMovie = jsonResult[i];
      if(movieDatabase[curMovie.title]){
        // push to movieDatabase[curMovie.title]'s location array
        movieDatabase[curMovie.title].locations.push(curMovie.locations)
      } else {
        // make Movie obj and add it as value to movieDatabase
        movieDatabase[curMovie.title] = new Movie(curMovie)
      }
    }
    // will allow me to modify my movieDatabase to include poster and plot details
    let movieDetailsPromises = [];
    for (let title in movieDatabase) {
      let p = movieDetails(title);
      movieDetailsPromises.push(p);
    }
    console.log(movieDetailsPromises);
    return movieDetailsPromises;
  })
  .catch(function(err){
    console.log(err);
  })
}
getMovieJson(url)

// grab movie poster and plot
function movieDetails(title){
  let omdbApi = `http://omdbapi.com/?s=${title}`
  console.log(omdbApi);
  return fetch(omdbApi)
  .then(function(movieResponse){
    // console.log(movieResponse);
    return movieResponse.json()
  })
  .then(function(movieObj){
    // console.log(movieObj);
  })
}
