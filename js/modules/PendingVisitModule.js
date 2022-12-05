import { VisitService } from "../services/VisitService.js"
import { offlineMode } from "../utils/offline.js"

offlineMode()
const visitService = new VisitService();

const loadContent = () => {
  let token = localStorage.token

  visitService.GetAllPendingVisits(token)
    .then((response) => response.json())
    .then((response) => {
      let generator = document.getElementById('pending-visits-generator')
      let noContent = document.getElementById('noContent')
      generator.innerHTML = ""

      if (response.data.data.length === 0) {
        noContent.innerHTML += `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="text-gray-400" style="height:50px; width:50px; margin-top:50px;">>
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
        </svg>
        <h1 class="font-bold text-2xl drop-shadow-sm  text-center text-gray-400">No cuentas con visitas en proceso</h1>
        `
      } else {
        response.data.data.map((item, i) => {
          generator.innerHTML += `
  
        <div class="card bg-base-100 shadow-xl mt-6 w-auto sm:flex-1 mx-5 sm:ml-0">
        <div class="card-body">
          <h2 class="card-title font-bold text-2xl" style="color: #EB7063">${item.grocer.grocer_name}</h2>
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
              <h3 class="font-bold text-xl" style="color: #EB7063">Detalle visita a: </h3>
              <p class="text-black-400 text-lg font-semibold">${item.grocer.grocer_name}</p>
              <p class="font-semibold text-md text-right" style="color: #EB7063">Recibido por:
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
              <div class="modal-action">
              <a for="my-modal-${i}" href="./observations.html?${item.id}"
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
              <button class="btn bg-[#25AC5B] border-none w-full mt-2" id="deliverBtn" onclick='complete(${item.id},${i})'>
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


loadContent()