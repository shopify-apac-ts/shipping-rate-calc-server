import {json, redirect} from '@shopify/remix-oxygen';

export async function loader({context}) {

  const carrierServiceRegisterUrl = new URL(`${context.env.ONLINESTORE_URL}/admin/api/2023-10/carrier_services.json`);
  console.log("LOADER: carrierServiceListUrl", carrierServiceRegisterUrl.href);

  const access_token = context.env.SHIPPNG_RATE_CALC_ACCESS_TOKEN;
  //  console.log("LOADER: token", access_token);

  const headers = {
    'X-Shopify-Access-Token': `${access_token}`,
  };
  console.log("headers", headers);

  const response = await fetch(carrierServiceRegisterUrl, {
    method: 'GET',
    headers,
  });
  const responseJson = await response.json();
  console.log("response", responseJson);

  return json(responseJson, {status: 200});
}

