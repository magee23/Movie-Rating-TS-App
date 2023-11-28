export const fetchMovieDetails = async (movieId: string) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      {
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTE0ZDJmMzFkNjM5YjA0MzY2OTJiMTRiMzMwZTQ4NSIsInN1YiI6IjY1NjQzMGY5OGYyNmJjMDEzOWY4MTM3ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JzYRF3zSwHuQ_6BLzEsz5M_MskJXeNxkTEyY_A8Yujk",
        },
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in mutateLogin:", error);
    throw error;
  }
};
