// Iteration 1: All directors? - Get the array of all directors.
function getAllDirectors(movies) {
  const directors = movies.map(function (movie) {
    return movie.director
  })
  // return directors;
  // return directors.filter(function (director, index) {
  //   return directors.indexOf(director) === index
  // })
  // using a set and the spread operator
  return [...new Set(directors)];
}
// Bonus filter out the duplicates

// Iteration 2: Steven Spielberg. The best? - How many movies did STEVEN SPIELBERG direct
function howManyMovies(movies) {
  const filtered = movies.filter(function (movie) {
    if (movie.director === 'Steven Spielberg' &&
      movie.genre.includes('Drama')) {
      return true
    }
  })
  return filtered.length
}


// Iteration 3: All rates average - Get the average of all rates with 2 decimals
function scoresAverage(movies) {
  if (movies.length === 0) return 0;
  const avgRate = movies.reduce(function (sum, movie) {
    if (movie.score === '' || movie.score === undefined) {
      movie.score = 0;
    }
    return sum + movie.score
    // return sum + (movie.score || 0)
  }, 0) / movies.length;
  return Number(avgRate.toFixed(2));
}


// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(movies) {
  // filter out the drama movies
  const dramas = movies.filter(function (movie) {
    return movie.genre.indexOf('Drama') !== - 1
  })
  return scoresAverage(dramas);
}

// Iteration 5: Order by year
function orderByYear(movies) {
  const sorted = JSON.parse(JSON.stringify(movies)).sort(function (a, b) {
    if (a.year !== b.year) {
      return a.year - b.year;
    } else {
      return a.title.localeCompare(b.title);
    }
  });
  return sorted;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(movies) {
  const titles = movies.map(function (movie) {
    return movie.title
  })
  const sorted = titles.sort(function (a, b) {
    return a.localeCompare(b);
  })
  const res = sorted.slice(0, 20);
  return res;
}

// Bonus Iteration 7: Time Format - Turn duration of the movies from hours to minutes

function turnHoursToMinutes(movies) {
  return movies.map(function (movie) {
    let convertedDuration = 0;
    if (movie.duration.includes('h')) {
      convertedDuration += Number(movie.duration.slice(0, movie.duration.indexOf('h'))) * 60;
    }
    if (movie.duration.includes('min')) {
      convertedDuration += Number(movie.duration.slice(movie.duration.indexOf(' ') + 1, movie.duration.indexOf('m')));
    }
    return { ...movie, duration: convertedDuration };
  });
}

// BONUS Iteration 7: Best yearly rate average - Best yearly rate average

function bestYearAvg(movies) {
  if (!movies.length) return null;
  const best = movies.reduce(function (best, movie) {
    const average = scoresAverage(movies.filter(function (m) {
      return m.year === movie.year
    }));
    if (average > best.rate || (average === best.rate && movie.year < best.year)) {
      best.year = movie.year;
      best.rate = average;
    }
    return best;
  }, { year: null, rate: null });
  return `The best year was ${best.year} with an average score of ${best.rate}`;
}


// more explicit without reduce and using sort() to find the best 

// const bestYearAvg = ar => {
//   if (!ar.length) return null;
//   const averageRatingsPerYear = [...new Set(ar.map(function (movie) {
//     return movie.year
//   }))].map(function (year) {
//     return {
//       year: year,
//       rate: ratesAverage(ar.filter(function (movie) {
//         return movie.year === year
//       }))
//     }
//   });

//   const best = averageRatingsPerYear.sort(function (a, b) {
//     if (a.rate === b.rate) {
//       return a.year - b.year
//     }
//     return b.rate - a.rate;
//   })[0];
//   return `The best year was ${best.year} with an average rate of ${best.rate}`;
// }



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}