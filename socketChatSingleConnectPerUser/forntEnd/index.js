

let connectButton;
let disconnectButton;
let statusInput;
let tokenInput;
let error = null;
let socket;

const connect = () => {
    
    socket = io('http://localhost:8080', {
        autoConnect: false,
    });

    socket.on('connect', () => {
        statusInput.value = 'connected';
        connectButton.disabled = true;
        disconnectButton.disabled = false;
        console.log('connected');

        socket.emit('authentication', {
            token: tokenInput.value,
        });
    });
    
    socket.on('unauthorized', (reason) => {
        console.log('unauthorized: ', reason);
        error = reason;  
        socket.disconnect();
    });

    socket.on('disconnect', (reason) => {
        statusInput.value = `disconnected: ${error || reason}`;
        connectButton.disabled = false;
        disconnectButton.disabled = false;
        console.log('disconnected: ', error || reason);
        
        error = null;
    });
    
    socket.open();
};

const disconnect = () => {
    socket.disconnect();
}

document.addEventListener('DOMContentLoaded', () =>{
    connectButton = document.getElementById('connect');
    disconnectButton = document.getElementById('disconnect');
    statusInput = document.getElementById('status');
    tokenInput = document.getElementById('token');
});
