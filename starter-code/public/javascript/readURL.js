function readURL(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      document.getElementById("profile-pic").setAttribute("src", e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}