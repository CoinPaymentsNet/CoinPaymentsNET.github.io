---
title: CoinPayments Magemto Installation
keywords: installation, magento plugin, coinpayments plugin, coinpayments magento
sidebar: magento1_sidebar
permalink: magento1_installation.html
folder: magento1
---

## Download

Download latest code from <a href="https://github.com/CoinPaymentsNet/coinpayments-magento">CoinPayments Magento GitHub</a>


## Installation



# Create backups of your web directory and Magento store database;
# Download  CoinPayments Magento Extension installation package;
Unzip (extract from zip archive) file and copy to /app/code/Firebear/CoinPayments/ folder (create it manually!)
Navigate to your store root folder in the SSH console of your server:

cd path_to_the_store_root_folder

And run the following commands:

php -f bin/magento module:enable Firebear_CoinPayments
php -f bin/magento setup:upgrade

Now, you have to flush store cache; log out from your backend and login once again. Use the following command:
php -f bin/magento cache:clean


Congratulations! The Firebear CoinPayments Magento 2 Bitcoin/Ethereum/Altcoin module is successfully installed. Now, you should configure your new Magento 2 cryptocurrency payment gateway.
