function Movie(jsonMovieObj){
  this.title = jsonMovieObj.title;
  this.locations = [jsonMovieObj.locations];
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
    // console.log(movieDetailsPromises);
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
  let omdbApi = fetch (`http://omdbapi.com/?s=${title}`)
  console.log(omdbApi);
  promises.push(omdbApi)
  // console.log(omdbApi)
  return Promise.all(promises)
  .then(function(movieResponse){
    // console.log(movieResponse)
    return movieResponse.json()
  })
  .then(function(movieObj){
    // console.log(movieObj)
  })
}
