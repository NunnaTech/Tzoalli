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
                      ${e.evidences.map((obj,index)=>{
                        return ` <a
                        href=${obj.evidence_url}
                        class="btn btn-ghost rounded-3xl"
                        style="background-color: #f29c1f; color: white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-6 h-6 mr-3"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                          />
                        </svg>
                        Evidencia ${(index+1)}
                      </a>`
                      })}
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
