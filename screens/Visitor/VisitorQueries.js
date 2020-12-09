import gql from 'graphql-tag';
import { PROFILE_FRAGMENT, USER_FRAGMENT, POST_FRAGMENT } from "../../fragments";

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

export const EDIT_ME = gql`
    mutation editMe($username:String!, $avatar:String, $contact: String){
        editMe(username:$username, avatar:$avatar, contact:$contact){
            id
            username
            avatar
            contact
        }
    }
`;

export const EDIT_USERNAME = gql`
    query editUsername($username: String){
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

export const TOGGLE_LIKE = gql`
    mutation toggleLike($postId: String!, $token: Int!, $profileId: String!, $userId: String!){
        toggleLike(postId: $postId, token: $token, profileId: $profileId, userId: $userId)
    }
`;

export const FOLLOW = gql`
    mutation follow($id: String!){
        follow(id:$id)
    }
`;

export const UNFOLLOW = gql`
    mutation unfollow($id: String!){
        unfollow(id:$id)
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

export const SEE_FULL_POST = gql`
    query seeFullPost($id: String!){
        seeFullPost(id: $id){
            id
            allFiles{
                id
                url
            }
        }
    }
`;

export const EDIT_PROFILE_POST = gql`
    mutation editProfilePost($profileId: String!, $postId: String!, $tasting:String, $createFiles: [CreateFile], $editFiles: [EditFile], $deleteFiles: [DeleteFile], $action: ACTIONS!){
        editProfilePost(
            profileId: $profileId,
            postId: $postId
            tasting: $tasting,
            createFiles: $createFiles,
            deleteFiles: $deleteFiles,
            editFiles: $editFiles,
            action: $action
        ){
            ...ProfileParts
        }
    }
    ${PROFILE_FRAGMENT}
`;

export const EDIT_USER_POST = gql`
    mutation editUserPost($postId: String!, $tasting:String, $createFiles: [CreateFile], $editFiles: [EditFile], $deleteFiles: [DeleteFile], $action: ACTIONS!){
        editUserPost(
            postId: $postId
            tasting: $tasting,
            createFiles: $createFiles,
            deleteFiles: $deleteFiles,
            editFiles: $editFiles,
            action: $action
        ){
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;

export const MY_DANGOL = gql`
    query myDangol{
        myDangol{
            id
            profile{
                id
                isSelf
                profileName
                menuName
                menuImage
                salePrice
                fullPrice
                classification
                sector
                token
                mainImage
                isDangol
                dangolCount
                myPosts
                myWallet{
                    id
                    incoming
                    outgoing
                }
                wallets{
                    id
                    incoming
                    outgoing
                }
                submenus{
                    id
                    menuName
                    menuImage
                    fullPrice
                    salePrice
                }
                profileState
                postsCount
                bookings{
                    id
                    isCancelled
                    prices{
                        id
                        dateString
                    }
                }
            }
        }
    }
`;

export const MY_FOLLOWER = gql`
    query me{
        me{
            id
            followers{
              id
              username
              avatar
              isSelf
              isFollowing
            }
        }
    }
`;

export const MY_FOLLOWING = gql`
    query me{
        me{
            id
            following{
              id
              username
              avatar
              isSelf
              isFollowing
            }
        }
    }
`;

export const USER_FOLLOWER = gql`
    query seeUser($username: String!){
        seeUser(username: $username){
            id
            followers{
                id
                username
                avatar
                isSelf
                isFollowing
            }
        }
    }
`;

export const SHOP_ON_SALE = gql`
    query shopOnSale($dateInput: String!){
        shopOnSale(dateInput: $dateInput){
            id
            firstDate
            lastDate
            profile{
                id
                isSelf
                profileName
                menuName
                menuImage
                salePrice
                fullPrice
                classification
                contact
                sector
                token
                mainImage
                foodGuide
                origin
                isDangol
                dangolCount
                myWallet{
                    id
                    incoming
                    outgoing
                }
                wallets{
                    id
                    incoming
                    outgoing
                }
                submenus{
                    id
                    menuName
                    menuImage
                    fullPrice
                    salePrice
                }
                postsCount
                myPosts
            }
            owner{
                id
                longitude
                latitude
            }
        }
    }
`;

export const LOAD_MORE_POST = gql`
    query loadMorePost($id: String!, $username: String!){
        loadMorePost(id: $id, username: $username){
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;

export const SEARCH_PROFILE = gql`
    query searchProfile($name: String){
        searchProfile(name: $name){
            id
            isSelf
            profileName
            menuName
            menuImage
            salePrice
            fullPrice
            classification
            sector
            token
            mainImage
            isDangol
            dangolCount
            myPosts
            myWallet{
                id
                incoming
                outgoing
            }
            wallets{
                id
                incoming
                outgoing
            }
            submenus{
                id
                menuName
                menuImage
                fullPrice
                salePrice
            }
            profileState
            postsCount
            bookings{
                id
                isCancelled
                prices{
                    id
                    dateString
                }
            }
        }
    }
`;