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
          <div class="bg-base-100 shadow-xl card container px-6 py-5 mx-auto mt-7 w-5/6">
            <div class="lg:-mx-6 lg:flex lg:items-center">
              <div class="object-cover carousel rounded-box w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-46">
                ${e.evidences.map((obj, index) => {
            return ` 
                  <div class="carousel-item w-full">
                  <img src="${obj.evidence_url}"  class="w-full"/>
                </div>        
                                  `
          }).join("")}
              </div>

              <div class="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                <svg class="invisible w-0 h-0 md:h-20 md:w-20 md:invisible lg:visible" style="color: #2e3440"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
                </svg>
                <p class="block mt-4 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
                ${e.title}
                </p>
                <p class="mt-3 text-gray-500 dark:text-gray-300">
                ${e.comment}
                </p>
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
