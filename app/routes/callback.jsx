import {json, redirect} from '@shopify/remix-oxygen';


export async function action({request, context}) {

  console.log("/callback ACTION: context", context);
  console.log("/callback ACTION: request", request);

//  const formData = await request.formData();
//  console.log("data", formData);
  const requestJson = await request.json();
//  console.log("requestJson", requestJson);
  console.log("origin", JSON.stringify(requestJson.rate?.origin));
  console.log("destination", JSON.stringify(requestJson.rate?.destination));
  console.log("items", JSON.stringify(requestJson.rate?.items));

  let total_price = 0;
  const items = requestJson.rate?.items;
  if (items === null) {
    console.log("items is null");
  }
  else {
    for (price in items) {
      total_price += price;
    }
  }
  console.log("price", total_price);

  const rates = [ 
    { 
      service_name: "canadapost-air", 
      service_code: "ON", 
      total_price: "129500", 
      description: "This is the fastest option by far", 
      currency: "JPY", 
      min_delivery_date: "2023-12-10 14:48:45 +0900", 
      max_delivery_date: "2023-12-20 14:48:45 +0900" 
    }, { 
      service_name: "fedex-ground", 
      service_code: "2D", 
      total_price: "293400", 
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