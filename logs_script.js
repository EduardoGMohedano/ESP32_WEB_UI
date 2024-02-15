let fetchInterval;

function fetchLogs(){
    fetch('http://localhost:8080/')
    .then(response => {
        if(!response.ok){
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        const messageBox = document.getElementById("messageBox");
        const paragraph = document.createElement('p');
        paragraph.textContent = data;
        messageBox.appendChild(paragraph); 
    })
    .catch(error =>{
        console.error('There was a problem with the fetch operation:', error);
        document.getElementById('messageBox').innerHTML = 'Failed to load messages.';
    })
}

document.getElementById('loadLogsButton').addEventListener('click', function() {
    if( fetchInterval ){
        clearInterval(fetchInterval)
    }
    fetchLogs();
    fetchInterval = setInterval(fetchLogs, 1000);
});

document.getElementById('clearLogsButton').addEventListener('click', function() {
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