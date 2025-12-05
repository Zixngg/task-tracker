document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const messageId = urlParams.get("message_id");
  
    const callbackForMessageInfo = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const messageInfo = document.getElementById("messageInfo");
  
      if (responseStatus == 404) {
        messageInfo.innerHTML = `${responseData.message}`;
        return;
      }
  
      messageInfo.innerHTML = `
          <div class="card">
              <div class="card-body">
              <h5 class="card-title">Message: ${responseData.message_text}</h5>
                  <p class="card-text">
                      User ID: ${responseData.user_id} <br>
                      Username: ${responseData.username}
                  </p>
              </div>
          </div>
      `;
    };
  
    fetchMethod(currentUrl + `/api/message/${messageId}`, callbackForMessageInfo);
  });