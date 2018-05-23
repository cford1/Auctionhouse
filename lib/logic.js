

/**
* Buyer obtains item from seller
* @param {org.quick.auction.Purchase} purchase 
* @transaction
*/
async function purchaseItem(purchase) {
    purchase.seller.accountBalance += purchase.newValue;
    purchase.newOwner.accountBalance -= purchase.newValue;
    purchase.seller.itemsOwned.splice(purchase.seller.itemsOwned.indexOf(purchase.item),1);
    purchase.newOwner.itemsOwned.push(purchase.item);
    purchase.item.owner = purchase.newOwner;
    purchase.item.value = purchase.newValue;
    purchase.item.status = "SOLD";
    let assetRegistry = await getAssetRegistry('org.quick.auction.Item');
    await assetRegistry.update(purchase.item);
    let buyerRegistry = await getParticipantRegistry('org.quick.auction.Buyer');
  	await buyerRegistry.update(purchase.newOwner);
  	let sellerRegistry = await getParticipantRegistry('org.quick.auction.Seller');
  	await sellerRegistry.update(purchase.seller);
}

/**
* Seller puts item up for auction
* @param {org.quick.auction.RequestAuction} request 
* @transaction
*/
async function requestAuction(request){
    request.item.status = "BEING_AUCTIONED";
    request.auctioner.itemForBid = request.item;
    request.auctioner.currentValueOfItemForBid = request.item.value;
    let assetRegistry = await getAssetRegistry('org.quick.auction.Item');
    await assetRegistry.update(request.item);
    let aucRegistry = await getParticipantRegistry('org.quick.auction.Auctioner');
  	await aucRegistry.update(request.auctioner);
}

/**
* Buyer bids on an item
* @param {org.quick.auction.Bid} bid 
* @transaction
*/
async function requestBid(bid){
    bid.auctioner.currentValueOfItemForBid = bid.bidAmount;    
    let aucRegistry = await getParticipantRegistry('org.quick.auction.Auctioner');
  	await aucRegistry.update(bid.auctioner);
}

/**
* Seller accepts bid
* @param {org.quick.auction.AcceptBid} purchase 
* @transaction
*/
async function acceptBid(purchase){
    var newVal = purchase.auctioner.currentValueOfItemForBid;
    purchase.seller.accountBalance += newVal;
    purchase.buyer.accountBalance -= newVal;
    purchase.seller.itemsOwned.splice(purchase.seller.itemsOwned.indexOf(purchase.item),1);
    purchase.buyer.itemsOwned.push(purchase.item);
    purchase.item.owner = purchase.buyer;
    purchase.item.value = newVal;
    purchase.item.status = "SOLD";
    let assetRegistry = await getAssetRegistry('org.quick.auction.Item');
    await assetRegistry.update(purchase.item);
    let buyerRegistry = await getParticipantRegistry('org.quick.auction.Buyer');
  	await buyerRegistry.update(purchase.buyer);
  	let sellerRegistry = await getParticipantRegistry('org.quick.auction.Seller');
    await sellerRegistry.update(purchase.seller);
    let aucRegistry = await getParticipantRegistry('org.quick.auction.Auctioner');
  	await aucRegistry.update(purchase.auctioner);
}