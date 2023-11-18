document.addEventListener("DOMContentLoaded", function () {
    const genresDropdown = document.getElementById("genres");
    const resultsContainer = document.getElementById("results");
  
    const fetchAndDisplayStories = (genre) => {
      fetch(`/stories/filter/${genre}`)
        .then((response) => response.json())
        .then((data) => {
          resultsContainer.innerHTML = "";
  
          data.stories.forEach((story) => {
            const storyContent = `
                <div class="story-content">
                  <div class="story-image"></div>
                  <div class="story-details">
                    <h2><a href="/stories/${story.id}">${story.title}</a></h2>
                    <p>Author: ${story.author}</p>
                    <p class="genres">Genres: ${story.genre}</p>
                    <p>${story.content}</p>
                  </div>
                </div>
              `;
            resultsContainer.innerHTML += storyContent;
          });
        })
        .catch((error) => console.error("Error fetching stories:", error));
    };
    
    //fetch data on page reload for "ALl"
    fetchAndDisplayStories(genresDropdown.value);
  
    genresDropdown.addEventListener("change", function (e) {
      e.preventDefault();
      const selectedGenre = genresDropdown.value;
  
      fetchAndDisplayStories(selectedGenre);
    });
  });