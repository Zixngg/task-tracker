url = new URL(document.URL);
const urlParams = url.searchParams;
const messageId = urlParams.get("message_id");

const id = localStorage.getItem("user_id");
const token = localStorage.getItem("token");

document.addEventListener("DOMContentLoaded", function () {
  const createMessageForm = document.getElementById("createMessageForm");

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    if (responseStatus == 200) {
   
      createMessageForm.reset();
      
      window.location.href = "message.html"
      ;
    } else {
      alert(responseData.message);
    }
  };


  createMessageForm.addEventListener("submit", function (event) {
    console.log("createMessageForm.addEventListener");
    event.preventDefault();
  
    const message_text = document.getElementById("createMessage").value;
  
    const data = {
      id: messageId,
      user_id: id,
      message_text: message_text
    };

    fetchMethod(currentUrl + `/api/message/${messageId}`, callback, "PUT", data);
    window.location.href = "message.html"
  });
  
});