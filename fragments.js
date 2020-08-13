import gql from "graphql-tag";

export const PROFILE_FRAGMENT = gql`
  fragment ProfileParts on Profile {
    id
    profileName
    classification
    contact
    sector
    token
    mainImage
    foodGuide
    origin
    isDangol
    dangolCount
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
    menuImage
    menuName
    salePrice
    fullPrice
    foodGuide
    career
    profileState
    user{
        id
        firstName
        lastName
    }
  }
`;


export const USER_FRAGMENT = gql`
  fragment UserParts on User {
    id
    avatar
    username
    email
    firstName
    lastName
    dangolCount
    followingCount
    postsCount
    followersCount
  }
`;