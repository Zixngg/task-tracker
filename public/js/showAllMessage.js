const id = localStorage.getItem("user_id");
const token = localStorage.getItem("token");

if (token){
  document.addEventListener("DOMContentLoaded", function () {
      const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        const messageList = document.getElementById("messageList");
        responseData.forEach((message) => {
          const displayItem = document.createElement("div");
          displayItem.className =
            "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 p-3";
          displayItem.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${message.message_text}</h5>
                    <p class="card-text">
                        User ID: ${message.user_id}
                        <br> Username: ${message.username}
                        <br> Created at: ${message.created_at}
                    </p>
                  
                    ${id == message.user_id ? `
                    <a href="updateMessage.html?message_id=${message.id}" class="btn btn-success">Update</a>
                    <a href="deleteMessage.html?message_id=${message.id}" class="btn btn-danger">Delete</a>
    
              ` :''}
                </div>
            </div>
            `;
          messageList.appendChild(displayItem);
      });
      };
    
      fetchMethod(currentUrl + "/api/message", callback);
  });
} else {
  window.location.href = "noAccountMessages.html";
}