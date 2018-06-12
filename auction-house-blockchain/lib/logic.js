/**
* Demo mode for auction house. Creates items and participants
* @param {org.quick.auction.demoMode} demoMode
* @transaction
*/

function demoMode(demoMode) {
    var factory = getFactory();
    var nameSpace = 'org.quick.auction';

    //create auctioner
    var auctioner = factory.newResource(nameSpace, 'Auctioner', 'auctioner@email.com');
    auctioner.name = "John Doe";
    auctioner.itemForBid = null;
    auctioner.currentValueOfItemForBid = null;

    //create item
    var item1 = factory.newResource(nameSpace, 'Item', '12345');
    item1.name = "Ancient Vase";
    item1.value = 75;
    item1.status = 'NEW';
    item1.owner = factory.newRelationship(nameSpace, 'Seller', 'seller@email.com');

    var item2 = factory.newResource(nameSpace, 'Item', '54321');
    item2.name = "Fancy rug";
    item2.value = 100;
    item2.status = 'NEW';
    item2.owner = factory.newRelationship(nameSpace, 'Buyer', 'buyer@email.com');

    // create seller
    var seller = factory.newResource(nameSpace, 'Seller', 'seller@email.com');
    var sellerAddress = factory.newConcept(nameSpace, 'Address');
    sellerAddress.street = '1234 Kappa'
    sellerAddress.city = 'Fairfax';
    sellerAddress.state = 'VA';
    sellerAddress.zip = '20740';

    var buyer_pinf = factory.newResource(nameSpace, 'PrivateInfo', "buyer@email.com");
    var seller_pinf = factory.newResource(nameSpace, 'PrivateInfo', "seller@email.com");
    buyer_pinf.accountBalance = 200;
    seller_pinf.accountBalance = 200;

    seller.name = 'Jane Smith';
    seller.address = sellerAddress;
    seller.pinf = seller_pinf;
    seller.itemsOwned = [item1];

    //create buyer
    var buyer = factory.newResource(nameSpace, 'Buyer', 'buyer@email.com');
    var buyerAddress = factory.newConcept(nameSpace, 'Address');
    buyerAddress.street = '1234 Kappa'
    buyerAddress.city = 'Fairfax';
    buyerAddress.state = 'VA';
    buyerAddress.zip = '20740'
    buyer.name = 'Plane Jane'
    buyer.address = buyerAddress;
    buyer.pinf = buyer_pinf;
    buyer.itemsOwned = [item2];


    //create contract
    var contract = factory.newResource(nameSpace, 'Contract', 'CON_001');
    contract.seller = factory.newRelationship(nameSpace, 'Seller', 'seller@email.com');
    contract.buyer = factory.newRelationship(nameSpace, 'Buyer', 'buyer@email.com');
    contract.auctioner = factory.newRelationship(nameSpace, 'Auctioner', 'auctioner@email.com');
    contract.transactionDate = demoMode.timestamp;

    // execute demo
    return getParticipantRegistry(nameSpace + '.Buyer')
        .then(function (buyerRegistry) {
            return buyerRegistry.addAll([buyer]);
        })
        .then(function () {
            return getParticipantRegistry(nameSpace + '.Seller');

        })
        .then(function (sellerRegistry) {
            return sellerRegistry.addAll([seller]);
        })
        .then(function () {
            return getParticipantRegistry(nameSpace + '.Auctioner');

        })
        .then(function (auctionerRegistry) {
            return auctionerRegistry.addAll([auctioner]);
        })
        .then(function () {
            return getAssetRegistry(nameSpace + '.Item');

        })
        .then(function (itemRegistry) {
            return itemRegistry.addAll([item1, item2]);
        })
        .then(function () {
            return getAssetRegistry(nameSpace + '.PrivateInfo');

        })
        .then(function (privRegistry) {
            return privRegistry.addAll([buyer_pinf, seller_pinf]);
        });
}

