Creating withdrawal is a two-step process:

1- **Send a withdrawal request**: This request will trigger a response containing a preview of the transaction,
including any applicable fees. The purpose of this step is to allow users to review and verify the information provided,
including the amount and any associated fees before proceeding.

2- **Confirm withdrawal**: This step is pretty straightforward, the confirm withdrawal endpoint takes the "spendRequestId"
as a URL param to identify, confirm and publish the transaction.
Note: The "spendRequestId" included in the response from the first step.

![markdown file changed](./mermaid-withdrawal-svg.svg)