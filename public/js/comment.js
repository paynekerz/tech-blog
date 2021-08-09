const revealHandler = async (event) => {
    event.preventDefault();
  
    const makeComment = document.querySelector(".makeComment");
    makeComment.setAttribute("class", "reveal");
  
    window.scrollTo(0, document.body.scrollHeight);
  };
  
  const commentHandler = async (event) => {
    event.preventDefault();
  
    const postID = event.target.getAttribute("data-id");
    const commentBody = document.querySelector("#commentBody").value;
  
    const response = await fetch(`/api/posts/comment/${postID}`, {
      method: "POST",
      body: JSON.stringify({ commentBody, postID }),
      headers: { "Content-Type": "application/json" },
    });
  
    if (response.ok) {
      document.location.replace(`/posts/${postID}`);
    } else {
      alert("Comment creation failed.");
    }
  };
  
  document.querySelector("#addComment").addEventListener("click", revealHandler);
  document.querySelector("#submitComment").addEventListener("click", commentHandler);