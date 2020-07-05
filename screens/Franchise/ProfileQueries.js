import gql from "graphql-tag";

export const CREATE_PROFILE = gql`
    mutation createProfile($mainMenu:String!, $foodGuide:String!, $career:String!, $contact:String!, $profileState:Int!) {
        createProfile(mainMenu: $mainMenu, foodGuide: $foodGuide, career: $career, contact: $contact, profileState:$profileState) {
            id
            profileState
        }
    }
`;

export const EDIT_PROFILE = gql`
    mutation editProfile($mainMenu:String!, $foodGuide:String!, $career:String!, $contact:String!) {
        editProfile(mainMenu: $mainMenu, foodGuide: $foodGuide, career: $career, contact: $contact) {
            id
            mainMenu
            foodGuide
            career
            contact
        }
    }
`;

export const CHECK_PROFILE = gql`
    query checkProfile{
        checkProfile
    }
`;

export const MY_PROFILE = gql`
    query myProfile{
        myProfile{
            mainMenu
            foodGuide
            career
            contact
        }
    }
`;