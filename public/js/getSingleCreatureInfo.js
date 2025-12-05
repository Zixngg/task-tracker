document.addEventListener("DOMContentLoaded", function () {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const creatureId = urlParams.get("creature_id");

  const callbackForCreatureInfo = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const creatureInfo = document.getElementById("creatureInfo");

    if (responseStatus == 404) {
      creatureInfo.innerHTML = `${responseData.message}`;
      return;
    }

    creatureInfo.innerHTML = `
        <div class="card">
            <div class="card-body">
                <p class="card-text">
                    Creature ID: ${responseData.creature_id} <br>
                    Creature Name: ${responseData.name} <br>
                    Description: ${responseData.description} <br>
                    <br> Cost: ${responseData.creature_points} points <br>
                </p>
                ${creatureId == responseData.creature_id ? `
                <a href="boughtCreature.html?creature_id=${responseData.creature_id}" class="btn btn-primary">Purchase</a>

          ` :''}
            </div>
        </div>
    `;
  };

  fetchMethod(currentUrl + `/api/buy_creatures/${creatureId}`, callbackForCreatureInfo);
});