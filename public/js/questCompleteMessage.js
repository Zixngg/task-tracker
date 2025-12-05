const id = localStorage.getItem("user_id");
url = new URL(document.URL);
const urlParams = url.searchParams;
const questId = urlParams.get("quest_id");
console.log(id)
console.log(questId)

const data1 = {
  user_id: id,
  quest_id: questId,
  completion_date: "2023-07-30",
}

const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
}

fetchMethod(currentUrl + "/api/quest_progress", callback, "POST", data1);