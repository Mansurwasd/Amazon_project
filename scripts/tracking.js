import { orders, getOrders } from "../data/orders.js";
import { products, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get("orderId");
const detailProductId = url.searchParams.get("detailProductId");

let trackingQuantity = "";
let trackingEstimatedDeliveryTime = "";
let orderTime = "";
let deliveryTime = "";

loadPreps();

async function loadPreps() {
  await getOrders();
  renderTrackingPage();
}

function renderTrackingPage() {
  orders.forEach((order) => {
    if (order.orderId === orderId) {
      orderTime = dayjs(order.placingDate);
      order.products.forEach((detail) => {
        if (detail.productId === detailProductId) {
          trackingQuantity = detail.quantity;
          deliveryTime = dayjs(detail.deliveryDate);
          trackingEstimatedDeliveryTime = dayjs(detail.deliveryDate).format(
            "dddd, MMMM D",
          );
        }
      });
    }
  });

  let trackingIMG;
  let trackingName;

  const currentTime = dayjs();
  const greenBar =
    ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;

  async function generateTrackingPage() {
    await loadProductsFetch();
    products.forEach((product) => {
      if (product.id === detailProductId) {
        return ((trackingIMG = product.image), (trackingName = product.name));
      }
    });

    document.querySelector(".order-tracking").innerHTML = `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${trackingEstimatedDeliveryTime}
        </div>

        <div class="product-info">
          ${trackingName}
        </div>

        <div class="product-info">
          Quantity: ${trackingQuantity}
        </div>

        <img class="product-image" src="${trackingIMG}">

        <div class="progress-labels-container">
          <div class="progress-label js-preparing">
            Preparing
          </div>
          <div class="progress-label js-shipped">
            Shipped
          </div>
          <div class="progress-label js-delivered">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${greenBar}%"></div>
        </div>`;

    if (greenBar <= 49) {
      document.querySelector(".js-preparing").classList.add("current-status");
    } else if (greenBar >= 50 && greenBar <= 99) {
      document.querySelector(".js-shipped").classList.add("current-status");
    } else {
      document.querySelector(".js-delivered").classList.add("current-status");
    }
  }

  generateTrackingPage();
}
