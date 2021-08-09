const loginData = document.querySelector("#login-form");
loginData.addEventListener("submit", loginSubmission());

loginSubmission = (e) => {  
    e.preventDefault();
    const username = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (username && password) {
        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: ({"Content-Type": "application/json"}),
            });

            if(response.ok) {
                document.location.replace("/dashboard");
            } else {
                alert("Invalid username or password");
                return;
            }
        };    
};