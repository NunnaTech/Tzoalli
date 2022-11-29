import { VisitService } from "../services/VisitService.js"

const visitService = new VisitService();


function addOrder(item) {
  if (item) {
    localStorage.setItem("currentOrder", JSON.stringify(item));
    location.href = '../../order.html'
  }
}

const loadContent = () => {
  let token = localStorage.token

  visitService.GetAllNextVisits(token)
    .then((response) => response.json())
    .then((response) => {
      let generator = document.getElementById('next-visits-generator')
      let noContent = document.getElementById('noContent')
      generator.innerHTML = ""

      if (response.data.data.length === 0) {
        noContent.innerHTML += `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" h-10 mt-10 text-gray-400">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
      </svg>
        <h1 class="font-bold text-2xl drop-shadow-sm  text-center text-gray-400">No cuentas con visitias en proceso</h1>
        `
      } else {
        response.data.data.map((item, i) => {
          generator.innerHTML += `
          <div class="card  bg-base-100 shadow-xl mt-6 mx-3">
            <div class="card-body">
            <h2 class="card-title font-bold text-2xl" style="color: #EB7063">${item.grocer.grocer_name}</h2>
            <p class="text-sm font-semibold">${item.grocer.address} #${item.grocer.zip_code}</p>
          </div>
            <div class="grid grid-cols-1 lg:flex md:justify-around mb-3 px-5">
              <label class="btn btn-outline btn-error modal-button mx-1" for="my-modal-confirm-${i}">Completar
                visita</label>

              <div class="grid grid-cols-1 mt-2 md:justify-center lg:flex md:mt-0">
              <button id="btnOrder" onclick='addOrder(${JSON.stringify(item)})' class="btn btn-outline btn-success modal-button mx-1">Iniciar
                pedido</button>
                <a href="./observations.html?${item.id}" for="my-modal-6"
                  class="btn btn-outline btn-warning modal-button mx-0">Observaciones</a>
              </div>
            </div>
            </div>
    
            <!-- Modal de confirmación -->
              <input type="checkbox" id="my-modal-confirm-${i}" class="modal-toggle" />
              <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                  <label for="my-modal-confirm-${i}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                  <h3 class="text-lg font-bold pt-5">¿Estás seguro de que la visita terminó?</h3>
                  <p class="py-4">Una vez marcado como "completado" no podras deshacer el cambio!</p>
                  <button class="btn bg-[#25AC5B] border-none w-full mt-2" id="completeBtn" onclick='complete(${item.id},${i});'>
                    <svg class="stroke-1 h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                    Sí, entregar
                  </button>
                </div>
              </div>
                  `
        })
      }


    })
}

function complete(id, checkId) {

  let token = localStorage.token
  document.getElementById(`my-modal-confirm-${checkId}`).checked = false;

  visitService.Complete(id, token)
    .then((response) => response.json())
    .then((response) => {

      let generator = document.getElementById('next-visits-generator')
      generator.innerHTML = ""
      generator.innerHTML += `

      <div class="card bg-base-100 shadow-xl mt-3 w-auto sm:flex-1 mx-3 sm:ml-0">
      <div class="animate-pulse flex card-body">
        <div class=" btn btn-disabled bg-slate-400 rounded"></div>
        <div class="flex-1 space-y-3 py-1">
          <div class="h-2 bg-slate-400 rounded"></div>
          <div class="h-2 bg-slate-400 rounded col-span-2"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-6 gap-4">
              <div class="h-6 bg-slate-400 rounded col-span-2"></div>
              <div class="h-6 bg-slate-400 rounded col-span-2"></div>
              <div class="h-6 bg-slate-400 rounded col-span-2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    
    <div class="card bg-base-100 shadow-xl mt-3 w-auto sm:flex-1 mx-3 sm:ml-0">
    <div class="animate-pulse flex card-body">
      <div class=" btn btn-disabled bg-slate-400 rounded"></div>
      <div class="flex-1 space-y-3 py-1">
        <div class="h-2 bg-slate-400 rounded"></div>
        <div class="h-2 bg-slate-400 rounded col-span-2"></div>
        <div class="space-y-3">
          <div class="grid grid-cols-6 gap-4">
            <div class="h-6 bg-slate-400 rounded col-span-2"></div>
            <div class="h-6 bg-slate-400 rounded col-span-2"></div>
            <div class="h-6 bg-slate-400 rounded col-span-2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  
    <div class="card bg-base-100 shadow-xl mt-3 w-auto sm:flex-1 mx-3 sm:ml-0">
    <div class="animate-pulse flex card-body">
      <div class=" btn btn-disabled bg-slate-400 rounded"></div>
      <div class="flex-1 space-y-3 py-1">
        <div class="h-2 bg-slate-400 rounded"></div>
        <div class="h-2 bg-slate-400 rounded col-span-2"></div>
        <div class="space-y-3">
          <div class="grid grid-cols-6 gap-4">
            <div class="h-6 bg-slate-400 rounded col-span-2"></div>
            <div class="h-6 bg-slate-400 rounded col-span-2"></div>
            <div class="h-6 bg-slate-400 rounded col-span-2"></div>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="card bg-base-100 shadow-xl mt-3 w-auto sm:flex-1 mx-3 sm:ml-0">
  <div class="animate-pulse flex card-body">
    <div class=" btn btn-disabled bg-slate-400 rounded"></div>
    <div class="flex-1 space-y-3 py-1">
      <div class="h-2 bg-slate-400 rounded"></div>
      <div class="h-2 bg-slate-400 rounded col-span-2"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-6 gap-4">
          <div class="h-6 bg-slate-400 rounded col-span-2"></div>
          <div class="h-6 bg-slate-400 rounded col-span-2"></div>
          <div class="h-6 bg-slate-400 rounded col-span-2"></div>
        </div>
      </div>
    </div>
  </div>
  </div>
      `
      loadContent()
    })
}

loadContent()