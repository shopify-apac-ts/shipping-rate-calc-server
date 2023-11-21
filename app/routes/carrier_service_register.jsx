import {json, redirect} from '@shopify/remix-oxygen';

export async function loader({context}) {

  const carrierServiceRegisterUrl = new URL(`${context.env.ONLINESTORE_URL}/admin/api/2023-10/carrier_services.json`);
  console.log("LOADER: carrierServiceRegisterUrl", carrierServiceRegisterUrl.href);

  const access_token = context.env.SHIPPNG_RATE_CALC_ACCESS_TOKEN;
  //  console.log("LOADER: token", access_token);

  const headers = {
    'X-Shopify-Access-Token': `${access_token}`,
    'Content-Type': 'application/json',
  };
  console.log("headers", headers);

  const body = JSON.stringify({carrier_service:{
    "name": "TEST Shipping Rate Provider",
    "callback_url":`${context.env.CALLBACK_URL}`,
    "service_discovery": true
  }});
  console.log("body", body);

  const response = await fetch(carrierServiceRegisterUrl, {
    method: 'POST',
    headers,
    body,
  });
  const responseJson = await response.json();
  console.log("response", responseJson);

  return json(responseJson, {status: 200});
}

