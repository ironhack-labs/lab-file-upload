function getPostId(e) {
  const postId = e.target.getAttribute('data-post');
  document.querySelector('input[type="hidden"]').value = postId;
}

function toggleComments(e) {
  const myComments = e.target.nextElementSibling;
  if (myComments.style.height === '0px') {
    myComments.style.height = `${myComments.scrollHeight}px`;
    e.target.innerText = 'Hide Comments';
  } else {
    myComments.style.height = '0px';
    e.target.innerText = 'Show Comments';
  }
}

document.querySelectorAll('.add-comment').forEach((elem) => { elem.onclick = getPostId; });

document.querySelectorAll('.toggleComments').forEach((elem) => { elem.onclick = toggleComments; });
