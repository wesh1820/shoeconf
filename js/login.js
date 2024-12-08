const btnLogin = document.querySelector(".login-form button");

if (btnLogin) {
    btnLogin.addEventListener("click", function () {
        let username = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;

        if (!username || !password) {
            alert("Please fill in both username and password.");
            return;
        }

        fetch("https://api-f9me.onrender.com/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Login failed with status: " + response.status);
            }
            return response.json();
        })
        .then(json => {
            if (json.status === "Login successful") {
                alert("Login successful!");

                // Sla de user_id en token op in localStorage
                const token = json.data.token;
                const userId = json.data.user_id; // Zorg dat de backend de `user_id` meestuurt
                localStorage.setItem("token", token);
                localStorage.setItem("user_id", userId);

                // Redirect naar homepagina
                window.location.href = "./index.html";
            } else {
                alert("Login failed! Please check your credentials.");
            }
        })
        .catch(error => {
            console.error("Login error:", error);
            alert("Username or password are incorrect.");
        });
    });
}
