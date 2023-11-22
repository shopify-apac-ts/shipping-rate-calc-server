import {json, redirect} from '@shopify/remix-oxygen';

export async function action({request, context}) {
  const {session, storefront} = context;

//  if (request.method !== 'POST') {
//    return json({error: 'Method not allowed'}, {status: 405});
//  }

  const body = await request.formData();
  console.log("/callback ACTION: request", request);
  console.log("body", body);

  const shippingRates = { 
    "rates": [ { 
      "service_name": "canadapost-overnight", 
      "service_code": "ON", 
      "total_price": "129500", 
      "description": "This is the fastest option by far", 
      "currency": "JPY", 
      "min_delivery_date": "2023-12-01 14:48:45 +0900", 
      "max_delivery_date": "2023-12-10 14:48:45 +0900" 
    }, { 
      "service_name": "fedex-2dayground", 
      "service_code": "2D", 
      "total_price": "293400", 
      "currency": "JPY", 
      "min_delivery_date": "2023-12-05 14:48:45 +0900", 
      "max_delivery_date": "2023-12-20 14:48:45 +0900" } ] 
    };

  return json({shippingRates}, {status: 200});
}

export async function loader({request, context}) {

  console.log("/callback LOADER: context", context);

//  const body = await request.formData();
  console.log("/callback ACTION: request", request);
//  console.log("body", body);

  const loaderResponse = {"message": "loader handled this request"};
  return json(loaderResponse, {status: 200});
}
