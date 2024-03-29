import gql from "graphql-tag";
import { OWNER_FRAGMENT } from "../../fragments";

export const MY_SHOP = gql`
    query myShop {
        myShop{
        ...OwnerParts
        }
    }
    ${OWNER_FRAGMENT}
`;

export const OWNER_STATE = gql`
    query myShop{
        myShop{
            id
            ownerState
        }
    }
`;

export const CREATE_SHOP = gql`
    mutation createShop(
        $shopImages: [CreateShopImage!]!
        $address: String!
        $addressDetail: String!
        $registration: String!
        $classification: String!
        $contact: String!
        $ownerState: Int!
    ) {
        createShop(
            shopImages:$shopImages
            address:$address
            addressDetail:$addressDetail
            registration:$registration
            classification:$classification
            contact:$contact
            ownerState:$ownerState
        ) {
            ...OwnerParts
        }
    }
    ${OWNER_FRAGMENT}
`;

export const EDIT_SHOP = gql`
    mutation editShop(
        $shopImages: [EditShopImage!]!
        $address: String!
        $addressDetail: String!
        $registration: String!
        $classification: String!
        $contact: String!
        $ownerState: Int!
    ) {
        editShop(
            shopImages:$shopImages
            address:$address
            addressDetail:$addressDetail
            registration:$registration
            classification:$classification
            contact:$contact
            ownerState:$ownerState
        ) {
            ...OwnerParts
        }
    }
    ${OWNER_FRAGMENT}
`;

export const MY_CALENDAR = gql`
    query myCalendar{
        myCalendar{
            id
            ownerState
            isSelf
            franchiseState
            calendar{
                id
                dateString
                priceState
                isBooked
           }
        }
    }
`;

export const EDIT_CALENDAR = gql`
    mutation editCalendar(
        $updatePrice: [UpdatePrice]!
        $createPrice: [CreatePrice]!
        $deletePrice: [DeletePrice]!
    ){
        editCalendar(
            updatePrice: $updatePrice
            createPrice: $createPrice
            deletePrice: $deletePrice
        ){
            id
            isSelf
            ownerState
            calendar{
                id
                dateString
                priceState
                isBooked
           }
        }
    }
`;

export const COMPLETE_SHOP = gql`
    mutation completeShopShop(
        $ownerState: Int!
    ){
        completeShop(
            ownerState: $ownerState
        ){
            id
            ownerState
        }
    }
`;

export const COMPLETE_SHOP_SCALE = gql`
    mutation completeShopScale(
        $chairs: Int!
        $tables: Int!
        $scale: Int!
    ){
        completeShopScale(
            chairs: $chairs
            tables: $tables
            scale: $scale
        ){
            id
            chairs
            tables
            scale
        }
    }
`;

export const COMPLETE_SHOP_DESCRIPTION = gql`
    mutation completeShopDescription(
        $shopName: String!
        $district: String!
        $description: String!
        $precaution: String!
        $hashTags: [String]
    ){
        completeShopDescription(
            shopName: $shopName
            district: $district
            description: $description
            precaution: $precaution
            hashTags: $hashTags
        ){
            id
            shopName
            district
            description
            precaution
            hashTags
        }
    }
`;

export const COMPLETE_SHOP_REFUND = gql`
    mutation completeShopRefund(
        $refundAgree: Boolean!
    ){
        completeShopRefund(
            refundAgree: $refundAgree
        ){
            id
            refundAgree
        }
    }
`;

export const COMPLETE_SHOP_RULE = gql`
    mutation completeShopRule(
        $checkIn: Int!
        $checkOut: Int!
        $minReserve: Int!
    ){
        completeShopRule(
            checkIn: $checkIn
            checkOut: $checkOut
            minReserve: $minReserve
        ){
            id
            checkIn
            checkOut
            minReserve
        }
    }
`;

export const COMPLETE_SHOP_FACILITY = gql`
    mutation completeShopFacility(
       $facility: CompleteFacility
    ){
        completeShopFacility(
            facility: $facility
        ){
            id
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
    }
`;

export const COMPLETE_SHOP_IMAGE = gql`
    mutation completeShopImage(
        $createImages:[CreateImage]
        $deleteImages:[DeleteImage]
        $editImages:[EditImage]
    ){
        completeShopImage(
            createImages:$createImages
            deleteImages:$deleteImages
            editImages:$editImages
        ){
            id
            address
            registration
            classification
            contact
            ownerState
            shopImages{
                id
                type
                url
            }
        }
    }
`;
        
export const MY_EARNINGS = gql`
    query myEarnings($date: String!){
        myEarnings(date: $date)
    }
`;

export const RESERVATION_LIST = gql`
    query reservationList($date: String!){
        reservationList(date: $date){
            id
            firstDate
            lastDate
            totalPrice
            isPaid
            isCancelled
            prices{
                id
                dateString
            }
            profile{
                id
                mainImage
                profileName
                mainImage
                sector
            }
        }
    }
`;

export const COMPLETE_SHOP_ACCOUNT = gql`
    mutation completeShopAccount($createAccount: CreateShopAccount, $updateAccount: UpdateShopAccount){
        completeShopAccount(createAccount: $createAccount, updateAccount: $updateAccount){
            id
            account{
                id
                bank
                accountNumber
                accountHolder
            }
        }
    }
`