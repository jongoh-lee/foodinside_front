import gql from "graphql-tag";

export const CREATE_PROFILE = gql`
    mutation createProfile($menuImage:String!, $menuName:String!, $salePrice:Int!, $foodGuide:String!, $career:String!, $contact:String!, $profileState:Int!, $sector:String!) {
        createProfile(menuImage: $menuImage, menuName: $menuName, salePrice: $salePrice, foodGuide: $foodGuide, career: $career, contact: $contact, profileState:$profileState, sector:$sector) {
            id
            menuImage
            menuName
            salePrice
            sector
            foodGuide
            career
            contact
            profileState
        }
    }
`;

export const COMPLETE_PROFILE = gql`
    mutation completeProfile(
        $shopName:String!
        $classification:String!
        $region:String!
        $mainImage:String!
        $submenus: [CreateSubmenu!]
        $members: [CreateMember!]
        $profileState: Int!){
            completeProfile(
                shopName: $shopName
                classification: $classification
                region: $region
                mainImage: $mainImage
                submenus: $submenus
                members: $members
                profile: $profile
            ) {
                id
                shopName
                classification
                ri
                menuImage
                menuName
                salePrice
                sector
                foodGuide
                career
                contact
                profileState
                shop
                region
                classification
                main
                submenus
                members
            }
        }
`;

export const EDIT_PROFILE = gql`
    mutation editProfile($menuImage:String!, $menuName:String!, $salePrice:Int!, $foodGuide:String!, $career:String!, $contact:String!, $sector:String!, $profileState: Int!) {
        editProfile(menuImage: $menuImage,  menuName: $menuName, salePrice: $salePrice, foodGuide: $foodGuide, career: $career, contact: $contact, sector:$sector, profileState:$profileState) {
            id
            menuImage
            menuName
            salePrice
            sector
            foodGuide
            career
            contact
            profileState
        }
    }
`;

export const MY_PROFILE = gql`
    query myProfile{
        myProfile{
            id
            menuImage 
            menuName 
            salePrice 
            foodGuide
            sector
            career
            contact
            profileState
        }
    }
`;