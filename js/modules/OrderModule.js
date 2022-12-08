import { OrderService } from "../services/OrderService.js";

const orderService = new OrderService();

let btnConfirm = document.getElementById("btnConfirmOrder")
let btnCancelOrder = document.getElementById("btnCancelOrder")
let btnClearOrder = document.getElementById("btnClearOrder")

btnClearOrder.addEventListener('click', function () {
    localStorage.removeItem("orderProducts")
    loadContent()
})

btnCancelOrder.addEventListener('click', function () {
    localStorage.removeItem("currentOrder")
    localStorage.removeItem("orderProducts")
    location.href = "../../next-visits.html"
})

btnConfirm.addEventListener('click', function () {

    if (document.getElementById("received_by").value != null && document.getElementById("received_by").value != "") {
        let products = JSON.parse(localStorage.getItem("orderProducts"));
        let { id } = JSON.parse(localStorage.getItem("currentOrder"))
        let list_products = [];
        products.forEach(element => {
            list_products.push({
                product_id: element.product_id,
                quantity: element.quantity,
                total_amount: element.total_amount
            })
        })
        let token = localStorage.getItem("token")
        orderService.StoreOrder(token, {
            received_by: document.getElementById("received_by").value,
            total_order_amount: 0,
            visit_id: id,
            products: list_products
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.ok) {
                    Notiflix.Notify.success('Orden creada correctamente');
                    location.href = "../../pending-visits.html"
                } else {
                    Notiflix.Notify.failure('No se logró crear la orden');
                }
            }).catch((err) => {
                console.log("[ERROR]: " + err)
            })
    } else {
        Notiflix.Notify.warning('No se ingresó aún el nombre de quien recibe');
    }
})

const loadContent = () => {
    let total_amount = 0;
    let order = JSON.parse(localStorage.getItem('currentOrder'))
    let products = JSON.parse(localStorage.getItem('orderProducts'))
    let title = document.getElementById("title")
    title.innerText = `Pedido para la tienda ${order.grocer.grocer_name}`
    let totalAmount = document.getElementById("total_order_amount")

    let generator = document.getElementById('bodyTable')
    generator.innerHTML = ""
    if (products != null) {
        products.map((item_detail, i) => {
            total_amount = total_amount + (item_detail.quantity * item_detail.product_price)
            generator.innerHTML += `
            <tr class="hover">
                <td>
                    <div class="flex items-center space-x-3">
                        <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src="${item_detail.product_image}" alt="Avatar Tailwind CSS Component" />
                        </div>
                        </div>
                        <div>
                        <div class="font-bold">${item_detail.product_name}</div>
                        </div>
                    </div>
                </td>
                <td>
                    ${item_detail.quantity}
                </td>
                <td>${item_detail.product_price}</td>
                <td>${item_detail.product_price * item_detail.quantity}</td>
                <th>
                <button id="btnDeleteProduct" class="btn btn-ghost" onclick='deleteProductStorage(${i})'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                </th>
            </tr>`
        }).join("<br>")
    }
    totalAmount.innerText = `Monto total $${total_amount}`
}
loadContent()