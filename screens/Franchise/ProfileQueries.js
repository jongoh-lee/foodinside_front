import gql from "graphql-tag";

export const CREATE_PROFILE = gql`
    mutation createProfile($mainMenu:String!, $foodGuide:String!, $career:String!, $contact:Int!, $profileState:Int!) {
        createProfile(mainMenu: $mainMenu, foodGuide: $foodGuide, career: $career, contact: $contact, profileState:$profileState) {
            id
            profileState
        }
    }
`;

export const CHECK_PROFILE = gql`
    query checkProfile{
        checkProfile
    }
`;