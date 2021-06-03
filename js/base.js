$(document).ready(() => {
  console.log("jquery cargado");
  //Aqui agregaremos todas las llamadas a funciones y metodos que ocupemos en cada seccion y pagina

  //Codigo que corresponda al INDEX
  if (
    window.location.pathname === "/index.html" ||
    window.location.pathname === "/"
  ) {
    console.log("Estoy en el index");

    // Su codigo aqui
  }

  //Codigo que corresponda al POST
  if (window.location.pathname === "/post.html") {
    console.log("Estoy en el POST");

    // Su codigo aqui
  }

  //Codigo que corresponda a CREAR POST
  if (window.location.pathname === "/createpost.html") {
    const quill = new Quill("#editor", {
      theme: "snow",
    });

    $(".create-post").click(() => {
      //Obtenemos la fecha en formato MM/DD/AAA
      let fullDate = new Date();
      let twoDigitMonth =
        fullDate.getMonth().length + 1 === 1
          ? fullDate.getMonth() + 1
          : "0" + (fullDate.getMonth() + 1);
      let currentDate =
        fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
      if (
        $("#title").val() === "" ||
        $("#image").val() === "" ||
        $("#editor").html() === ""
      ) {
        return;
      }
      let postObject = {
        userId: "",
        titulo: $("#title").val(),
        tags: $("#tags").val(),
        imagen: $("#image").val(),
        minutosLectura: 6,
        fechaCreacion: currentDate,
        contenido: $("#editor").html(),
      };
      console.log(postObject);
      uploadPost(postObject);
    });
  }

  //Codigo que corresponda a EDIT POST
  if (window.location.pathname === "/bootstrap_challenge/editpost.html") {
    // console.log("Estoy en Edit Post");
    const quill = new Quill("#editor", {
      theme: "snow",
    });

    const params = new URLSearchParams(window.location.search)
    const postId = params.get('postId')

    $(".btn-delete-post").attr("data-id", postId);

    const printPost = async () => {
      try {
          const post = await $.get(`https://python-2g-challenge-default-rtdb.firebaseio.com/post/${ postId }.json`)
          if (post !== null) {
              const { titulo, userId, tags, minutosLectura, imagen, fechaCreacion, contenido } = post
              const delta = quill.clipboard.convert(contenido)

              $('#title').val(titulo)
              $('#tags').val(tags)
              $('#image').val(imagen)
              quill.setContents( delta, 'silent' )
          }
          
      } catch (error) {
          console.log(error)
      }
    }

    printPost()

    const editPost = async (postObject) => {
      try {
          let req = await $.ajax({
                  url: `https://python-2g-challenge-default-rtdb.firebaseio.com/post/${ postId }.json`,
                  method:'PUT',
                  data: JSON.stringify(postObject),
              })
              
          console.log(req)
          req.name ? window.location.pathname = '/' : ''
      } catch (error) {
          console.log(error)
      }
    }

    const deletePost = async (postId) => {
      try {
          $.ajax({
              url : `https://python-2g-challenge-default-rtdb.firebaseio.com/post/${ postId }.json`,
              method: 'DELETE',
              dataType : 'json',
              success : response => {
                  console.log( 'Post deleted' ); 
              }
          })
      } catch (error) {
          console.log(error)
      }
  }

    $(".edit-post").click(() => {
      //Obtenemos la fecha en formato MM/DD/AAA
      if (
        $("#title").val() === "" ||
        $("#image").val() === "" ||
        $("#editor").html() === ""
      ) {
        return;
      }
      let postObject = {
        userId: "",
        titulo: $("#title").val(),
        tags: $("#tags").val(),
        imagen: $("#image").val(),
        minutosLectura: 6,
        contenido: $("#editor").html(),
      };
      editPost(postObject);
    });

    $(".btn-delete-post").click(() => {
      const postId = $('.btn-delete-post').attr('data-id')
      console.log( postId );
      deletePost(postId);
    });

    // Su codigo aqui
  }
});
