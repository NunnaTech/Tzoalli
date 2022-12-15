import { ProductService } from "../services/ProductService.js";

const productService = new ProductService();
const fakeCards = [0, 1, 2, 3, 4, 5]

const generateFakeCards = () => {
    let generator = document.getElementById('product-generator')
    generator.innerHTML = ""
    generator.innerHTML += fakeCards.map((item, i) => {
        return `
        <div class="card w-auto bg-white shadow-xl p-4 m-5 mx-15 h-min">
        <div class="animate-pulse flex card-body">
            <div class="flex-1 space-y-3 py-1">
                <div class="h-9 bg-slate-400 rounded"></div>
                <div class="h-4  bg-slate-400 rounded col-span-2"></div>
                <div class="space-y-3">
                    <div class="grid grid-cols-1 gap-4">
                        <div class=" btn btn-disabled h-6 bg-slate-400 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    }).join("")

}

const loadContent = () => {
    let token = localStorage.token

    productService.GetAllProducts(token)
        .then((response) => response.json())
        .then((response) => {
            let generator = document.getElementById('product-generator')
            generator.innerHTML = ""
            response.data.data.map((item, i) => {
                generator.innerHTML += `
                <div class="card w-auto bg-white shadow-xl p-4 m-5 mx-15 h-min">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="mb-2 w-10 h-10 text-yellow-300 dark:text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <a>
                        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-black">${item.product_name}</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">${item.description}</p>
                    <label for="my-modal-${i}" class="btn border-none modal-button" style="background-color: #ffbc24; color: white>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="stroke-1 h-6 w-6 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                        Detalles
                    </label>
                </div>

                <!-- Modal para detalles -->
                <input type="checkbox" id="my-modal-${i}" class="modal-toggle" />
                <div class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box relative">
                        <label for="my-modal-${i}"
                            class="btn bg-[#575F69] border-none btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <figure class="px-10 pt-10 flex justify-center">
                            <img src="${item.product_image}" alt="Shoes" class="rounded-md" height="200" width="200" />
                        </figure>
                        <div class="card-body items-center text-center">
                            <h2 class="text-lg">${item.product_name}</h2>
                            <p class="font-bold">$${item.product_price} cada pieza</p>
                        </div>
                    </div>
                </div>
                
                `
            }).join("")
        })
        .catch((err) => {
            console.log("[ERROR]:" + err)
        })
}

loadContent()


const searchBtn = document.getElementById('searchBtn')
searchBtn.addEventListener('click', () => {
    let searchValue = document.getElementById('searchValue').value
    let token = localStorage.token
    let generator = document.getElementById('product-generator')

    generateFakeCards()

    productService.GetAllProductsByCoincidence(token, searchValue)
        .then((response) => response.json())
        .then((response) => {
            generator.innerHTML = ""
            response.data.map((item, i) => {
                generator.innerHTML += `
                <div class="card w-auto bg-white shadow-xl p-4 m-5 mx-15 h-min">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="mb-2 w-10 text-yellow-300 h-10 dark:text-gray-400">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <a>
                        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-black">${item.product_name}</h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">${item.description}</p>
                    <label for="my-modal-${i}" class="btn border-none modal-button" style="background-color: #ffbc24; color: white>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="stroke-1 h-6 w-6 mr-2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>
                        Detalles
                    </label>
                </div>

                <!-- Modal para detalles -->
                <input type="checkbox" id="my-modal-${i}" class="modal-toggle" />
                <div class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box relative">
                        <label for="my-modal-${i}"
                            class="btn bg-warning border-none btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <figure class="px-10 pt-10 flex justify-center">
                            <img src="${item.product_image}" alt="Shoes" class="rounded-md" height="200" width="200" />
                        </figure>
                        <div class="card-body items-center text-center">
                            <h2 class="text-lg">${item.product_name}</h2>
                            <p class="font-bold">$ ${item.product_price} cada pieza</p>
                        </div>
                    </div>
                </div>
                
                `
            }).join("")
        })
        .catch((err) => {
            console.log("[ERROR]: " + err)
        })
})

const searchInput = document.getElementById('searchValue')
searchInput.addEventListener('input', (e) => {
    
    if (e.target.value === "") {
        generateFakeCards()
        loadContent()
    }
})

const clearBtn = document.getElementById('clearBtn')
clearBtn.addEventListener('click', () => {
    searchInput.value = ""
    generateFakeCards()
    loadContent();
})

