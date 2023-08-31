# Broker specification

The Broker acts as the central instance between multiple deployed Marketplace instances (Nodes) and allows to coordinate 
distributed access to the offered digital assets

Broker: specification:

+ Broker is a stateless SSR application
+ Broker keeps a list of the know Nodes including information about on which URL's the Node's API and the Node's storefronts are accessible over the internet
+ To list the offered Assets, Broker aggregates offers from the known Nodes
  
  Broker doesn't store any data. The search request a just propagate to known Nodes and the results are aggregated. While aggregating,
  the assets are enriched with the information about their origin (Shop they belong to, Assets details URL, etc. )

+ Broker doesn't implement shopping-related functionality. It only list the known Asset offers, for the actual purchase the
  customer will be redirected to the Node that is offering the Asset to process with the purchase ore see the offer details
+ By default, only the assets with public assets are listed
+ To list offers with restricted assets, Broker can authenticate a user

  Broker doesn't implement any authentication/authorization Methods. The user can log in to the known Node. Broker propagates
  the log in request to corresponding Node and stores required sessions information (token) to authenticate subsequent requests
+ On the search request to the known Nodes, Broker must provide authenticated user email, token and the information about itself, so that each Node can
  check if the user is authorized to access particular assets and that the request is originating from the trusted Broker
+ Broker should provide a Endpoint where the participating Nodes ca verify that the request is originating from this Node

  Especially on this endpoint should be verified that the account comes from a Node, that is known to this Broker

Nodes specification:

+ Nodes are independent from the Broker and operate their own IAM and asset management

  That means  Nodes can create Accounts and Asset on it's own

+ Nodes manage the list of know Brokers where they're participating

  Broker should know its participants. Node should know where it is participating. To prevent abuse.

+ Nodes manage access to the individual Asset 
 
  Only publicly visible Asset can be discovered from every one. For the other assets, a Node should verify, that User (Account) has 
  permissions to access an asset. The User (Account) should be listed under the accounts with the permission to access particular asset. Also it 
  must be verified that the request is coming from the Broker that is known to the Node. To distinguish a Broker request from the request originating in Node's shop,
  the Node checks, if an account belongs to it.

+ To prohibit/permit the access to a particular asset, a Node holds a prohibit/permission list for each offered asset with an account email

  There is no other way to identify an account as it's not possible to list accounts from the participating Nodes
