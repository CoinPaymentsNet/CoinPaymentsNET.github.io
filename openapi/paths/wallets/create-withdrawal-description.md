The Spend Request API allows users to initiate a withdrawal or a conversion transaction, both features follow a three-step process:

1- **Send spend request**: This request will trigger a response containing a preview of the transaction,
including any applicable fees. The purpose of this step is to allow users to review and verify the information provided,
including the amount and any associated fees before proceeding.

3- **Review transaction details**: Once a spend request is made, the API responds with a unique spendRequestId. This identifier enables users to retrieve the complete transaction details using the "Get Wallet Transaction" endpoint documented above. By doing so, users can perform a thorough review and ensure the accuracy of the transaction information before proceeding further.

3- **Confirm spending funds**: the confirm spending funds endpoint is used to confirm spending funds from the merchant wallet, or to confirm converting funds, it is used to trigger publishing the transaction on the blockchain.

Note: The "spendRequestId" included in the response from the first step.

![markdown file changed](./withdrawal_flow.png)