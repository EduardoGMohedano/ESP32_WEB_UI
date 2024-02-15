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
