import gql from "graphql-tag";
import { PROFILE_FRAGMENT, OWNER_FRAGMENT } from "../../fragments";

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
        $profileName:String!
        $sector:String!
        $token:Int!
        $mainImage:String!
        $foodGuide: String!
        $origin: String!

        $fullPrice: Int!
        $createMenus: [CreateMenu!]
        $editMenus: [EditMenu!]
        $deleteMenus: [DeleteMenu!]
        
        $founderImage: String
        $createMembers: [CreateMember!]
        $editMembers: [EditMember!]
        $deleteMembers: [DeleteMember!]

        $profileState: Int!){
            completeProfile(
                profileName: $profileName
                sector: $sector
                token: $token
                mainImage: $mainImage
                foodGuide: $foodGuide
                origin: $origin

                fullPrice: $fullPrice
                createMenus: $createMenus
                editMenus: $editMenus
                deleteMenus: $deleteMenus

                founderImage: $founderImage
                createMembers: $createMembers
                editMembers: $editMembers
                deleteMembers: $deleteMembers

                profileState: $profileState
            ) {
                id
                profileName
                sector
                token
                mainImage
                foodGuide
                origin
                fullPrice
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

export const SEE_FULL_SHOP = gql`
    query seeFullShop($id: String!){
        seeFullShop(id: $id){
            ...OwnerParts
        }
    }
    ${OWNER_FRAGMENT}
`