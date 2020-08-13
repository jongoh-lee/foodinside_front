import gql from 'graphql-tag';
import { PROFILE_FRAGMENT, USER_FRAGMENT } from "../../fragments";

export const ME = gql`
    query me {
        me  {
        ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;

export const EDIT_USER = gql`
    mutation editUser($username:String!, $avatar:String){
        editUser(username:$username, avatar:$avatar){
            id
            username
            avatar
        }
    }
`;


export const SEE_FULL_PROFILE = gql`
    query seeFullProfile($id: String!){
        seeFullProfile(id: $id){
            ...ProfileParts
        }
    }
    ${PROFILE_FRAGMENT}
`;

export const TOGGLE_DANGOL = gql`
    mutation toggleDangol($profileId: String!){
        toggleDangol(profileId: $profileId)
    }
`;