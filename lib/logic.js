

/**
* A transaction processor function description
* @param {org.quick.auction.Purchase} purchase 
* @transaction
*/
async function purchaseItem(purchase) {
    purchase.item.owner.accountBalance += purchase.newValue;
    purchase.newOwner.accountBalance -= purchase.newValue;
    purchase.item.owner = purchase.newOwner;
    purchase.item.value = purchase.newValue;
    purchase.item.status = "SOLD";
    let assetRegistry = await getAssetRegistry('org.quick.auction.Item');
    await assetRegistry.update(purchase.item);
}