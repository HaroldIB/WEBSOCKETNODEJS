function enviarTexto(event){
    event.preventDefault();
    event.stopPropagation();
    var campo = event.target.texto;
    doSend(campo.value);
    campo.value = "";
}

function init (){
    wsConnect();
}

function wsConnect(){
    Websocket = new WebSocket("ws://localhost:3000");
    //Asignación de los callbacks
    Websocket.onopen = function(evt){
        onOpen(evt);
    }
    Websocket.onClose = function(evt){
        onClose(evt);
    }
    Websocket.onmessage = function(evt){
        onMessage(evt);
    }
    Websocket.onerror = function(evt){
        onError(evt);
    }
}

function onOpen(evt){
    document.getElementById("enviar").disabled = false;
    doSend("Saludos del cliente WEBSOCKET");
}

function onClose(evt){
    document.getElementById("enviar").disabled = true;
    document.getElementById("mensajes").innerHTML="";

    setTimeout(function(){
        wsConnect();
    },2000);
}

function onMessage(evt){
    var area = document.getElementById("mensajes");
    area.innerHTML += evt.data +"\n";
}

function onError(evt){
    console.log("Error"+evt);
}

function doSend(mensaje){
    Websocket.send(mensaje);
}

window.addEventListener("load",init,false);