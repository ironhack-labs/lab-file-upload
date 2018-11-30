const fileSelect = (e) => {
  $('.fileName').text(e.target.files[0].name);
}
