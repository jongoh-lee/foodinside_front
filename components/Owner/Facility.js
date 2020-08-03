import * as React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { MaterialCommunityIcons, Entypo, FontAwesome5, Ionicons, Feather } from "@expo/vector-icons"
import constants from "../../constants";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginTop:5
    },
    button:{
        width:constants.width / 5,
        minHeight:constants.height / 14,
        alignItems:"center",
        justifyContent:"flex-end",
    },
    text:{
        fontSize:12,
        color:"#666",
        marginTop:2
    },
    facility:{
        height:constants.height / 6,
        justifyContent:"center",
        alignItems:"center",
        borderBottomWidth:1,
        borderBottomColor:"#e7e7e7",
    }
})

const translate = {
    BoxFridge:{
        "25": "size_25",
        "30": "size_30",
        "45": "size_45",
        "65": "size_65",
        "기타": "fridgeBox_ect",
    },
    Fridge:{
        "음료 쇼케이스": "showcase",
        "테이블": "table",
        "밧드": "vat",
        "김치": "kimchi",
        "참치": "tuna",
        "와인": "wine",
        "아이스크림": "ice_cream",
        "기타": "fridge_ect",
    },
    Fire:{
        "업소용 레인지": "gas_stove",
        "낮은 레인지": "lower_stove",
        "중화 레인지": "chinese_stove",
        "가정용 레인지": "house_stove",
        "인덕션 레인지": "induction",
        "기타": "fire_ect",
    },
    Griller:{
        "상화식": "fire_above",
        "하화식": "fire_below",
        "숯불": "charcoal",
        "기타": "griller_ect",
    },
    Griddle:{
        "600": "size_600",
        "900": "size_900",
        "1200": "size_1200",
        "1500": "size_1500",
        "기타": "griddle_ect",
    },
    Fryer:{
        "전기식": "electric",
        "가스식": "gas",
        "기타": "fryer_ect",
    },
    Oven:{
        "데크": "deck",
        "컨벡션": "convection",
        "스팀 컨벡션": "steam_convection",
        "콤비 스티머": "combi_steamer",
        "기타": "oven_ect",
    },
    Cafe:{
        "에스프레소 머신": "espresso_machine",
        "원두 그라인더": "coffee_bean_grinder",
        "온수기": "roasting_machine",
        "제빙기": "ice_maker",
        "빙삭기": "ice_shaver",
        "블렌더": "water_heater",
        "로스팅 머신": "blender",
        "기타 기기": "cafe_ect",
    },
    Electronic:{
        "전기 밥솥": "rice_cooker",
        "전기 국통": "soup_heater",
        "식기 세척기": "dish_washer",
        "전자 레인지": "microwave",
        "take out 포장기": "take_out_packer",
        "인덕션": "induction_small",
        "믹서기": "blender_small",
        "온장고": "food_warmer",
        "반죽기": "dough_machine",
        "발효기": "fermenter",
        "해면기": "noodle_cooker",
        "제면기계": "noodle_maker",
        "파스타 기계": "pasta_noodle_maker",
        "냉면 기계": "cold_noodle_maker",
        "탄산음료 기계": "soda_dispenser",
        "소프트아이스크림 기계": "soft_cone_machine",
        "생맥주 디스펜서 + 탄산가스": "beer_dispenser",
    },
    Tableware:{
        "수저통": "spoon_holder",
        "냅킨통": "napkin_holder",
        "양념통": "seasoning_container",
        "물수건": "wet_wipe",
        "오프너": "opener",
        "수저": "spoon",
        "젓가락": "chopsticks",
        "포크": "fork",
        "나이프": "knife",
        "쟁반": "tray",
        "물병": "water_bottle",
        "주전자": "kettle",
        "가스버너": "portable_stove",
        "호출벨": "table_bell",
    },
    Container:{
        "보울": "bowl_container",
        "스텐밧드": "stainless_vat",
        "대형 국통": "soup_container",
        "플라스틱 밧드": "plastic_vat",
        "유리 밧드": "glass_vat",
        "반찬통": "side_dish_container",
        "대야": "wash_basin",
        "take out 용기": "take_out_container",
    },
    Glass:{
        "음료": "beverage",
        "물": "water",
        "머그": "mug",
        "소주": "soju",
        "사케": "sake",
        "고량주": "kaoliang",
        "샷": "shot",
        "와인": "wine_glass",
        "샴페인": "champagne",
        "칵테일": "cocktail",
        "온더락": "on_the_rock",
        "하이볼": "highball",
        "글라스": "glass",
        "500cc": "pitcher_500cc",
        "2000cc": "pitcher_2000cc",
        "3000cc": "pitcher_3000cc",
    },
    Serving:{
        "공기": "rice_bowl",
        "접시류": "dish",
        "뚝배기": "earthenware",
        "옹기": "pottery",
        "돌솥": "stone_pot",
        "냄비": "pot",
        "볶음판": "frying_pan",
        "찬기": "side_dish_bowl",
        "종지": "small_dish",
        "볼": "bowl",
        "가위": "scissors",
        "국자": "ladle",
    },
    Cleaner:{
        "주방 세제": "detergent",
        "락스": "clorox",
        "살균 세척제": "abstergent",
        "빗자루": "bloom",
        "쓰레받기": "dustpan",
        "밀대": "floorcloth",
        "양동이": "bucket",
        "호스": "hose",
        "청소솔": "brush",
        "진공청소기": "vacuum_cleaner",
    },
    Ect:{
        "음향 기기": "speaker",
        "TV": "tv",
        "프로젝터": "projector",
        "에어컨": "air_conditioner",
        "와이파이": "wifi",
        "CCTV": "cctv",
        "무인 키오스크": "kiosk",
        "우산 꽂이": "umbrella_stand",
    }
}

