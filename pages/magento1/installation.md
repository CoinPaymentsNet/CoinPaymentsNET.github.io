---
title: CoinPayments Magemto Installation
keywords: installation, magento plugin, coinpayments plugin, coinpayments magento
sidebar: magento1_sidebar
permalink: magento1_installation.html
folder: magento1
---

## Install via magento admin

1. Login to your Magento Admin panel and go to Magento Connect Manager.
After logging in, go to System » Magento Connect » Magento Connect Manager. Enter your login credentials again if requested. 

2. Paste CoinPayments extension URL and install.
In Magento Connect Manager, find the “Paste extension key to install” field, and copy paste the following URL: 
Then, click “Install” followed by “Proceed” and wait for the installation process to complete. Afterwards, click “Return to Admin”. 

3. Locate CoinPayments extension in Payment Methods.
Go to System » Configuration, find the SALES sub-menu and then click on Payment Methods – from there, scroll down and locate “Coinpayments.net”. 

4. Enable and configure the Coinpayments extension for Magento
To enable the CoinPayments extension for Magento, set “Enabled” to “Yes”.
“Title” will appear on your checkout page – edit them as you feel is appropriate.
Enter your API credentials – Merchant ID, IPN secret... You can find this keys in your coinpayments account
If you have not created your API credentials yet, login to your Coinpayments account and create one.
Then, set the Receive Currency parameter to the currency in which you wish to receive your payouts from Coinpayments.
Finally, click “Save Config” at the top right corner of the window.


5. Go to frontend and see how it works! Congratulations – you did it! Your Magento store now has Coinpayments as a payment option at checkout. 

## Install via FTP

1. Download plugin here https://github.com/CoinPaymentsNet/coinpayments-magento;
2. Extract archive and upload to root directory of your Magento store;
3. Login to Admin panel;
4. Go to *System » Configuration*;
5. Click on Payment Methods in *SALES* block;
6. In Payment Methods find and click on Coinpayments. Please note, clear Magento cache if payment method not appeared;
7. Set Enabled to Yes;
8. Enter your API Auth Token (to create your API credentials: login to your Coinpayments account and find it there;
9. Click Save Config.
