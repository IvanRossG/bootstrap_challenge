var users = [
  {
    name: "Chaitanya Prabuddha",
    avatar:
      "https://res.cloudinary.com/practicaldev/image/fetch/s--qidcIAQM--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/636435/916a0bcd-9b12-4b1e-ae5b-3f4048aaac83.png",
  },
  {
    name: "TinoMuchenje",
    avatar:
      "https://res.cloudinary.com/practicaldev/image/fetch/s--rF2Eb1SU--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/393666/c84a3ef8-7b29-4b57-a1dc-1dfe4f1d836c.jpg",
  },
  {
    name: "IsteakShupto",
    avatar:
      "https://res.cloudinary.com/practicaldev/image/fetch/s--xUo3fnh3--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/635057/0cf95414-ab5f-4e87-8c2a-be752c9da1f4.jpg",
  },
  {
    name: "Bobby Iliev",
    avatar:
      "https://res.cloudinary.com/practicaldev/image/fetch/s--XJFBodfL--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/191651/a7ce5d4e-1298-48e7-b99e-a9755d786776.jpeg",
  },
];

$(document).ready(() => {
  //Aqui agregaremos todas las llamadas a funciones y metodos que ocupemos en cada seccion y pagina

  //Codigo que corresponda al INDEX
  if (
    window.location.pathname === "/index.html" ||
    window.location.pathname === "/"
  ) {
    getAllPosts();
  }

  //Codigo que corresponda al POST
  if (window.location.pathname === "/post.html") {
    let searchParameter = window.location.search;
    const idPost = searchParameter.slice(searchParameter.indexOf("=") + 1);
    $( '.btn-edit-post' ).attr( "href", `./editpost.html?idPost=${ idPost }` )
    getPost(idPost);
  }

  //Codigo que corresponda a CREAR POST
  if (window.location.pathname === "/createpost.html") {
    let user, avatar;
    var quill = new Quill("#editor", {
      theme: "snow",
    });
    $("#tags").tagsInput();

    $(".form-select").change(function () {
      $("select option:selected").each(function () {
        user = $(this).text();
        avatar = users.filter((item) => item.name === user)[0].avatar;
      });
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
      let minutesRead = readingTime("editor");
      let postObject = {
        userName: user,
        userAvatar: avatar,
        titulo: $("#title").val(),
        tags: $("#tags").val(),
        imagen: $("#image").val(),
        minutosLectura: minutesRead,
        fechaCreacion: currentDate,
        contenido: $("#editor .ql-editor").html(),
      };
      uploadPost(postObject);
    });
  }

  //Codigo que corresponda a EDIT POST
  if (window.location.pathname === "/editpost.html") {
    console.log("Estoy en Edit Post");
    const quill = new Quill("#editor", {
      theme: "snow",
    });

    const params = new URLSearchParams(window.location.search);
    const postId = params.get("idPost");

    $(".btn-delete-post").attr("data-id", postId);

    const printPost = async () => {
      try {
        const post = await $.get(
          `https://python-2g-challenge-default-rtdb.firebaseio.com/post/${postId}.json`
        );
        if (post !== null) {
          const {
            titulo,
            userId,
            tags,
            minutosLectura,
            imagen,
            fechaCreacion,
            contenido,
          } = post;
          const delta = quill.clipboard.convert(contenido);

          $("#title").val(titulo);
          $("#tags").val(tags);
          $("#image").val(imagen);
          quill.setContents(delta, "silent");
        }
      } catch (error) {
        console.log(error);
      }
    };

    printPost();

    const editPost = async (postObject) => {
      try {
        let req = await $.ajax({
          url: `https://python-2g-challenge-default-rtdb.firebaseio.com/post/${postId}.json`,
          method: "PUT",
          data: JSON.stringify(postObject),
          success : ( response ) => {
            console.log( 'Updated' );
            window.location.href = "/";
          }
        });
        console.log(req);
        req.name ? (window.location.pathname = "/") : "";
        
      } catch (error) {
        console.log(error);
      }
    };

    const deletePost = async (postId) => {
      try {
        $.ajax({
          url: `https://python-2g-challenge-default-rtdb.firebaseio.com/post/${postId}.json`,
          method: "DELETE",
          dataType: "json",
          success: (response) => {
            console.log( 'Deleted' );
            window.location.href = "/";
          },
        });
      } catch (error) {
        console.log(error);
      }
    };

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
      const postId = $(".btn-delete-post").attr("data-id");
      console.log(postId);
      deletePost(postId);
    });

    // Su codigo aqui
  }
});
