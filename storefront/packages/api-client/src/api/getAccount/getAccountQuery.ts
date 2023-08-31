import {gql} from "@apollo/client/core";

export default gql`
    query account{
        viewer {
            _id
            userId
            username
            picture
            createdAt
            firstName
            lastName
            language
            name
            note
            preferences
            primaryEmailAddress
            updatedAt
            metafields {
                value
                key
                scope
                valueType
                description
                namespace
            }
            emailRecords {
                address
                verified
                provides
            }
            groups {
                nodes {
                    _id
                    description
                    updatedAt
                    createdAt
                    createdBy {
                        _id
                        userId
                        username
                    }
                    description
                    permissions
                }
            }
            addressBook {
                nodes {
                    _id
                    address1
                    address2
                    city
                    company
                    country
                    firstName
                    lastName
                    fullName
                    isBillingDefault
                    isShippingDefault
                    phone
                    postal
                    region
                    company
                }
            }
        }
    }`;
