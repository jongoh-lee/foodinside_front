import gql from "graphql-tag";

export const OWNER_FRAGMENT = gql`
  fragment OwnerParts on Owner {
    id
    registration
    classification
    address
    addressDetail
    ownerState
    contact
    #scale
    chairs
    tables
    scale
    #description
    shopName
    district
    description
    precaution
    hashTag
    #rule
    checkIn
    checkOut
    minReserve
    #refund
    refundAgree
    shopImages{
        id
        type
        url
    }
    calendar{
      id
      dateString
      priceState
    }
    facility{
        id
        size_25
        size_30
        size_45
        size_65
        fridgeBox_ect
    #fridge
        showcase
        table 
        vat 
        kimchi 
        tuna 
        wine 
        ice_cream 
        fridge_ect 
    #fire
        lower_stove 
        chinese_stove 
        gas_stove 
        house_stove 
        induction 
        fire_ect 
    #griller
        fire_above 
        fire_below 
        charcoal 
        griller_ect 
    #griddle
        size_600 
        size_900 
        size_1200 
        size_1500 
        griddle_ect 
    #fryer
        electric 
        gas
        fryer_ect
    #oven
        deck 
        convection 
        steam_convection 
        combi_steamer 
        oven_ect 
    #cafe
        espresso_machine
        coffee_bean_grinder
        roasting_machine
        ice_maker
        ice_shaver
        water_heater
        blender
        cafe_ect
    #electronic
        rice_cooker 
        soup_heater 
        dish_washer 
        microwave 
        take_out_packer 
        induction_small 
        blender_small 
        food_warmer 
        dough_machine 
        fermenter 
        noodle_cooker 
        noodle_maker 
        pasta_noodle_maker 
        cold_noodle_maker 
        soda_dispenser 
        soft_cone_machine 
        beer_dispenser 
    #tableware
        spoon_holder 
        napkin_holder 
        seasoning_container 
        wet_wipe 
        opener 
        spoon 
        chopsticks 
        fork 
        knife 
        tray 
        water_bottle 
        kettle 
        portable_stove 
        table_bell 
    #container
        bowl_container 
        stainless_vat 
        soup_container 
        plastic_vat 
        glass_vat 
        side_dish_container 
        wash_basin 
        take_out_container 
    #glass
        beverage 
        water 
        mug 
        soju 
        sake 
        kaoliang 
        shot 
        wine_glass 
        champagne 
        cocktail 
        on_the_rock 
        highball 
        glass 
        pitcher_500cc 
        pitcher_2000cc 
        pitcher_3000cc 
    #serving
        rice_bowl 
        dish 
        earthenware 
        pottery 
        stone_pot 
        pot 
        frying_pan 
        side_dish_bowl 
        small_dish 
        bowl 
        scissors 
        ladle 
    #cleaner
        detergent 
        clorox 
        abstergent 
        bloom 
        dustpan 
        floorcloth 
        bucket 
        hose 
        brush 
        vacuum_cleaner
    #ect
        speaker 
        tv 
        projector 
        air_conditioner 
        wifi 
        cctv 
        kiosk 
        umbrella_stand 
    }
  }
`;

export const PROFILE_FRAGMENT = gql`
  fragment ProfileParts on Profile {
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
    career
    profileState
    user{
        id
        firstName
        lastName
    }
    postsCount
    myPosts
    posts{
      id
      tasting
      isSelf
      isLiked
      likeCount
      user{
        id
        username
        avatar
        isSelf
      }
      files{
        id
        url
      }
      profile{
        id
      }
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
    isSelf
    isFollowing
    posts{
      id
      tasting
      isSelf
      isLiked
      likeCount
      user{
        id
        username
        avatar
        isSelf
      }
      files{
        id
        url
      }
      profile{
        id
      }
    }
  }
`;

export const POST_FRAGMENT = gql`
  fragment PostParts on Post {
    id
    tasting
    isSelf
    isLiked
    likeCount
    user{
      id
      username
      avatar
      isSelf
    }
    files{
      id
      url
    }
    profile{
      id
    }
  }
`;