const loadContent = () => {
  fetch("http://127.0.0.1:8000/api/visit/getMyVisits/Realizado",
    {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer 2|yxcPDjc23t9wWR2Cf5GEEQxBHMZTHcbVnquQJzG0"
      }
    })
    .then((response) => response.json())
    .then((response) => {

      let generator = document.getElementById('completed-visits-generator')
      generator.innerHTML = ""
      response.data.data.map((item, i) => {
        generator.innerHTML += `
        <div class="card bg-base-100 shadow-xl mt-6 w-auto sm:flex-1 mx-3 sm:ml-0">
          <div class="card-body">
            <h2 class="card-title text-red-400 font-bold text-2xl">${item.grocer.grocer_name}</h2>
            <p class="text-sm font-semibold">${item.grocer.address} #${item.grocer.zip_code}</p>
            <div class="card-actions justify-between h-8">
              <div class="badge mt-5 border-none bg-[#25AC5B] text-gray-100 py-3">Completado</div>
              <label for="my-modal-${i}" class="btn btn-outline btn-success h-4 btn modal-button">Ver detalle</label>
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
            <div class="modal-action">
              <a for="my-modal-${i}" href="./observations.html"
                class="btn bg-[#25AC5B] text-gray-100 border-none hover:bg-[#25AC5B]">Observaciones</a>
            </div>
          </div>
        </div>
            `
      })
    })
}

loadContent()