---
title: Extension for Magento
keywords: magento, plugin, extension, coinpayments, cryptocurrency, coinpayments magento
sidebar: home_sidebar
permalink: magento1.html
folder: shopping-carts
---
## Overview

Meet the best way to accept cryptocurrency on Magento. With CoinPayments Magento Extension, you will easily integrate your ecommerce store with the popular cryptocurrency gateway accepting over 70 altcoins, including Bitcoin and Ethereum. 

Thus, Magento cryptocurrency trading is no longer an unattainable goal - it is a new way of business dealing.

With the CoinPayments Cryptocurrency Extension for Magento, you can not only accept altcoins on your Magento website, but also store cryptocurrency in a secure online wallet as well as protect altcoins in the vault that requires a time amount before being able to spend them. Almost 400 thousand vendors all over the world already use CoinPayments, so don't waste your chance to implement the new technology on your ecommerce storefront with the CoinPayments Magento extension.

## Before you start

Create account on coinpayments.org and start accepting Bitcoins, or any other form 100s available crypto currencies on your site or game. <a alt='register on .org' href='https://www.coinpayments.net/register'>Register</a>. After registration you would automatically have Mercahnt account. 
Create your API keys pair:
![api]({{ site.url }}/images/API.png)  
and add deposit addresses for all coints you would like to accept:
![coins_deposit]({{ site.url }}/images/receiveCoins1.png) 
![coins_deposit]({{ site.url }}/images/receiveCoins2.png) 

## Installation

You can install our extension it two ways:

### Install via magento admin

1. Login to your Magento Admin panel and go to Magento Connect Manager.
After logging in, go to System » Magento Connect » Magento Connect Manager. Enter your login credentials again if requested. 

2. Paste CoinPayments extension URL and install.
In Magento Connect Manager, find the “Paste extension key to install” field, and copy paste the following URL: 
Then, click “Install” followed by “Proceed” and wait for the installation process to be completed. Afterwards, click “Return to Admin”. 

### Install via FTP

1. Download plugin here https://github.com/CoinPaymentsNet/coinpayments-magento;

2. Extract archive and upload to root directory of your Magento store;

3. Flush Magento Cache:
  - login as an admin
  - go to System » Cache Management
  - Click 'Flush Magento Cache'
  ![cache]({{ site.url }}/images/magento1_flush_cache.png)

## Setup

1. Login to Magento Admin panel 

2. Locate CoinPayments extension in Payment Methods.
Go to System » Configuration, find the SALES sub-menu and then click on Payment Methods – from there, scroll down and locate “Coinpayments.net”. 
![config]({{ site.url }}/images/magento1_configuration.png)  

3. Enable and configure the Coinpayments extension for Magento
To enable the CoinPayments extension for Magento, set “Enabled” to “Yes”.

Then set up all required settings:
  1. 'Direct Mode' defines how payment will be done (see 'User Experience' section below for details on every option)
  2. Settings: Merchant ID, Public Key, Private Key, IPN secret, links your coinpayments account to the store. And IPN Debug email allows to receive IPN errors if any on email. You may find these parameters in  your coinpayments account registered as shown below.
  ![coinpayments_merchant]({{ site.url }}/images/coinpayments_merchant1.png)  
  ![coinpayments_merchant]({{ site.url }}/images/coinpayments_merchant2.png)  
  3. Field 'Sort Order' is used only in case if you want to use different payment methods on your site for ordering them for the user.

Finally, click “Save Config” at the top right corner of the window.


4. Go to frontend and see how it works! Congratulations – you did it! Your Magento store now has Coinpayments as a payment option at checkout. 

## User Experience

After adding and setting up the plugin users of the site will see coinpayments as a payment method that allows to pay with cryptocurrencies:

![coinpayments_merchant]({{ site.url }}/images/paymentSelection.png)

Once user has selected the coin, the price in this coin will be displayed.
Further user experience could be done with 'Direct Mode' i.e. payment directly on the site. Or with redirect to CoinPayments site for payment there.
### Direct Payment 
If direct mode is selected in admin, then payment will be initiated via API and user will be able to pay without redirect to Coinpyaments site using QR code shown on confirmation screen or using mobile app.   
![coinpayments_merchant]({{ site.url }}/images/direct.png)

### Payment with Redirect
If direct mode is not selected in admin, then user will be will be redirected to Coinpayment.net for payment:
![coinpayments_merchant]({{ site.url }}/images/redirect1.png)
![coinpayments_merchant]({{ site.url }}/images/redirect2.png)
## Demo

You can try live demo here ...
