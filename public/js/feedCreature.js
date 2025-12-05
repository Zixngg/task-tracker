url = new URL(document.URL);
const urlParams = url.searchParams;
const creatureBoughtId = urlParams.get("creatureBought_id");

const id = localStorage.getItem("user_id");

document.addEventListener("DOMContentLoaded", function () {

    const data = {
        creatureBought_id: creatureBoughtId,
        user_id: id
    };

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    };

    fetchMethod(currentUrl + `/api/creatures/${id}/feed/${creatureBoughtId}`, callback, "PUT", data);  
});