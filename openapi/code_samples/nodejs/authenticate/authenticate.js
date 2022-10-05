const url = 'https://orion-api.starhermit.com/api/v1/{YOUR_PATH}';
const clientId = 'YOUR_CLIENT_ID';
const clientSecret = 'YOUR_CLIENT_SECRET=';

const method = 'POST';
const date = new Date().toISOString().split('.')[0];

const requestPayload = {
  id: 1,
  label: 'test',
}

const queryString = `\ufeff${method}${url}${clientId}${date}${JSON.stringify(requestPayload)}`;

/** create signature */
const key = CryptoJS.enc.Utf8.parse(clientSecret);
const input = CryptoJS.enc.Utf8.parse(queryString);
const hash = CryptoJS.HmacSHA256(input, key);
const signature = CryptoJS.enc.Base64.stringify(hash);


const headers = {
  'X-CoinPayments-Client': clientId,
  'X-CoinPayments-Timestamp': date,
  'X-CoinPayments-Signature': signature,
};


const axiosOptions = {
  url,
  headers,
  method,
  data: null,
};
const response = await axios.request(axiosOptions);
