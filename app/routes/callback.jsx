import {json, redirect} from '@shopify/remix-oxygen';


export async function action({request, context}) {

  console.log("/callback ACTION: context", context);
  console.log("/callback ACTION: request", request);
  const requestJson = await request.json();
//  console.log("requestJson", requestJson);
//  console.log("origin", JSON.stringify(requestJson.rate?.origin));
//  console.log("destination", JSON.stringify(requestJson.rate?.destination));
//  console.log("items", JSON.stringify(requestJson.rate?.items));

  const items = Object.keys(requestJson.rate?.items).length;
  var total_price = 0;
  console.log("item_count", items);
  for (var i = 0; i < items; i++) {
    console.log("item", JSON.stringify(requestJson.rate?.items[i]));
    total_price += (requestJson.rate?.items[i].price * requestJson.rate?.items[i].quantity);
  }
  console.log("total_price", total_price);
  const shippingPriceA = total_price * 0.2; // 20% of total_price
  const shippingPriceB = total_price * 0.1; // 10% of total_price

  const rates = [ 
    { 
      service_name: "canadapost-air", 
      service_code: "ON", 
      total_price: `${shippingPriceA}`, 
      description: "This is the fastest option by far", 
      currency: "JPY", 
      min_delivery_date: "2023-12-10 14:48:45 +0900", 
      max_delivery_date: "2023-12-20 14:48:45 +0900" 
    }, { 
      service_name: "fedex-ground", 
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