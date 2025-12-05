document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const taskList = document.getElementById("taskList");
      responseData.forEach((task) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
        <div class="card d-flex flex-column h-100">
        <div class="card-body flex-fill">
                  <h5 class="card-title">${task.title}</h5>
                  <p class="card-text">
                      Description: ${task.description} <br><br>
                      Points: ${task.points} <br>
                  </p>
              </div>
          </div>
          `;
        taskList.appendChild(displayItem);
      });
    };
  
    fetchMethod(currentUrl + "/api/tasks", callback);
});