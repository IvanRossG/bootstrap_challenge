//Colocar todas las declaraciones de funciones en este archivo
const uploadPost =  async (objPost) => {
  await $.post("https://python-2g-challenge-default-rtdb.firebaseio.com/post/.json", JSON.stringify(objPost), () => {window.location.pathname='/'})
}

const getAllPosts = async () => {
  // USING JQUERY GET METHOD
  let posts = await $.get('https://python-2g-challenge-default-rtdb.firebaseio.com/post/.json')
  //printPosts(posts)
  let reversedKeys = Object.keys(posts).reverse()
  let reversedPosts={};
  reversedKeys.forEach(key => {
    reversedPosts[[key]]= posts[key]
  })
  printPosts(reversedPosts)
}

const printPosts = (objPosts) => {
  let acc='';
  for ( post in objPosts){
    let tags = objPosts[post].tags.split(",")
    let htmlTagLists = '';
    let imageContainer='';
    tags.forEach(tag => {
      htmlTagLists += `
        <li class="nav-item">
          <a class="nav-link px-2 py-1" href="#">#${tag}</a>
        </li>
      `
    })
    if (post === Object.keys(objPosts)[0]) {
      imageContainer= `
        <div class="img-container">
          <a class="img-link" href="./post.html?idpost=${post}">
            <img class="main-post"
              src="${objPosts[post].imagen}"
              alt="main-post">
          </a>
        </div>
      `
    }
    acc += `
      <article class="post most-relevant bg-white">
        ${imageContainer}
        <div class="author d-flex justify-content-start p-3 align-items-center">
          <a class="avatar-link" href=""><img
              src="${objPosts[post].userAvatar}"
              alt="avatar-name" class="avatar"></a>
          <div>
            <a class="author-link" href="">${objPosts[post].userName}</a>
            <a class="date-link">Apr 29(1 day ago)</a>
          </div>
        </div>
        <a class="post-link" href="./post.html?idpost=${post}">
          <h1 class="px-3">${objPosts[post].titulo}</h1>
        </a>
        <nav class="px-3">
          <ul class="nav">
            ${htmlTagLists}
          </ul>
        </nav>
        <div class="reviews d-flex justify-content-between align-items-center px-3">
          <div>
            <a class="review-link" href=""><img src="./assets/icons/heart.svg" alt="like"> 8
              <span class="d-none d-md-inline  mx-2">reactions</span></a>
            <a class="review-link" href=""><img src="./assets/icons/comment.svg" alt="comment"> 3
              <span class="d-none d-md-inline mx-2">comments</span> </a>
          </div>
          <div>
            <a class="time-link" href="./post.html?idpost=${post}">${objPosts[post].minutosLectura} min read</a>
            <button class="save">Save</button>
          </div>
        </div>
      </article>
    `
  }
  $('main').append(acc)
}

const getPost = async (postId) => {
  let post = await $.get(`https://python-2g-challenge-default-rtdb.firebaseio.com/post/${postId}.json`)
  printKoder(post)
}
const printKoder = (objPost) => {
  let acc = '';
  let tagsList = document.querySelector('.tags-list')
  $('img.header-img').attr('src',objPost.imagen);
  $('.post-header .post-title').text(objPost.titulo);
  objPost.tags.split(",").forEach( tag => {
    acc += `
      <li class="nav-item">
        <a class="${tag}-hashtag nav-link mx-1 px-1 py-1" href="#">#${tag}</a>
      </li>
    `
  })
  $('.tags-list').html(acc)
  $('.author a img').attr('src',objPost.userAvatar)
  $('.author .author-data .author-link strong').text(objPost.userName)
  $('.author .author-data .date-link').text(objPost.fechaCreacion)
  $('.author .author-data .time-link').text(`${objPost.minutosLectura} min read`)
  $('.post-content').html(objPost.contenido)
  $('section.side-profile .avatar-mainavatar img').attr('src',objPost.userAvatar)
  $('section.side-profile .profile-name').text(objPost.userName)
  $('section.profile-card-two .card-header h7 .profile-link').text(objPost.userName)
}

const readingTime = (containerId) => {
  const text = document.getElementById(containerId).innerHTML;
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time
}