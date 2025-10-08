export let orders = [];

export async function addOrder(order) {
  const response = await fetch("http://127.0.0.1:8000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(order),
  });
  let result = await response.json();
  console.log(result.message);
}

export async function getOrders() {
  const responce = await fetch("http://127.0.0.1:8000/orders");
  orders = await responce.json();
  console.log(orders);
}
