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

export const SEE_USER = gql`
    query seeUser($username: String!){
        seeUser(username: $username){
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

export const EDIT_USERNAME = gql`
    query editUsername($username: String!){
        editUsername(username: $username)
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

export const UPLOAD = gql`
    mutation upload($id: String!, $tasting: String, $createFiles:[CreateFile!]!){
        upload(id:$id, tasting:$tasting, createFiles:$createFiles){
            ...ProfileParts
        }
    }
    ${PROFILE_FRAGMENT}
`;

export const EDIT_POST = gql`
    mutation editPost($id: String!, $tasting:String, $createFiles: [CreateFile], $editFiles: [EditFile], $deleteFiles: [DeleteFile], $action: ACTIONS!){
        editPost(
            id: $id,
            tasting: $tasting,
            createFiles: $createFiles,
            deleteFiles: $deleteFiles,
            editFiles: $editFiles,
            action: $action
        ){
            id
            tasting
            user{
                id
                username
            }
            files{
                id
                url
            }
        }
    }
`;

export const DELETE_POST = gql`
    mutation deletePost($profileId: String!, $postId: String!){
        deletePost(
            profileId: $profileId,
            postId: $postId
        ){
            ...ProfileParts
        }
    }
    ${PROFILE_FRAGMENT}
`;