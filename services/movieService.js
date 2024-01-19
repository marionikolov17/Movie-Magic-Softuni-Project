const fs = require("fs/promises");
const path = require("path");

const getMovies = async () => {
    const data = await fs.readFile(path.resolve("database/data.json"), "utf-8");

    return JSON.parse(data);
}

const getMovie = async (id) => {
    const movies = await getMovies();

    const movie = movies.find(el => el.id === id);
    return movie;
}

const createMovie = async (data) => {
    console.log(data);
    const movies = await getMovies();
    data.id = movies[movies.length-1].id + 1;
    movies.push(data);
    console.log(movies);
    await fs.writeFile(path.resolve("database/data.json"), JSON.stringify(movies));
}

const searchMovies = async (query) => {
    let movies = await getMovies();
    if (Object.keys(query).length === 0) {
        return movies;
    }

    if (query.title !== "") {
        movies = movies.filter(movie => movie.title.toLowerCase().includes(query.title.toLowerCase()));
    }

    if (query.genre !== "") {
        movies = movies.filter(movie => movie.genre.toLowerCase() === query.genre.toLowerCase());
    }

    if (query.year !== "") {
        movies = movies.filter(movie => movie.year == query.year);
    }

    return movies;
}

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    searchMovies
}






/**


[
    {
        "id": 1,
        "title": "Jungle Cuise",
        "genre": "Adventure",
        "director": "Rob Marshall",
        "year": 2020,
        "imageUrl": "./static/img/jungle-cruise.jpeg",
        "rating": 4,
        "description": "Dreaming about saving countless lives and having another adventure, the feisty English feminist and doctor of botany, Dr Lily Houghton, embarks on a peril-laden mission to change the world. Along with her fashionable brother, MacGregor, Dr Houghton enlists the help of the arrogant, wisecracking riverboat skipper, Captain Frank Wolff, to guide them through the serpentine Amazon River in La Quila, his swift wooden boat. Now, as the intrepid trio ventures deeper and deeper into the heart of an impenetrable green maze, searching for something that cannot be found, a centuries-old curse and the ruthless aristocrat, Prince Joachim, threaten to put an end to their ambitious plans."
    },
    {
        "id": 2,
        "title": "Home Alone",
        "genre": "Comedy",
        "director": "Rob Marshall",
        "year": 2003,
        "imageUrl": "./static/img/home-alone.jpeg",
        "rating": 5,
        "description": "It is Christmas time and the McCallister family is preparing for a vacation in Paris, France. But the youngest in the family, Kevin (Macaulay Culkin), got into a scuffle with his older brother Buzz (Devin Ratray) and was sent to his room, which is on the third floor of his house. Then, the next morning, while the rest of the family was in a rush to make it to the airport on time, they completely forgot about Kevin, who now has the house all to himself. Being home alone was fun for Kevin, having a pizza all to himself, jumping on his parents' bed, and making a mess. Then, Kevin discovers about two burglars, Harry (Joe Pesci) and Marv (Daniel Stern), about to rob his house on Christmas Eve. Kevin acts quickly by wiring his own house with makeshift booby traps to stop the burglars and to bring them to justice."
    }
]

 */