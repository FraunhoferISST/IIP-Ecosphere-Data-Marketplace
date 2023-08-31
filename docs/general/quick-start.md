# Quick Start 

>This page summarizes the basic concepts and workflows of the IIP-Ecosphere Data Marketplace

The IIP-Ecosphere Data Marketplace consists of three main components that expose interfaces to their users:

- __Admin application__: The Admin application is a browser application used by the marketplace administrator. 
The Admin UI allows to manage the digital assets and accounts, publish assets to catalog, configure marketplace preferences, process orders, etc.

- __Storefront application__: The Storefront (SF) application is a browser application that exposes the store interface of the marketplace.
Similar to a traditional e-commerce shop, the SF presents the asset catalog where the marketplace customers can browse, find and order the offers.

-__Broker__: The Broker is a browser application that enables the federation of data marketplaces. 
The Broker crawls data offers from registered data marketplaces and provides a unified view of all shared and published data offers.

The following table summarizes the high-level processes for trading data on the IIP Ecosphere Data Marketplace and maps them to the supporting application component.

| Process                               | Responsible   | Admin App | Storefront | Broker | Outside of Data Marketplace |
|---------------------------------------|---------------|-----------|------------|--------|-----------------------------|
| Store creation and configuration      | Data Provider | x         |            | x      |                             |
| Data offer creation                   | Data Provider | x         |            |        |                             |
| Data offer discovery                  | Data Consumer |           | x          | x      |                             |
| Data purchase and retrieval           | Data Consumer |           | x          |        |                             |
| Data order fulifllment                | Data Provider | x         |            |        | x                           |
| Data inquiry creation                 | Data Consumer |           | x          |        |                             |
| Data inquiry response                 | Data Provider |           | x          |        |                             |
| Data inquiry response acceptance      | Data Consumer |           | x          |        |                             |
| Data inquiry fulfillment              | Data Provider |           |            |        | x                           |

## Store creation and configuration

To enable the offering and trading of data assets [a new store has to be created and configured](../admin/store-configuration.md) by an authorized user in the admin application.
This is the first step in every new data marketplace endeavor.
In addition to the store itself, the user also configures elements like contact data and bank account information.
If data offers of a store shall be aggregated by the Broker, this needs to be set up in the respective Broker instance. 

## Data offer creation

To provide a precise and at the same time flexible description of data to be offered, the data marketplace relies on three concepts:
Data Assets serve as abstract descriptions of data that can be purchased.
Variants are collections of data that differ in scope, creation date, or release version.
Distributions are specific representations of a dataset in a unique serialization.
All three concepts need to be described to [create a data offering](../admin/data-offer-creation.md) and enable data users to discover data in a comfortable way.

## Data offer discovery and purchase
Data users [discover and purchase Data Assets](../storefront/purchase-data-assets.md) in the marketplace storefront application.
The storefront application provide means for data search and filter and let users send buy requests by a few clicks.
Data Asset offers may also be discovered in the Broker application

## Data order fulfillment
Data [fulfillment workflows](../admin/fullfil-order.md) including billing and invoicing are supported by the admin app.
However, as the data marketplace does not hold any actual data, data provisioning takes place outside the data marketplace. 

## Data inquiry creation
Data Consumers on the IIP-Ecoshere Data Marketplace are not only limited to select of existing data offerings, but can actively [express their data needs in so-called data inquiries](../storefront/pose-data-inquiries.md).
Data inquiries can then be searched by marketplace users just like data assets.
However, they follow a less strict approach.

## Data inquiry response
Once a matchin data for a data inquiry has been found by a Data Provider, they can [answer to the data inquiry](../storefront/discover-data-inquiries.md) either with a text message or by directly suggesting a data asset offered on the data marketplace. 
While a message is a quick option to get into contact, responding with an offered data asset is recommended, because it will allow for the further support of billing and fulfillment via the data marketplace.

## Data inquiry response acceptance
Potentially several Data Providers may answer to a data inquiry.
To quickly [respond Data Providers](../storefront/discover-data-inquiries.md#accept-data-proposal), Data Consumers can either accept or decline a data offering.

## Data inquiry fulfillment
Just like for regular data offerings, the fulfillment of data inquiries takes place outside the data marketplace. 