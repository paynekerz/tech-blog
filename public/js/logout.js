const logout = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      document.location.replace("/");
    } else {
      console.log(response.statusText);
    }
  };
  
  document.querySelector("#logout").addEventListener("click", logout);