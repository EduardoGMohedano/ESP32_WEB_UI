document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var hashedpasword = CryptoJS.MD5(password).toString();
    var errorMessage = document.getElementById('error-message');

    let auth_data = {
        'user': username,
        'pass': hashedpasword
    };

    fetch('http://esp-home.local/authentication',{
        method: 'POST',
        mode: 'no-cors', //temporary setting to get data from server board
        headers: {'Content-Type': 'application/json'},
        body :JSON.stringify(auth_data),
    })
    .then( response => {
        return response.json();
    }) 
    .then( data => {
        if( data["response"] === "ESP_OK"){
            alert('Login successful!');
            window.location.href = 'home.html'
        }
        else
            alert('Invalid user or password!');
    })
    .catch(error => console.error('Error while fetching data: ',error));
    
});
