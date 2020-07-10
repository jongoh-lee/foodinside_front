import gql from 'graphql-tag';

export const ME = gql`
    query me {
        me  {
        id
        username
        avatar
        email
        followingCount
        followersCount
        postsCount
        }
    }
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