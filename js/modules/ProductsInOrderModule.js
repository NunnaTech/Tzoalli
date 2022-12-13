import { ProductService } from '../../js/services/ProductService.js';

let productService = new ProductService;
const fakeCards = [0, 1, 2, 3, 4, 5]

const generateFakeCards = () => {
    let generator = document.getElementById('list-products')
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
    let token = localStorage.getItem("token")
    productService.GetAllProducts(token)
        .then((response) => response.json())
        .then((response) => {
            let generator = document.getElementById('list-products')
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
                        <h5 class="mb-2 text-2xl font-semibold tracking-tight text-black">${item.product_name}
                        </h5>
                    </a>
                    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">${item.description} cada pieza</p>
                    <label for="my-modal-${i}" class="btn border-none modal-button" style="background-color: #ffbc24; color: white>
                        <svg class="stroke-1 h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
                        </svg>
                        Agregar dulce
                    </label>
                </div>
            
                <input type="checkbox" id="my-modal-${i}" class="modal-toggle" />
                <div class="modal modal-bottom sm:modal-middle">
                    <div class="modal-box relative">
                        <label for="my-modal-${i}"
                            class="btn bg-[#575F69] border-none btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <figure class="px-10 pt-10 flex justify-center">
                            <img src="${item.product_image}" alt="Shoes" class="rounded-xl" width="150px" height="150px"/>
                        </figure>
                        <div class="card-body items-center text-center">
                            <h2 class="text-lg">${item.product_name}</h2>
                            <p class="font-bold">$${item.product_price} cada pieza</p>
                            <div class="card-actions justify-center">
                                <input type="number" placeholder="Cantidad" id="quantity_${i}"
                                    class="input input-bordered w-full text-black text-center lg:w-96" min="1" value="1"/>
                                <button class="btn border-none w-full mt-2" id="addProductToOrderBtn"  style="background-color: #25ac5b; color: white"
                                    onclick='addProductToOrder(${i}, ${JSON.stringify(item)});'>
                                    <svg class="stroke-1 h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                    Agregar
                                </button>
                            </div>
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

const searchBtn = document.getElementById('searchBtn')
searchBtn.addEventListener('click', () => {
    let searchValue = document.getElementById('searchValue').value
    let token = localStorage.token
    let generator = document.getElementById('list-products')

    generateFakeCards()

    productService.GetAllProductsByCoincidence(token, searchValue)
        .then((response) => response.json())
        .then((response) => {

            generator.innerHTML = ""
            response.data.map((item, i) => {
                generator.innerHTML += `
                <div class="card w-auto bg-white shadow-xl p-4 m-5 mx-15 h-min">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="mb-2 w-10 h-10 text-yellow-300 dark:text-gray-400">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                <a>
                    <h5 class="mb-2 text-2xl font-semibold tracking-tight text-black">${item.product_name}
                    </h5>
                </a>
                <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">${item.description} cada pieza</p>
                <label for="my-modal" class="btn border-none modal-button" style="background-color: #25ac5b; color: white">
                    <svg class="stroke-1 h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
                    </svg>
                    Agregar dulce
                </label>
            </div>
            
            <input type="checkbox" id="my-modal" class="modal-toggle" />
                        <div class="modal modal-bottom sm:modal-middle">
                            <div class="modal-box relative">
                                <label for="my-modal"
                                    class="btn bg-[#575F69] border-none btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <figure class="px-10 pt-10">
                                    <img src="${item.product_image}" alt="Shoes" class="rounded-xl" />
                                </figure>
                                <div class="card-body items-center text-center">
                                    <h2 class="text-lg">${item.product_name}</h2>
                                    <p class="font-bold">${item.product_price} cada pieza</p>
                                    <div class="card-actions justify-center">
                                        <input type="number" placeholder="Cantidad"
                                            class="input input-bordered w-full text-black lg:w-96" min="1" value="1"/>
                                        <button class="btn bg-success border-none w-full mt-2" id="btnAddProduct${i}">
                                            <svg class="stroke-1 h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                                stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round"
                                                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                            </svg>
                                            Agregar
                                        </button>
                                    </div>
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

loadContent();