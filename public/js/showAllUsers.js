const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const userList = document.getElementById("userList");
    responseData.forEach((user) => {
      const displayItem = document.createElement("div");
      displayItem.className = "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 p-3";
      displayItem.innerHTML = `
      <div class="card d-flex flex-column h-100">
      <div class="card-body flex-fill">
                  <h5 class="card-title">${user.username}</h5>
                  <p class="card-text">
                      Created on: ${user.created_on}
                  </p>
                  <a href="singleUser.html?user_id=${user.user_id}" class="btn btn-primary">View Details</a>
              </div>
          </div>
          `;
      userList.appendChild(displayItem);
    });
  };
  
  fetchMethod(currentUrl + "/api/users", callback);