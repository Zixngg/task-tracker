const token = localStorage.getItem("token");

if (token){
  document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const questList = document.getElementById("questList");
      responseData.forEach((quest) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
        <div class="card d-flex flex-column h-100">
        <div class="card-body flex-fill">
                  <h5 class="card-title">${quest.title}</h5>
                  <p class="card-text">
                      Description: ${quest.description} <br>
                  </p>
                  <a href="questCompleted.html?quest_id=${quest.quest_id}" class="btn btn-primary">Embark</a>
              </div>
          </div>
          `;
        questList.appendChild(displayItem);
      });
    };
  
    fetchMethod(currentUrl + "/api/quests", callback);
});
} else {
  window.location.href = "noAccountQuest.html";
}