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
        movieDatabase[curMovie.title].locations.push(curMovie.locations)
        // push to movieDatabase[curMovie.title]'s location array
      }
      else {
        movieDatabase[curMovie.title] = new Movie(curMovie)
        // make Movie obj and add it as value to movieDatabase
      }
    }
    console.log(movieDatabase);
  })
  .catch(function(err){
    console.log(err);
  })
}
getMovieJson(url)



function Movie(jsonMovieObj){
  this.title = jsonMovieObj.title;
  this.locations = [jsonMovieObj.locations]
}
