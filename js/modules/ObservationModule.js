import { ObservationService } from "../services/ObservationService.js";

let params = window.location;
const observationService = new ObservationService();

const getParams = () => {
  let evidences = document.getElementById("rootEvidences");
  let addButton = document.getElementById("addNew")
  addButton.href = `./add-observation.html?${params.href.split("?")[1]}`
  observationService
    .getAllObservations(localStorage.token, params.href.split("?")[1])
    .then((res) => res.json())
    .then((data) => {
      data.data.map((e, i) => {
        evidences.insertAdjacentHTML(
          "beforeend",
          `
            <div class="card w-11/12 bg-base-100 shadow-xl mt-6">
                <div class="card-body">
                  <div class="flex">
                    <div class="flex items-center">
                      <svg
                        style="width: 64px; height: 64px; color: #2e3440"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12,18H6V14H12M21,14V12L20,7H4L3,12V14H4V20H14V14H18V20H20V14M20,4H4V6H20V4Z"
                        />
                      </svg>
                    </div>
                    <div class="flex-col ml-6">
                      <h2 class="card-title">${e.title}</h2>
                      <p class="text-justify mt-3">${e.comment}</p>
                      <div class="card-actions justify-start mt-3">
                      ${e.evidences.map((obj, index) => {
            return ` 
                        <img src="${obj.evidence_url}" height="100px" width="100px" class="rounded-box"/>
                      `
          }).join("")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `
        );
      });
    })
    .catch((e) => {
      console.log(e);
    });
};


getParams();
