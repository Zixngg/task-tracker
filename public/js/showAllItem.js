const token = localStorage.getItem("token");

if (token){
  document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const itemList = document.getElementById("itemList");
      responseData.forEach((item) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
        <div class="card d-flex flex-column h-100">
        <img src="img/item${item.item_id}.jpg" class="card-img-top" alt="Item Image">
        <div class="card-body flex-fill">
                  <h5 class="card-title">${item.name}</h5>
                  <p class="card-text">
                      Description: ${item.description} <br>
                      <br>Cost: ${item.item_points} points
                  </p>
                  <a href="singleItemInfo.html?item_id=${item.item_id}" class="btn btn-primary">View Details</a>
              </div>
          </div>
          `;
        itemList.appendChild(displayItem);
      });
    };
  
    fetchMethod(currentUrl + "/api/buy_items", callback);
  });
} else {
  window.location.href = "noAccountItem.html";
}