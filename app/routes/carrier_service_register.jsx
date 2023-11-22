import {json, redirect} from '@shopify/remix-oxygen';

export async function loader({context}) {

  const carrierServiceUrl = new URL(`${context.env.ONLINESTORE_URL}/admin/api/${context.env.API_VERSION}/carrier_services.json`);
  console.log("LOADER: carrierServiceRegisterUrl", carrierServiceUrl.href);

  const access_token = context.env.SHIPPNG_RATE_CALC_ACCESS_TOKEN;
  //  console.log("LOADER: token", access_token);

  const headers = {
    'X-Shopify-Access-Token': `${access_token}`,
    'Content-Type': 'application/json',
  };
  console.log("headers", headers);

  const body =  JSON.stringify({
    carrier_service: {
      name: "TEST Shipping Rate Provider",
      callback_url: `${context.env.CALLBACK_URL}`,
      service_discovery: true
    }
  });
  console.log("bodyString", body);

  var response;
  try {
    response = await fetch(carrierServiceUrl, {
      method: 'POST',
      headers,
      body,
    });  
  }
  catch (error) {
    console.log("error", error);
  }
  const responseJson = await response.json();
//  console.log("response", response);
  console.log("responseJason", responseJson);

  return json(responseJson, {status: response.status});
}

