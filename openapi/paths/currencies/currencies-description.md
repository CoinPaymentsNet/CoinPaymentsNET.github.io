In order to perform most API requests regarding payment/wallet management, the merchant has to provide a currency ID in 
the request. CoinPayments exposes currencies API endpoints allowing merchants to view the list of available 
cryptocurrencies in the system and learn about their details and capabilities.

Each currency supported by CoinPayments has a specific ID assigned to it. Besides, CoinPayments supports both native 
coins and tokens. In order to allow managing tokens of the same blockchain, CoinPayments API contains information on
both - ID of the coin blockchain, where token belongs, and the smart contract address of the token. This information is
returned in the format 'coinID:smartContract'. For example, if ID of ETH is "35", then for ERC20 USDT it would be 
"35:0x55d398326f99059ff775485246999027b3197955".

Currency IDs are used for creating and listing merchant wallets. When creating a wallet, if only native currency ID is 
specified, the wallet is created for the same native currency. In case a wallet for the token is required, merchant
must additionally indicate the token contract address when creating a wallet. See [Create Wallet](/#operation/createMerchantWallet).

Also, currency IDs and contract addresses are used when creating transactions from a merchant wallet. For example, the 
body of the spend request specifically indicates the "toCurrency" ID and "from" and "to" contract addresses. This allows
CoinPayments to indicate whether the said transaction is a regular withdrawal of funds or a transaction that additionally 
requires conversion. See [Spend Request](/#operation/sendSpendRequest).

Below, you will find the detailed information on currency-related endpoints and their field values.

