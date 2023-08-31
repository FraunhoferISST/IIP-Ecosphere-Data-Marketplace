import {clientFactory} from "./apiClient.mjs";
import registerMutation from "./registerMutation.mjs";
import loginMutation from "./mutation.mjs";
import createShopMutation from "./createShopMutation.mjs";
import createProductMutation from "./createProductMutation.mjs";
import createProductVariantMutation from "./createProductVariantMutation.mjs";
import updateProductVariantMutation from "./updateProductVariantMutation.mjs";
import publishProductsMutation from "./publishProductsMutation.mjs";
import getPrimaryShopQuery from "./getPrimaryShopQuery.mjs";
import createInquiryMutation from "./createInquiryMutation.mjs";
import createFulfillmentMutation from "./createFulfillmentMutation.mjs";
import { faker } from '@faker-js/faker';

const email = "admin@dev.com";
const password = "123";

const nodes = [
    {
        name: "Main node",
        apiEndpoint: "http://localhost:3000/graphql"
    },
    /*{
        name: "Node1",
        apiEndpoint: "http://localhost:7000/graphql"
    },


    {
        name: "Node2",
        apiEndpoint: "http://localhost:7001/graphql"
    },*/
];

let client;

const register = () => {
    return client.mutate({
        mutation: registerMutation,
        variables: {
            email: email,
            password: password,
        }
    })
        .then(({
                   data: {
                       createUser: {loginResult},
                   },
               }) => {
            return loginResult.tokens.accessToken
        })
}

const login = () => {
    return client.mutate({
        mutation: loginMutation,
        variables: {
            email: email,
            password: password,
        }
    }).then(({data: {authenticate}}) => authenticate.tokens.accessToken)
        .catch(e => {
            console.error(e)
        })
}

const registerOrLogin = async () => {
    let token = "";
    token = await login()
    if (!token) {
        token = await register()
    }
    if (!token) {
        throw "Couldn't acquire token! "
    }
    return token
}

const createShop = (name) => {
    return client.mutate({
        mutation: createShopMutation,
        variables: {
            name: `${name} test shop`,
            type: "primary",
        }
    })
        .then(async ({
                   data: {
                       createShop: {shop},
                   }
               }) => {
            await client.mutate({
                mutation: createFulfillmentMutation,
                variables: {
                    shopId: shop._id,
                }
            })
            return shop
        })
        .catch(async e => {
            if (e?.errors?.[0]?.message === "There may be only one primary shop") {
                const { data } = await client.query({
                    mutation: getPrimaryShopQuery
                })
                return data.primaryShop;
            } else {
                throw e
            }
        })

}

const createAsset = (name, shopId) => {
    return client.mutate({
        mutation: createProductMutation,
        variables: {
            product: {
                title: `${name} test product`,
                images: [faker.image.avatar()],
                description: faker.commerce.productDescription(),
                isPrivate: faker.datatype.boolean(),
                isVisible: true,
            },
            shouldCreateFirstVariant: true,
            shopId
        }
    }).then(
        ({
             data: {
                 createProduct: {product},
             },
         }) => product
    )
}
const createAssetVariant = (shopId) => {
    return client.mutate({
        mutation: createProductVariantMutation,
        variables: {
            productId: "",
            variant: {
                title: "Node test variant",
            },
            shopId
        }
    })
}
const updateAssetVariant = (variantId, name, shopId) => {
    return client.mutate({
        mutation: updateProductVariantMutation,
        variables: {
            variantId,
            variant: {
                title: faker.commerce.productName(),
                attributeLabel: faker.commerce.productAdjective(),
                optionTitle: faker.commerce.productAdjective(),
                images: [faker.image.avatar()],
                assetType: faker.system.fileType(),
                priceModel: {
                    type: "once"
                },
                distributions: [
                    {
                        title: faker.commerce.productName(),
                        type: faker.system.fileType()
                    }
                ],
                isVisible: true,
            },
            shopId
        }
    })
}

const updateAssetVariantPrices = (variantId, shopId) => {
    return client.mutate({
        mutation: updateProductVariantMutation,
        variables: {
            variantId,
            variant: {
                compareAtPrice: parseFloat(faker.finance.amount(1, 100_000)),
                price: parseFloat(faker.finance.amount(1, 100_000))
            },
            shopId
        }
    })
}

const publishAsset = (assetId) => {
    return client.mutate({
        mutation: publishProductsMutation,
        variables: {
            productIds: [assetId],
        }
    })
}

const createInquiry = (name, shopId, accountId) => {
    return client.mutate({
        mutation: createInquiryMutation,
        variables: {
            inquiry: {
                title: `${name}: ${faker.commerce.productName()}`,
                description: faker.commerce.productDescription(),
                useCase: faker.random.words(),
                desiredPricing: faker.commerce.price(),
                expirationDate: faker.date.recent().toISOString(),
                sourceTypes: [...Array(parseInt(faker.random.numeric(1))).keys()].map(faker.system.commonFileType),
                categories: [...Array(parseInt(faker.random.numeric(1))).keys()].map(faker.name.jobTitle),
                published: true,
            },
            accountId,
            shopId
        }
    })
}

(async () => {
    for (const node of nodes) {
        console.log("_________________________________________");
        console.log("Starting Initialized for ", node.name)
        let shopId = "";
        client = clientFactory(node.apiEndpoint)
        const token = await registerOrLogin();
        console.log("Token acquired...")
        client = await clientFactory(node.apiEndpoint, token)
        shopId = (await createShop(node.name))._id
        console.log("Shop created...", shopId)
        console.log("+ Populate with assets +")
        for (const i of [...Array(40).keys()]) {
            const asset = await createAsset(`${node.name} - ${i}:`, shopId);
            console.log("Asset created ...", asset._id)
            const assetVariantId = asset.variants[0]._id
            await updateAssetVariant(assetVariantId, `${node.name} - ${i}:`, shopId)
            console.log("Asset  variant updated ...", assetVariantId)
            await updateAssetVariantPrices(assetVariantId, shopId)
            console.log("Asset variant prices updated ...", assetVariantId)
            await publishAsset(asset._id)
            console.log("Asset published...")
        }
        console.log("+ Populate with inquiries +")
        for (const i of [...Array(20).keys()]) {
            await createInquiry(`${node.name} - ${i}:`, shopId, "fake");
            console.log("Inquiry created ...")
        }
        console.log("Initialized!", node.name)
    }
})().catch(e => {
    console.error(e)
})
