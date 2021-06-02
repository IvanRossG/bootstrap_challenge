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
    console.log('Estoy en Crear Post')


    // Su codigo aqui


  }

  //Codigo que corresponda a CREAR POST
  if (window.location.pathname === '/bootstrap_challenge/editpost.html') {
    console.log('Estoy en Edit Post')


    // Su codigo aqui


  }

})