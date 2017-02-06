function Movie(jsonMovieObj){
  this.title = jsonMovieObj.title;
  this.locations = [jsonMovieObj.locations];
  this.year = jsonMovieObj.release_year;
}

let url = "https://data.sfgov.org/resource/wwmu-gmzc.json";
function getMovieJson(url){
  return fetch(url)
  .then(function(promiseResponse){
  return promiseResponse.json()
  })
  .then(function(jsonResult){
    let movieDatabase = {};
    for(let i = 0; i < jsonResult.length; i++) {
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
      movieDetailsPromises.push(p)
    }
    // console.log(movieDatabase);
    return movieDatabase
  })
  .catch(function(err){
    console.log(err)
  })
}
getMovieJson(url)

// grab movie poster and plot
function movieDetails(title){
  let promises = [];
  let tmdbApi = fetch (`https://api.themoviedb.org/3/search/movie?api_key=34b3926a105a04d03e0bc0b058163991&query=${title}&page=1&include_adult=false`);
  // &year=${title.year}`
  // console.log(tmdbApi);
  promises.push(tmdbApi)
  // console.log(tmdbApi)
  return Promise.all(promises)
  .then(function(movieResponse){
    // console.log(movieResponse)
    return movieResponse.json()
  })
  .then(function(movieObj){
    // console.log(movieObj)
  })
}
