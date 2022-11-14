import { VisitService } from "../services/VisitService.js"

const visitService = new VisitService();

const loadContent = () => {
  let token = localStorage.token

  visitService.GetAllPendingVisits(token)
    .then((response) => response.json())
    .then((response) => {

      let generator = document.getElementById('pending-visits-generator')
      generator.innerHTML = ""
      response.data.data.map((item, i) => {
        generator.innerHTML += `

      <div class="card bg-base-100 shadow-xl mt-6 w-auto sm:flex-1 mx-5 sm:ml-0">
      <div class="card-body">
        <h2 class="card-title text-red-400 font-bold text-2xl">${item.grocer.grocer_name}</h2>
        <p class="text-sm font-semibold">${item.grocer.address} #${item.grocer.zip_code}</p>
        <div class="card-actions justify-around md:justify-between lg:justify-between">
          <div class="badge mt-5 border-none bg-[#F29C1F] text-gray-100 py-3">En camino</div>
          <div class="btn-group">
            <label class="btn btn-outline btn-error modal-button" for="my-modal-confirm-${i}">Entregar</label>
            <label for="my-modal-${i}" class="btn btn-outline btn-success modal-button">Detalles</label>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de detalles </body> tag -->
        <input type="checkbox" id="my-modal-${i}" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <label for="my-modal-${i}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 class="font-bold text-xl text-red-400">Detalle visita a: </h3>
            <p class="text-black-400 text-lg font-semibold">${item.grocer.grocer_name}</p>
            <p class="font-semibold text-md text-right">Recibido por:
            <p class="text-right mb-5">${item.order.received_by}</p>
            `
          +
          item.order.details.map((item_detail, i) => {
            return `${item_detail.product.product_name} $${item_detail.product.product_price} | ${item_detail.quantity} Piezas`
          }).join("<br>")
          +
          `
            <br>
            <hr>
            <br>
            <div class="flex flex-row justify-between">
              <h4 class="font-bold text-lg">Total: </h4>
              <h4 class="font-bold text-lg self-end">$${item.order.total_order_amount}</h4>
            </div>
            <div class="btn-group">
            <a for="my-modal-${i}" href="./order.html"
              class="btn bg-[#25AC5B] text-gray-100 border-none hover:bg-[#25AC5B]">Observaciones</a>
          </div>
          </div>
        </div>


    <!-- Modal de confirmación -->
        <input type="checkbox" id="my-modal-confirm-${i}" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <label for="my-modal-confirm-${i}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 class="text-lg font-bold pt-5">¿Estás seguro de entregar el pedido?</h3>
            <p class="py-4">Una vez marcado como "entregado" no podras deshacer el cambio!</p>
            <button class="btn bg-[#25AC5B] border-none w-full mt-2" id="deliverBtn" onclick='deliver(${item.id},${i});'>
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
    })
}

function deliver(id, checkId) {

  let token = localStorage.token
  document.getElementById(`my-modal-confirm-${checkId}`).checked = false;

  visitService.Complete(id, token)
    .then((response) => response.json())
    .then((response) => {
      let generator = document.getElementById('pending-visits-generator')
      generator.innerHTML = ""
      generator.innerHTML += `
      <div class="card bg-base-100 shadow-xl mt-3 w-auto sm:flex-1 mx-3 sm:ml-0">
      <div class="animate-pulse flex card-body">
        <div class=" btn btn-disabled bg-slate-400 rounded"></div>
        <div class="flex-1 space-y-3 py-1">
          <div class="h-2 bg-slate-400 rounded"></div>
          <div class="h-2 bg-slate-400 rounded col-span-2"></div>
          <div class="space-y-3">
            <div class="grid grid-cols-4 gap-4">
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
          <div class="grid grid-cols-4 gap-4">
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
        <div class="grid grid-cols-4 gap-4">
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
      <div class="grid grid-cols-4 gap-4">
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