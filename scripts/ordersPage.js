import {orders} from '../data/orders.js';
import {products, loadProducts} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import formatCurrency from './utils/money.js';
import {addToCart} from '../data/cart.js';

console.log(orders);

loadProducts(renderOrdersPage)

function renderOrdersPage() {
    let orderPageHTML = '';
    console.log(products);
    orders.forEach((order) => {
        let productsHTML = '';
        (order.products).forEach((detail) => {
            let detailIMG;
            let detailName;
            products.forEach((product) => {
                if (detail.productId === product.id) {
                    return detailIMG = product.image,
                    detailName = product.name;
                }
            });
            productsHTML += `
                <div class="product-image-container">
                <img src="${detailIMG}">
                </div>

                <div class="product-details">
                <div class="product-name">
                    ${detailName}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${dayjs(detail.estimatedDeliveryTime).format('MMMM D')}
                </div>
                <div class="product-quantity">
                    Quantity: ${detail.quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again" data-detail-id="${detail.productId}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
                </div>

                <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&detailProductId=${detail.productId}">
                    <button class="track-package-button button-secondary">
                    Track package
                    </button>
                </a>
                </div>`
        });
        orderPageHTML += `
            <div class="order-container">
            
            <div class="order-header">
                <div class="order-header-left-section">
                <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${dayjs(order.orderTime).format('MMMM D')}</div>
                </div>
                <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatCurrency(order.totalCostCents)}</div>
                </div>
                </div>

                <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
                </div>
            </div>

            <div class="order-details-grid">
                ${productsHTML}
            </div>
            </div>`;
    });

    document.querySelector('.js-orders-grid').innerHTML = orderPageHTML;

    document.querySelectorAll('.js-buy-again')
    .forEach((button) => {
      button.addEventListener('click', () => {
        console.log(button.dataset.detailId)
        const detailId = button.dataset.detailId;
        addToCart(detailId);
      });
    });
}

