import gql from "graphql-tag";

export const CREATE_PROFILE = gql`
    mutation createProfile($mainMenu:String!, $foodGuide:String!, $career:String!, $contact:Int!) {
        createProfile(mainMenu: $mainMenu, foodGuide: $foodGuide, career: $career, contact: $contact) {
            id
        }
    }
`;