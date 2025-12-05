url = new URL(document.URL);
const urlParams = url.searchParams;
const messageId = urlParams.get("message_id");

const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
}

fetchMethod(currentUrl + `/api/message/${messageId}`, callback, "DELETE");