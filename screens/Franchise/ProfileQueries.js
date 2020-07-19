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