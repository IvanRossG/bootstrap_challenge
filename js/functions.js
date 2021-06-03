//Colocar todas las declaraciones de funciones en este archivo
const uploadPost =  async (objPost) => {
  await $.post("https://python-2g-challenge-default-rtdb.firebaseio.com/post/.json", JSON.stringify(objPost), () => {window.location.pathname='/'})
}