The Spend Request API allows users to initiate a withdrawal or a conversion transaction, both features follow a two-step process:

1- **Send spend request**: This request will trigger a response containing a preview of the transaction,
including any applicable fees. The purpose of this step is to allow users to review and verify the information provided,
including the amount and any associated fees before proceeding.

2- **Confirm spending funds**: the confirm spending funds endpoint is used to confirm spending funds from the merchant wallet, or to confirm converting funds. It is used to trigger publishing the transaction on the blockchain.


Note: The "spendRequestId", used to confirm spending funds, is available in the response from the first step.


<br/>
<br/>

Here's a simplified flowchart explaining the withdrawal/conversion flow:

![markdown file changed](./withdrawal-flowchart.png)
