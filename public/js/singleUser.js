url = new URL(document.URL);
const urlParams = url.searchParams;
const userId = urlParams.get("user_id");

const callbackForUserInfo = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);

  const userInfo = document.getElementById("userInfo");

  if (responseStatus == 404) {
    userInfo.innerHTML = `${responseData.message}`;
    return;
  }

  userInfo.innerHTML = `
    <div class="card">
    <div class="card-body">
        <p class="card-text">
            Username: ${responseData.username} <br>
            Created on: ${responseData.created_on} <br>
            <br>Points: ${responseData.total_points} points<br>
        </p>
    </div>
    </div>
    `;
};

const callbackForUserItemGotten = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);
  
    const itemGottenList = document.getElementById("itemGottenList");
    responseData.forEach((itemGotten) => {
      const displayItem = document.createElement("div");
      displayItem.innerHTML = `
          <br><div class="card">
              <div class="card-body">
                  <h5 class="card-title">Item Name: ${itemGotten.item_name}</h5>
                  <p class="card-text">
                      Description: ${itemGotten.item_description} <br>
                  </p>
              </div>
          </div>
          `;
      itemGottenList.appendChild(displayItem);
    });
};
  
const callbackForUserCreatureGotten = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
    
      const creatureGottenList = document.getElementById("creatureGottenList");
      responseData.forEach((creatureGotten) => {
        const displayItem = document.createElement("div");
        displayItem.innerHTML = `
            <br><div class="card">
                <div class="card-body">
                    <h5 class="card-title">Creature Name: ${creatureGotten.creature_name}</h5>
                    <p class="card-text">
                        Description: ${creatureGotten.creature_description} <br>
                        Last fed: ${creatureGotten.feedCreature} <br>
                        Last water: ${creatureGotten.waterCreature} <br>
                    </p>
                </div>
            </div>
            `;
          creatureGottenList.appendChild(displayItem);
      });
};
  
const callbackForUserRewardGotten = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
    
      const rewardGottenList = document.getElementById("rewardGottenList");
      responseData.forEach((rewardGotten) => {
        const displayItem = document.createElement("div");
        displayItem.innerHTML = `
            <br><div class="card">
                <div class="card-body">
                    <h5 class="card-title">Reward Name: ${rewardGotten.reward_name}</h5>
                    <p class="card-text">
                        Description: ${rewardGotten.reward_description} <br>
                    </p>
                </div>
            </div>
            `;
          rewardGottenList.appendChild(displayItem);
      });
};

fetchMethod(currentUrl + `/api/users/${userId}`, callbackForUserInfo);
fetchMethod(currentUrl + `/api/items/users/${userId}`, callbackForUserItemGotten);
fetchMethod(currentUrl + `/api/creatures/users/${userId}`, callbackForUserCreatureGotten);
fetchMethod(currentUrl + `/api/reward_gotten/users/${userId}`, callbackForUserRewardGotten);
