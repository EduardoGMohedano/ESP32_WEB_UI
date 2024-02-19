let socket = null;

function createSocketConnection(){
        if( socket ){
            return;
        }
        
        socket = new WebSocket('ws://192.168.3.44/ws');     
        
        socket.onopen = () => {
            send_request(socket);
        };
        
        socket.onmessage = function(event){
            const messageBox = document.getElementById("messageBox");
            const paragraph = document.createElement('p');
            paragraph.textContent = event.data;
            messageBox.appendChild(paragraph); 
        };
        
        // Event handler for when the connection is closed
        socket.onclose = () => {
        };
}

function send_request(socket){
    socket.send('Get logs');
}

document.getElementById('loadLogsButton').addEventListener('click', createSocketConnection);

document.getElementById('clearLogsButton').addEventListener('click', function() {
    if( socket && (socket.readyState !== WebSocket.CLOSED) || ( socket.readyState !== WebSocket.CLOSING) ){
        socket.send('Stop logs');
        socket.close();
        socket = null;
    }
    document.getElementById('messageBox').innerHTML = '';
});

document.getElementById('downloadLogsButton').addEventListener('click', function() {
    // Replace 'ws://example.com/websocket' with your WebSocket server URL
    const fileUrl = 'http://192.168.3.44/logs.txt';

   // Create a new <a> element
   const downloadLink = document.createElement('a');

   // Set the href attribute to the file URL
   downloadLink.href = fileUrl;

   // Optionally, set the download attribute to the desired file name
   downloadLink.download = 'Logs.txt';

   // Append the <a> element to the body (it doesn't have to be visible)
   document.body.appendChild(downloadLink);

   // Programmatically trigger a click on the <a> element
   downloadLink.click();

   // Remove the <a> element after triggering the download
   document.body.removeChild(downloadLink); 
});

window.onbeforeunload = function() {
    // Close the WebSocket connection
    socket.send('Stop logs');
    socket.close();
};