export default () => {
    const [ tab, setTab ] = React.useState('화기');
    return (
    <>
    <View style={styles.container}>
        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('BoxFridge')}>
            <MaterialCommunityIcons name="fire" size={30} color="red"/>
            <Text style={styles.text}>화기</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('카페')}>
            <Ionicons name="ios-cafe" size={30} color="#c1a183"/>
            <Text style={styles.text}>카페</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('BoxFridge')}>
            <MaterialCommunityIcons name="snowflake" size={30} color="#00c4f6"/>
            <Text style={styles.text}>냉동/냉장</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('전자기기')}>
        <Entypo name="flash" size={24} color="#f7ca09" />
            <Text style={styles.text}>전자기기</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('보관용기')}>
        <Entypo name="download" size={24} color="#a7a6b0" />
            <Text style={styles.text}>보관용기</Text>
        </TouchableWithoutFeedback>
    </View>

    <View style={styles.container}>
        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('식기')}>
            <MaterialCommunityIcons name="silverware-variant" size={30} color="#cacece" />
            <Text style={styles.text}>식기</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('잔')}>
            <MaterialCommunityIcons name="glass-cocktail" size={30} color="#b0f8ef" />
            <Text style={styles.text}>잔</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('서빙용품')}>
        <FontAwesome5 name="hand-holding" size={24} color="black" style={{marginBottom:8}}/>
            <Text style={styles.text}>서빙용품</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('청소도구')}>
        <Entypo name="trash" size={22} color="#0735c6" style={{marginBottom:3}}/>
            <Text style={styles.text}>청소도구</Text>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback style={styles.button} onPress={()=>setTab('기타')}>
        <Feather name="more-horizontal" size={24} color="#000000"/>
            <Text style={styles.text}>기타</Text>
        </TouchableWithoutFeedback>
    </View>
    
    <View style={styles.facility}>
        <Text>여기에 {tab} Data가 표시 됩니다</Text>
    </View>
    </>
    )
};