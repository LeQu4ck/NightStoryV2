function coverImgUpload() {
  const fileInput = document.getElementById("ImgInp");
  const coverImg = document.getElementById("coverImg");

  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      coverImg.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }
}

function openImgUpload() {
  const fileInput = document.getElementById("ImgInp");
  fileInput.click();
}

document.addEventListener("DOMContentLoaded", function () {
  const newGenreCheckbox = document.getElementById("newGenreCheckbox");
  const newGenreInput = document.getElementById("newGenre");
  const genreSelect = document.getElementById("genres");

  const genreSelectLabel = document.querySelector('[for="Genres"]');

  newGenreCheckbox.addEventListener("change", function () {
    newGenreInput.style.display = newGenreCheckbox.checked ? "block" : "none";

    genreSelect.style.display = newGenreCheckbox.checked ? "none" : "block";
    genreSelectLabel.style.display = newGenreCheckbox ? "none" : "block ";
  });
});
