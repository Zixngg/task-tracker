const user_id = localStorage.getItem("user_id");
// console.log(user_id);
document.addEventListener("DOMContentLoaded", function () {
  const createMessageForm = document.getElementById("createMessageForm");

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
    if (responseStatus == 201) {
      // Reset the form fields
      createMessageForm.reset();
      // Check if create player was successful
      window.location.href = "message.html";
    } else {
      alert(responseData.message);
    }
  };


  createMessageForm.addEventListener("submit", function (event) {
    console.log("createMessageForm.addEventListener");
    event.preventDefault();

    const message_text = document.getElementById("createMessage").value;

    const data = {
      message_text: message_text,
      user_id: user_id
    };

    fetchMethod( currentUrl + "/api/message", callback, "POST", data);
  });
});