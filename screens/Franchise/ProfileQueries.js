import gql from "graphql-tag";
import { PROFILE_FRAGMENT, OWNER_FRAGMENT, POST_FRAGMENT } from "../../fragments";

export const CREATE_PROFILE = gql`
    mutation createProfile($menuImage:String!, $menuName:String!, $salePrice:Int!, $foodGuide:String!, $career:String!, $contact:String!, $profileState:Int!, $classification:String!) {
        createProfile(menuImage: $menuImage, menuName: $menuName, salePrice: $salePrice, foodGuide: $foodGuide, career: $career, contact: $contact, profileState:$profileState, classification:$classification) {
            ...ProfileParts
        }
    }
    ${PROFILE_FRAGMENT}
`;

export const COMPLETE_PROFILE = gql`
    mutation completeProfile(
        $release: Boolean!
        $profileName:String!
        $sector:String!
        $token:Int!
        $contact: String!
        $mainImage:String!
        $foodGuide: String!
        $origin: String!

        $fullPrice: Int!
        $salePrice: Int!
        $createMenus: [CreateMenu!]
        $editMenus: [EditMenu!]
        $deleteMenus: [DeleteMenu!]
        
        $founderImage: String
        $createMembers: [CreateMember!]
        $editMembers: [EditMember!]
        $deleteMembers: [DeleteMember!]

        $updateAccount: UpdateAccount

        $profileState: Int!){
            completeProfile(
                release: $release
                profileName: $profileName
                sector: $sector
                token: $token
                contact: $contact
                mainImage: $mainImage
                foodGuide: $foodGuide
                origin: $origin

                fullPrice: $fullPrice
                salePrice: $salePrice
                createMenus: $createMenus
                editMenus: $editMenus
                deleteMenus: $deleteMenus

                founderImage: $founderImage
                createMembers: $createMembers
                editMembers: $editMembers
                deleteMembers: $deleteMembers

                profileState: $profileState
                updateAccount: $updateAccount
            ) {
                id
                release
                profileName
                sector
                token
                contact
                mainImage
                foodGuide
                origin
                fullPrice
                salePrice
                founderImage
                submenus{
                    id
                    menuName
                    menuImage
                    fullPrice
                    salePrice
                }
                members{
                    id
                    image
                    name
                    position
                    career
                }
                account{
                    id
                    bank
                    accountNumber
                }
                career
                profileState
            }
        }
`;

export const EDIT_PROFILE = gql`
    mutation editProfile($menuImage:String!, $menuName:String!, $salePrice:Int!, $foodGuide:String!, $career:String!, $contact:String!, $classification:String!, $profileState: Int!) {
        editProfile(menuImage: $menuImage,  menuName: $menuName, salePrice: $salePrice, foodGuide: $foodGuide, career: $career, contact: $contact, classification:$classification, profileState:$profileState) {
            ...ProfileParts
        }
    }
    ${PROFILE_FRAGMENT}
`;

export const MY_PROFILE = gql`
    query myProfile{
        myProfile{
            ...ProfileParts
        }
    }
    ${PROFILE_FRAGMENT}
`;

export const MY_FAVORITE = gql`
    query myFavorite{
        myFavorite{
            id
            owner{
                id
                classification
                address
                addressDetail
                isSelf
                franchiseState
                #scale
                scale
                #description
                shopName
                district
                hashTags
                #rule
                minReserve
                shopImages{
                    id
                    type
                    url
                }
                calendar{
                    id
                    dateString
                    priceState
                    isBooked
                }

            }
        }
    }
`;

export const SEE_FULL_SHOP = gql`
    query seeFullShop($id: String!){
        seeFullShop(id: $id){
            ...OwnerParts
        }
    }
    ${OWNER_FRAGMENT}
`

export const SEARCH_SHOP_LIST =gql`
    query searchShopList{
        searchShopList{
            id
            classification
            address
            addressDetail
            isSelf
            franchiseState
            #scale
            scale
            #description
            shopName
            district
            hashTags
            #rule
            minReserve
            shopImages{
                id
                type
                url
            }
            calendar{
                id
                dateString
                priceState
                isBooked
            }
        }
    }
`;

export const TOGGLE_FAVORITE = gql`
    mutation toggleFavorite($id: String!){
        toggleFavorite(id:$id)
    }
`;

export const PROFILE_CONTACT = gql`
    query myProfile{
        myProfile{
            id
            contact
            account{
                id
                bank
                accountNumber
                accountHolder
            }
            user{
                id
                firstName
                lastName
            }
        }
    }
`;

export const BOOKING_SHOP =gql`
    mutation bookingShop(
        $ownerId: String!
        $firstDate: String!
        $lastDate: String!
        $totalPrice: String!
        $username: String!
        $contact: String!
        $prices: [InputPrice!]!
        $account: CreateAccount
    ){
        bookingShop(
            ownerId: $ownerId
            firstDate: $firstDate
            lastDate: $lastDate
            totalPrice: $totalPrice
            username: $username
            contact: $contact
            prices: $prices
            account: $account
        ){
            ...OwnerParts
        }
    }
    ${OWNER_FRAGMENT}
`;

export const BOOKING_LIST = gql`
    query bookingList($date: String!){
        bookingList(date: $date){
            id
            firstDate
            lastDate
            totalPrice
            isPaid
            isCancelled
            refundPrice
            owner{
                id
                shopName
                district
                shopImages{
                    id
                    type
                    url
                }
            }
            profile{
                id
                contact
                user{
                    id
                    fullName
                }
            }
            prices{
                id
                dateString
                priceState
            }
        }
    }
`;

export const CANCEL_BOOKING = gql`
    mutation cancelBooking($ownerId: String!, $bookingId: String!, $refundPrice: String!, $contact: String!, $fullName: String!, $prices: [InputPrice!]! ){
        cancelBooking(ownerId: $ownerId, bookingId: $bookingId, refundPrice: $refundPrice, contact: $contact, fullName: $fullName, prices: $prices){
            id
            firstDate
            lastDate
            totalPrice
            isPaid
            isCancelled
            refundPrice
        }
    }
`;

export const BOOKING_LIMIT = gql`
    query bookingLimit($today: String!, $ownerId: String!){
        bookingLimit(today: $today, ownerId: $ownerId){
            id
            isCancelled
            prices{
                id
                dateString
            }
        }
    }
`;

export const OPEN_INFO = gql`
    query openInfo($today: String!, $id: String!){
        openInfo(today: $today, id: $id){
            id
            owner{
                id
                longitude
                latitude
            }
            prices{
                id
                dateString
            }
        }
    }
`;

export const CHECK_PROFILE_NAME = gql`
    query checkProfileName($profileName: String){
        checkProfileName(profileName:$profileName)
    }
`;

export const LOAD_MORE_REVIEW = gql`
    query loadMoreReview($id: String!, $profileId: String!){
        loadMoreReview(id: $id, profileId: $profileId){
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;