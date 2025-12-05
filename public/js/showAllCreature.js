const token = localStorage.getItem("token");

if (token){
  document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      const creatureList = document.getElementById("creatureList");
      responseData.forEach((creature) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12 p-3";
        displayItem.innerHTML = `
        <div class="card d-flex flex-column h-100">
        <img src="img/creature${creature.creature_id}.jpg" class="card-img-top" alt="Creature Image">
        <div class="card-body flex-fill">
                  <h5 class="card-title">${creature.name}</h5>
                  <p class="card-text">
                      Description: ${creature.description} <br>
                      <br> Cost: ${creature.creature_points} points
                  </p>
                  <a href="singleCreatureInfo.html?creature_id=${creature.creature_id}" class="btn btn-primary">View Details</a>
              </div>
          </div>
          `;
        creatureList.appendChild(displayItem);
      });
    };

    fetchMethod(currentUrl + "/api/buy_creatures", callback);
  });
} else {
  window.location.href = "noAccountCreature.html";
}