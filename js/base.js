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
    
    var quill = new Quill('#editor', {
      theme: 'snow'
    });
    $('.create-post').click(() => {
      //Obtenemos la fecha en formato MM/DD/AAA
      let fullDate = new Date()
      let twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
      let currentDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
      if ($('#title').val() === '' || $('#image').val()=== '' || $('#editor').html() === '') {
        return
      }
      let postObject = {
        userId: '',
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

  //Codigo que corresponda a CREAR POST
  if (window.location.pathname === '/bootstrap_challenge/editpost.html') {
    console.log('Estoy en Edit Post')


    // Su codigo aqui


  }

})