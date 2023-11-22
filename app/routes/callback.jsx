import {json, redirect} from '@shopify/remix-oxygen';


export async function action({request, context}) {

  console.log("/callback ACTION: context", context);
  console.log("/callback ACTION: request", request);

  const requestJson = await request.json();
  console.log("origin", JSON.stringify(requestJson.rate?.origin));
  console.log("destination", JSON.stringify(requestJson.rate?.destination));

  // Delivery Date Calculation
  const today = Date.now();
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  // Price Calculation
  const items = Object.keys(requestJson.rate?.items).length;
  var total_price = 0;
  for (var i = 0; i < items; i++) {
    console.log("item", JSON.stringify(requestJson.rate?.items[i]));
    total_price += (requestJson.rate?.items[i].price * requestJson.rate?.items[i].quantity);
  }
  console.log("total_price", total_price);

  const rates = [ 
    { 
      service_name: "PRIORITY HANDLING - 30%", 
      service_code: "ON", 
      total_price: `${total_price * 0.3}`,  // 30% of total_price
      description: "This is the fastest option by far", 
      currency: "JPY", 
      min_delivery_date: `${new Date(today + 2 * oneDay).toISOString()}`, 
      max_delivery_date: `${new Date(today + 5 * oneDay).toISOString()}` 
//      min_delivery_date: "2023-12-10T14:48:45.123Z", 
//      max_delivery_date: "2023-12-20T14:48:45.123Z" 
    }, { 
      service_name: "REGULAR - 10%", 
      service_code: "2D", 
      total_price: `${total_price * 0.1}`,  // 10% of total_price
      currency: "JPY", 
      min_delivery_date: `${new Date(today + 15 * oneDay).toISOString()}`, 
      max_delivery_date: `${new Date(today + 20 * oneDay).toISOString()}` 
//      min_delivery_date: "2023-12-25 14:48:45 +0900", 
//      max_delivery_date: "2024-01-10 14:48:45 +0900" 
    } 
  ];

  return json({rates}, {status: 200});
}

export async function loader({context}) {
  console.log("/callback LOADER: context", context);

  const message = {text: "/callback LOADER: OK (no action)"};
  return json({message}, {status: 200});
}