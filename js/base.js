var users=[
  {
    name:'Chaitanya Prabuddha',
    avatar: 'https://res.cloudinary.com/practicaldev/image/fetch/s--qidcIAQM--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/636435/916a0bcd-9b12-4b1e-ae5b-3f4048aaac83.png',
  },
  {
    name:'TinoMuchenje',
    avatar: 'https://res.cloudinary.com/practicaldev/image/fetch/s--rF2Eb1SU--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/393666/c84a3ef8-7b29-4b57-a1dc-1dfe4f1d836c.jpg',
  },
  {
    name:'IsteakShupto',
    avatar: 'https://res.cloudinary.com/practicaldev/image/fetch/s--xUo3fnh3--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/635057/0cf95414-ab5f-4e87-8c2a-be752c9da1f4.jpg',
  },
  {
    name:'Bobby Iliev',
    avatar: 'https://res.cloudinary.com/practicaldev/image/fetch/s--XJFBodfL--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/191651/a7ce5d4e-1298-48e7-b99e-a9755d786776.jpeg',
  }
]

$(document).ready(() => {
  console.log('jquery cargado')
  //Aqui agregaremos todas las llamadas a funciones y metodos que ocupemos en cada seccion y pagina
  
  //Codigo que corresponda al INDEX
  if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    console.log('Estoy en el index')


    // Su codigo aqui


  }

  //Codigo que corresponda al POST
  if (window.location.pathname === '/post.html') {
    console.log('Estoy en el POST')


    // Su codigo aqui


  }

  //Codigo que corresponda a CREAR POST
  if (window.location.pathname === '/createpost.html') {
    let user, avatar;
    var quill = new Quill('#editor', {
      theme: 'snow'
    });
    $('#tags').tagsInput();

    $( ".form-select" ).change(function () {
      $( "select option:selected" ).each(function() {
        user = $( this ).text();
        avatar = users.filter((item)=>item.name===user)[0].avatar
      });
    })

    $('.create-post').click(() => {
      //Obtenemos la fecha en formato MM/DD/AAA
      let fullDate = new Date()
      let twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
      let currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
      if ($('#title').val() === '' || $('#image').val()=== '' || $('#editor').html() === '') {
        return
      }
      let postObject = {
        userName: user,
        userAvatar: avatar,
        titulo: $('#title').val(),
        tags: $('#tags').val(),
        imagen: $('#image').val(),
        minutosLectura: 6,
        fechaCreacion: currentDate,
        contenido: $('#editor').html()
        
      }
      console.log(postObject)
      uploadPost(postObject)
    })


  }

})