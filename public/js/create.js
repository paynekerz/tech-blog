const createHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#cPostTitle").value;
    const postBody = document.querySelector("#cPostBody").value;
  
    if (title && postBody) {
      const response = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({ title, postBody }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Post creation failed");
      }
    }
  };
  
  document.querySelector(".createDPost").addEventListener("submit", createHandler);
  