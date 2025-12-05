document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const itemId = urlParams.get("item_id");
  
    const callbackForItemInfo = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const itemInfo = document.getElementById("itemInfo");
  
      if (responseStatus == 404) {
        itemInfo.innerHTML = `${responseData.message}`;
        return;
      }
  
      itemInfo.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <p class="card-text">
                      Item ID: ${responseData.item_id} <br>
                      Item Name: ${responseData.name} <br>
                      Description: ${responseData.description} <br>
                      <br> Cost: ${responseData.item_points} points <br>
                  </p>
                  ${itemId == responseData.item_id ? `
                  <a href="boughtItem.html?item_id=${responseData.item_id}" class="btn btn-primary">Purchase</a>
  
            ` :''}
              </div>
          </div>
      `;
    };
  
    fetchMethod(currentUrl + `/api/buy_items/${itemId}`, callbackForItemInfo);
  });