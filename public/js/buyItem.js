const user_id = localStorage.getItem("user_id");
url = new URL(document.URL);
const urlParams = url.searchParams;
const itemId = urlParams.get("item_id");

document.addEventListener("DOMContentLoaded", function () {

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        if (responseStatus == 400) {
            window.location.href = "insufficientPoints.html";
        } 
    };


    const data = {
      item_id: itemId,
      user_id: user_id
    };

    fetchMethod( currentUrl + `/api/buy_items/${itemId}/users/${user_id}`, callback, "POST", data);
});