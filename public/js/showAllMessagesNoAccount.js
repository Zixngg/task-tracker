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
        <div class="card d-flex flex-column h-100">
        <div class="card-body flex-fill">
                  <h5 class="card-title">${message.message_text}</h5>
                  <p class="card-text">
                      User ID: ${message.user_id}
                      <br> Username: ${message.username}
                      <br> Created at: ${message.created_at}
                  </p>
              </div>
          </div>
          `;
        messageList.appendChild(displayItem);
    });
    };

    fetchMethod(currentUrl + "/api/message", callback);
});