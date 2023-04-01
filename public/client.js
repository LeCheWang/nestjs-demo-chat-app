const name = document.getElementById("name")
const btnSubmit = document.getElementById('submit')
const ul = document.getElementById('ul')

var socket = io.connect();

socket.emit('findAllMessages', {}, (response=[])=>{
    let html = ``
    for (let i=0; i<response.length; i++){
        html+=`[${response[i].name}]: ${response[i].text}`
    }
    ul.innerHTML = html
})

btnSubmit.addEventListener("click", ()=>{
    socket.emit("join", {})
})

//listen thread event
socket.on('thread', function (data) {
  $('#thread').append(`<li>${data}</li>`);
});

$('form').submit(function () {
  var message = $('#message').val();
  socket.emit('messages', `${username}: ${message}`);
  this.reset();

  return false;
});
