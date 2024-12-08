   // Signup functionaliteit
   var btnSignup = document.querySelector(".signup-form button").addEventListener("click", function() {
    let username = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    fetch("https://api-f9me.onrender.com/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            "username": username,
            "password": password
        })
    }).then(response => {
        return response.json();
    }).then(json => {
        if (json.status === "Signup successful") {
            let feedback = document.querySelector(".alert");
            feedback.textContent = "Signup successful!";
            feedback.classList.remove('hidden');

            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "index.html";
        }
    }).catch(error => {
        console.error("Signup failed:", error);
    });
});