/**
* Buyer obtains item from seller
* @param {org.quick.auction.Purchase} purchase 
* @transaction
*/
async function purchaseItem(purchase) {
    purchase.seller.pinf.accountBalance += purchase.newValue;
    purchase.newOwner.pinf.accountBalance -= purchase.newValue;
    purchase.seller.itemsOwned.splice(purchase.seller.itemsOwned.indexOf(purchase.item), 1);
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
async function requestAuction(request) {
    request.item.status = "BEING_AUCTIONED";
    request.auctioner.itemForBid = request.item;
    request.auctioner.currentValueOfItemForBid = request.item.value;
    request.item.marketValue = request.auctioner.currentValueOfItemForBid;
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
async function requestBid(bid) {
    if (bid.bidAmount > bid.auctioner.currentValueOfItemForBid) {
        bid.auctioner.currentValueOfItemForBid = bid.bidAmount;
        bid.auctioner.highestBidder = bid.bidder;
        bid.item.marketValue = bid.bidAmount;
        let aucRegistry = await getParticipantRegistry('org.quick.auction.Auctioner');
        await aucRegistry.update(bid.auctioner);
        let itemRegistry = await getAssetRegistry('org.quick.auction.Item');
        await itemRegistry.update(bid.item);
    }
}

/* TODO: Create a contract between buyer and seller
 */

var contractNum = 0;
/**
* Seller accepts bid
* @param {org.quick.auction.AcceptBid} purchase 
* @transaction
*/
async function acceptBid(purchase) {
    var buyer = purchase.auctioner.highestBidder;
    var newVal = purchase.auctioner.currentValueOfItemForBid;
    purchase.seller.pinf.accountBalance += newVal;
    buyer.pinf.accountBalance -= newVal;
    purchase.seller.itemsOwned.splice(purchase.seller.itemsOwned.indexOf(purchase.item), 1);
    buyer.itemsOwned.push(purchase.item);
    purchase.item.owner = buyer;
    purchase.item.value = newVal;
    purchase.item.status = "SOLD";



    let assetRegistry = await getAssetRegistry('org.quick.auction.Item');
    await assetRegistry.update(purchase.item);
    let buyerRegistry = await getParticipantRegistry('org.quick.auction.Buyer');
    await buyerRegistry.update(buyer);
    let sellerRegistry = await getParticipantRegistry('org.quick.auction.Seller');
    await sellerRegistry.update(purchase.seller);

    purchase.auctioner.itemForBid = null;
    purchase.auctioner.currentValueOfItemForBid = 0;
    purchase.auctioner.highestBidder = null;

    let aucRegistry = await getParticipantRegistry('org.quick.auction.Auctioner');
    await aucRegistry.update(purchase.auctioner);
}

/**
* Add a business
* @param {org.quick.auction.AddBusiness} business 
* @transaction
*/
function addBusiness(business) {
    var nameSpace = 'org.quick.auction';
    var factory = getFactory();

    var address = factory.newConcept(nameSpace, 'Address');
    address = business.address;

    var pinf = factory.newResource(nameSpace, 'PrivateInfo', business.email);
    pinf.accountBalance = business.accountBalance;

    var biz = factory.newResource(nameSpace, business.status, business.email);
    biz.name = business.name;
    biz.address = address;
    biz.pinf = pinf;

    return getAssetRegistry('org.quick.auction.PrivateInfo')
        .then(function (privRegistry) {
            return privRegistry.addAll([pinf]);
        })
        .then(function () {
            return getParticipantRegistry(nameSpace + '.' + business.status)
        })
        .then(function (businessRegistry) {
            return businessRegistry.addAll([biz]);
        });

}

/**
* Add an item
* @param {org.quick.auction.AddItem} newItem 
* @transaction
*/
function addItem(newItem) {
    var nameSpace = 'org.quick.auction';
    var factory = getFactory();


    var item = factory.newResource(nameSpace, "Item", newItem.itemId);
    item.name = newItem.name;
    item.owner = newItem.owner;
    item.value = newItem.value;
    item.marketValue = item.value;
    item.status = 'NEW';

    newItem.owner.itemsOwned.push(item);

    return getAssetRegistry('org.quick.auction.Item')
        .then(function (itemReg) {
            return itemReg.addAll([item]);
        })
        .then(function () {
            return getParticipantRegistry(nameSpace + '.Seller')
        })
        .then(function (sellerReg) {
            return sellerReg.update(newItem.owner);
        });

}

/**
* Allow/deny a business access to own private info
* @param {org.quick.auction.ChangeAccess} allowaccess 
* @transaction
*/
/*
function ChangeAccess(allowaccess){
  if(!allowaccess.recipient.accessibleInfo){
    allowaccess.recipient.accessibleInfo = [];
  }
    if(permission.equals("allow")){
        allowaccess.recipient.accessibleInfo.push(allowaccess.owner.pinf);
    } else{
        allowaccess.recipient.accessibleInfo.splice(allowaccess.recipient.accessibleInfo.indexOf(allowaccess.owner.pinf),1);
    }
    let businessRegistry = getParticipantRegistry('org.quick.auction.Business');
    businessRegistry.update(allowaccess.recipient);
}
*/