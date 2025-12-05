const id = localStorage.getItem("user_id");
url = new URL(document.URL);
const urlParams = url.searchParams;
const taskId = urlParams.get("task_id");
console.log(id)
console.log(taskId)

const data1 = {
  user_id: id,
  task_id: taskId,
  completion_date: "2023-07-30",
  notes: "Planted a tree in the park near my house."
}

const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
}

fetchMethod(currentUrl + "/api/task_progress", callback, "POST", data1);