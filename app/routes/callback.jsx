import {json, redirect} from '@shopify/remix-oxygen';


export async function action({request, context}) {

  console.log("/callback ACTION: context", context);
  console.log("/callback ACTION: request", request);
  const requestJson = await request.json();
//  console.log("requestJson", requestJson);
//  console.log("origin", JSON.stringify(requestJson.rate?.origin));
//  console.log("destination", JSON.stringify(requestJson.rate?.destination));
//  console.log("items", JSON.stringify(requestJson.rate?.items));

  // Delivery Date Calculation
  const today = new Date();
  console.log("today", today.toISOString());
  const deliveryDateA_min = today + 5 * 24 * 60 * 60 * 1000; // days later
  const deliveryDateA_max = today + 8 * 24 * 60 * 60 * 1000; // days later
  console.log("deliveryDateA_min", deliveryDateA_min.toISOString());
  console.log("deliveryDateA_max", deliveryDateA_max.toISOString());
  const deliveryDateB_min = today + 15 * 24 * 60 * 60 * 1000; // days later
  const deliveryDateB_max = today + 30 * 24 * 60 * 60 * 1000; // days later

  // Price Calculation
  const items = Object.keys(requestJson.rate?.items).length;
  var total_price = 0;
  console.log("item_count", items);
  for (var i = 0; i < items; i++) {
    console.log("item", JSON.stringify(requestJson.rate?.items[i]));
    total_price += (requestJson.rate?.items[i].price * requestJson.rate?.items[i].quantity);
  }
  console.log("total_price", total_price);
  const shippingPriceA = total_price * 0.3; // 30% of total_price
  const shippingPriceB = total_price * 0.1; // 10% of total_price

  const rates = [ 
    { 
      service_name: "PRIORITY HANDLING - 30%", 
      service_code: "ON", 
      total_price: `${shippingPriceA}`, 
      description: "This is the fastest option by far", 
      currency: "JPY", 
      min_delivery_date: "2023-12-10 14:48:45 +0900", 
      max_delivery_date: "2023-12-20 14:48:45 +0900" 
    }, { 
      service_name: "REGULAR - 10%", 
      service_code: "2D", 
      total_price: `${shippingPriceB}`, 
      currency: "JPY", 
      min_delivery_date: "2023-12-25 14:48:45 +0900", 
      max_delivery_date: "2024-01-10 14:48:45 +0900" 
    } 
  ];

  return json({rates}, {status: 200});
}

export async function loader({context}) {
  console.log("/callback LOADER: context", context);

  const message = {text: "/callback LOADER: OK (no action)"};
  return json({message}, {status: 200});
}