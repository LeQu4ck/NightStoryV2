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
