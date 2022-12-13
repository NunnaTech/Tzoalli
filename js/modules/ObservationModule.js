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
          <div class="bg-base-100 shadow-xl card container px-6 py-5 mx-auto mt-7 w-6/6">
            <div class="lg:-mx-6 lg:flex lg:items-center" >
              <div class="object-cover carousel rounded-box w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-46">
                ${e.evidences.map((obj, index) => {
            return ` 
                  <div class="carousel-item w-full">
                  <img src="${obj.evidence_url}"  class="w-full"/>
                </div>        
                                  `
          }).join("")}
              </div>

              <div class="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6" >
                <p class="block mt-4 text-2xl font-semibold text-gray-700 md:text-3xl">
                ${e.title}
                </p>
                <p class="mt-3 text-gray-500 dark:text-gray-700" >
                ${e.comment}
                </p>
              </div>
            </div>
          </div>
            `
        );
      });
    })
};


getParams();
