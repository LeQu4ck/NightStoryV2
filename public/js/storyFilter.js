document.addEventListener("DOMContentLoaded", function () {
  const genresDropdown = document.getElementById("genres");
  const resultsContainer = document.getElementById("results");

  const fetchAndDisplayStories = async (genre) => {
    await fetch(`/stories/filter/${genre}`)
      .then((response) => response.json())
      .then((data) => {
        resultsContainer.innerHTML = "";
        console.log(data.stories)
        if (data.stories.length !== 0) {
          data.stories.forEach((story) => {
            const coverImg = story.coverImage? story.coverImage: "/images/defaultStoryImg.png"
            const storyContent = `
              <div class="story-content">
              <div class="story-image"> 
                <img id="coverImg" name="cover_image" src="${ coverImg }" alt="cover-img" />
              </div>
                <div class="story-details">

                  <div class="story-tile">
                    <a href="stories/${story._id}">Title: ${story.title}</a>
                  </div>

                  <div class="story-author">
                    Author: ${story.author}
                  </div>

                  <div class="number-of-views">
                    <i class="fas fa-eye"></i> ${story.nbOfviews}
                  </div>

                  <div class="story-genre">
                    Genre: ${story.genre.genreName}
                  </div>
                  
                  <div class="story-preview">
                    Preview: ${story.preview}
                  </div>

                </div>
              </div>
            `;
            resultsContainer.innerHTML += storyContent;
          });
        } else {
          const emptyDiv = document.createElement("div");
          emptyDiv.classList.add("empty");
          emptyDiv.textContent = `No matching for the current selection!`;
          resultsContainer.appendChild(emptyDiv);
        }
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
