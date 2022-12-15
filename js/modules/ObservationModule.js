import { ObservationService } from "../services/ObservationService.js";

let params = window.location;
const observationService = new ObservationService();

const getParams = () => {
  let evidences = document.getElementById("rootEvidences");
  let addButton = document.getElementById("addNew")
  let noContent = document.getElementById('noContent')
  addButton.href = `./add-observation.html?${params.href.split("?")[1]}`
  observationService
    .getAllObservations(localStorage.token, params.href.split("?")[1])
    .then((res) => res.json())
    .then((data) => {

      if (data.data.length === 0) {
        noContent.innerHTML += `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-400" style="height:50px; width:50px; margin-top:50px;">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
      </svg>
      <h1 class="font-bold text-2xl drop-shadow-sm  text-center text-gray-400">No has realizado observaciones</h1>
      `
      } else {
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
      }


    })
};


getParams();
