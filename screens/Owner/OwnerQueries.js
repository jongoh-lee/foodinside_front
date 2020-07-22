import gql from "graphql-tag";

export const MY_SHOP = gql`
    query myShop {
        myShop{
            id
            location
            registration
            classification
            ownerState
            contact
            shopImages{
                id
                type
                url
            }
        }
    }
`;

export const CHECK_SHOP = gql`
    query myShop {
        myShop{
            id
            ownerState
        }
    }
`;

export const ENROLL_SHOP = gql`
    mutation enrollShop(
        $shopImages: [CreateShopImage!]!
        $location: String!
        $registration: String!
        $classification: String!
        $contact: String!
        $ownerState: Int!
    ) {
        enrollShop(
            shopImages:$shopImages
            location:$location
            registration:$registration
            classification:$classification
            contact:$contact
            ownerState:$ownerState
        ) {
            id
            location
            registration
            classification
            contact
            ownerState
        }
    }
`;

export const EDIT_ENROLL_SHOP = gql`
    mutation editEnrollShop(
        $shopImages: [EditShopImage!]!
        $location: String!
        $registration: String!
        $classification: String!
        $contact: String!
        $ownerState: Int!
    ) {
        editEnrollShop(
            shopImages:$shopImages
            location:$location
            registration:$registration
            classification:$classification
            contact:$contact
            ownerState:$ownerState
        ) {
            id
            location
            registration
            classification
            contact
            ownerState
            shopImages{
                id
                type
                url
            }
        }
    }
`;
        