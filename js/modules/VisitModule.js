
const loadContent = () => {
  fetch("http://127.0.0.1:8000/api/visit/getMyVisits/Pendiente",
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
      console.log(response)
      let generator = document.getElementById('next-visits-generator')

      response.data.data.map((item, i) => {
        generator.innerHTML += `
          <div class="card bg-base-100 shadow-xl mt-6 w-full ">
          <div class="card-body">
            <h2 class="card-title text-red-400 font-bold text-2xl">${item.grocer.grocer_name}</h2>
            <p class="text-sm font-semibold">${item.grocer.address} #${item.grocer.zip_code}</p>
          </div>
          <div class="grid md:grid-cols-3 lg:grid-cols-3 mb-3 px-2">
            <a href="./order.html" class="btn btn-outline btn-success modal-button mx-1 mt-1 md:mt-0">Iniciar
              pedido</a>
            <label class="btn btn-outline btn-error modal-button mx-1 mt-1 md:mt-0"
              for="my-modal-confirm-${i}">Completar visita</label>
            <a href="./observations.html" for="my-modal-6"
              class="btn btn-outline btn-warning modal-button mx-1 mt-1 md:mt-0">Observaciones</a>
          </div>
        </div>

        <!-- Modal de confirmación -->
        <input type="checkbox" id="my-modal-confirm-${i}" class="modal-toggle" />
        <div class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <label for="my-modal-confirm-${i}" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 class="text-lg font-bold pt-5">¿Estás seguro de que la vista acabó?</h3>
            <p class="py-4">Una vez marcada como "terminada" la visita no podras deshacer el cambio!</p>
            <button class="btn bg-[#25AC5B] border-none w-full mt-2" id="completeBtn" onclick='completeVisit(${item.id});'>
              <svg class="stroke-1 h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              Sí, completar
            </button>
          </div>
        </div>
          `
      })
    })
}

function completeVisit(id) {
  fetch(`http://127.0.0.1:8000/api/visit/updateStatus/${id}`,
    {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer 2|yxcPDjc23t9wWR2Cf5GEEQxBHMZTHcbVnquQJzG0"
      },
      body: JSON.stringify({ status: "Realizado" })
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      let generator = document.getElementById('next-visits-generator')
      generator.innerHTML = ""
      loadContent()
    })
}

loadContent()