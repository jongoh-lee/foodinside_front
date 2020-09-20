import * as React from "react";
import { StyleSheet, View, Text, SafeAreaView} from "react-native";
import { MaterialCommunityIcons, Entypo, FontAwesome5, Ionicons, Feather } from "@expo/vector-icons"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ShadowInput from "../../components/Custom/ShadowInput";
import useInput from "../../hooks/useInput";
import BasicButton from "../../components/Custom/BasicButton";
import { useMutation } from "@apollo/react-hooks";
import { COMPLETE_SHOP_FACILITY } from "./OwnerQueries";

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
        "로스팅 머신": "roasting_machine",
        "제빙기": "ice_maker",
        "빙삭기": "ice_shaver",
        "온수기": "water_heater",
        "블렌더": "blender",
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

export default ({ navigation, route}) => {
    const [loading, setLoading] = React.useState(false);
    //query data
    
    const [facility, setFacility] = React.useState(route.params.facility? route.params.facility: {})
    //korean data
    const [korean, setKorean] = React.useState(translate);
    const {BoxFridge, Fridge, Fire, Griller, Griddle, Fryer, Oven, Cafe, Electronic, Tableware, Container, Glass, Serving, Cleaner, Ect } = korean;
    const [CompleteShopFacilityMutation] = useMutation(COMPLETE_SHOP_FACILITY);

    //cafe value
    const espresso_machineInput = useInput(facility?.espresso_machine? facility?.espresso_machine : '');
    const coffee_bean_grinderInput = useInput(facility?.coffee_bean_grinder? facility?.coffee_bean_grinder : '');
    const roasting_machineInput = useInput(facility?.roasting_machine? facility?.roasting_machine : '');
    const ice_makerInput = useInput(facility?.ice_maker? facility?.ice_maker : '');
    const ice_shaverInput = useInput(facility?.ice_shaver? facility?.ice_shaver : '');
    const water_heaterInput = useInput(facility?.water_heater? facility?.water_heater : '');
    const blenderInput = useInput(facility?.blender? facility?.blender : '');
    const cafe_ectInput = useInput(facility?.cafe_ect? facility?.cafe_ect : '');
    //changed data
    const dataChanger = ( en ) => {
        if(facility === null){
            Object.assign(facility, { [en]: true })
        } else {
            let bool = facility[en];
            facility[en] = !bool;
            setFacility({...facility});
        }
    };
    const handleShopFacility = async () => {
        ["__typename", "id"].forEach(el => delete facility[el]);
        let cafe = {
            espresso_machine: espresso_machineInput.value,
            coffee_bean_grinder: coffee_bean_grinderInput.value,
            roasting_machine: roasting_machineInput.value,
            ice_maker: ice_makerInput.value,
            ice_shaver: ice_shaverInput.value,
            water_heater: water_heaterInput.value,
            blender: blenderInput.value,
            cafe_ect: cafe_ectInput.value,
        }
        Object.assign(facility, cafe);
        try {
            setLoading(true);
            const {
                data : { completeShopFacility }
            } = await CompleteShopFacilityMutation({
                variables:{
                    facility: facility,
                }
            });
            if(completeShopFacility){
                navigation.goBack()
            }
        } catch(e) {
            console.log("가게 facility 에러:",e)
        } finally {
          setLoading(false);
        }
    }
    return (
    <SafeAreaView style={styles.container}> 
        <ScrollView>
            <View style={styles.inner}>

            <View style={styles.box}>
                <MaterialCommunityIcons name="snowflake" size={30} color="#00c4f6"/>

                <View style={styles.rowBox}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>Box 냉장고{`\n`}(용량)</Text>
                    </View>

                    <View style={styles.listBox}>
                        {Object.entries(BoxFridge).map(([kor , en])=>{
                            return (
                                <TouchableOpacity key={kor} onPress={() => dataChanger(en)} disabled={loading}>
                                    <Text style={facility? facility[en]? styles.item_true : styles.item_false : styles.item_false}>{kor}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                <View style={styles.rowBox}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>기타 냉장고</Text>
                    </View>
                    <View style={styles.listBox}>
                        {Object.entries(Fridge).map(([kor , en])=>{
                            return (
                                <TouchableOpacity key={kor} onPress={() => dataChanger(en)} disabled={loading}>
                                    <Text style={facility? facility[en]? styles.item_true : styles.item_false : styles.item_false}>{kor}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </View>

            <View style={styles.box}>
                <MaterialCommunityIcons name="fire" size={30} color="red"/>

                <View style={styles.rowBox}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>화구</Text>
                    </View>
                    <View style={styles.listBox}>
                        {Object.entries(Fire).map(([kor , en])=>{
                            return (
                                <TouchableOpacity key={kor} onPress={() => dataChanger(en)} disabled={loading}>
                                    <Text style={facility? facility[en]? styles.item_true : styles.item_false : styles.item_false}>{kor}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                <View style={styles.rowBox}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>그릴러</Text>
                    </View>
                    <View style={styles.listBox}>
                        {Object.entries(Griller).map(([kor , en])=>{
                            return (
                                <TouchableOpacity key={kor} onPress={() => dataChanger(en)} disabled={loading}>
                                    <Text style={facility? facility[en]? styles.item_true : styles.item_false : styles.item_false}>{kor}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                <View style={styles.rowBox}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>그리들</Text>
                    </View>
                    <View style={styles.listBox}>
                        {Object.entries(Griddle).map(([kor , en])=>{
                            return (
                                <TouchableOpacity key={kor} onPress={() => dataChanger(en)} disabled={loading}>
                                    <Text style={facility? facility[en]? styles.item_true : styles.item_false : styles.item_false}>{kor}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>

                <View style={styles.rowBox}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>튀김기</Text>
                    </View>
                    <View style={styles.listBox}>
                        {Object.entries(Fryer).map(([kor , en])=>{
                            return (
                                <TouchableOpacity key={kor} onPress={() => dataChanger(en)} disabled={loading}>
                                    <Text style={facility? facility[en]? styles.item_true : styles.item_false : styles.item_false}>{kor}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
                
                <View style={styles.rowBox}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>오븐</Text>
                    </View>
                    <View style={styles.listBox}>
                        {Object.entries(Oven).map(([kor , en])=>{
                            return (
                                <TouchableOpacity key={kor} onPress={() => dataChanger(en)} disabled={loading}>
                                    <Text style={facility? facility[en]? styles.item_true : styles.item_false : styles.item_false}>{kor}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </View>

            <View style={styles.box}>
                <Ionicons name="ios-cafe" size={30} color="#c1a183"/>

                <View style={[styles.cafeBox, {paddingTop:10}]}>
                    <View style={{alignItems:"center", padding:10, flex:1}}>
                        <Text style={{color:'black', marginBottom:10, fontWeight:'bold'}}>에스프레소 머신*</Text>
                        <ShadowInput {...espresso_machineInput} placeholder={'명칭'} returnKeyType={"done"} editable={!loading} />
                    </View>

                    <View style={{alignItems:"center", padding:10, flex:1}}>
                        <Text style={{color:'black', marginBottom:10, fontWeight:'bold'}}>원두 그라인더*</Text>
                        <ShadowInput {...coffee_bean_grinderInput} placeholder={'명칭'} returnKeyType={"done"} editable={!loading}/>
                    </View>

                    <View style={{alignItems:"center", padding:10, flex:1}}>
                        <Text style={{color:'black', marginBottom:10, fontWeight:'bold'}}>온수기*</Text>
                        <ShadowInput {...water_heaterInput} placeholder={'용량(L)'} returnKeyType={"done"} editable={!loading}/>
                    </View>
                </View>

                <View style={styles.cafeBox}>
                    <View style={{alignItems:"center", padding:10, flex:1}}>
                        <Text style={{color:'black', marginBottom:10, fontWeight:'bold'}}>제빙기*</Text>
                        <ShadowInput {...ice_makerInput} placeholder={'용량(L)'} returnKeyType={"done"} editable={!loading}/>
                    </View>

                    <View style={{alignItems:"center", padding:10, flex:1}}>
                        <Text style={{color:'black', marginBottom:10, fontWeight:'bold'}}>빙삭기</Text>
                        <ShadowInput {...ice_shaverInput} placeholder={'명칭'} returnKeyType={"done"} editable={!loading}/>
                    </View>

                    <View style={{alignItems:"center", padding:10, flex:1}}>
                        <Text style={{color:'black', marginBottom:10, fontWeight:'bold'}}>블렌더</Text>
                        <ShadowInput {...blenderInput} placeholder={'명칭'}  returnKeyType={"done"} editable={!loading}/>
                    </View>
                </View>

                <View style={[styles.cafeBox, {paddingBottom:20}]}>
                    <View style={{alignItems:"center", padding:10, flex:1}}>
                        <Text style={{color:'black', marginBottom:10, fontWeight:'bold'}}>로스팅 머신</Text>
                        <ShadowInput {...roasting_machineInput} placeholder={'명칭'}  returnKeyType={"done"} editable={!loading}/>
                    </View>

                    <View style={{alignItems:"center", padding:10, flex:1}}>
                        <Text style={{color:'black', marginBottom:10, fontWeight:'bold'}}>기타</Text>
                        <ShadowInput {...cafe_ectInput} placeholder={'기타 기기'}  returnKeyType={"done"} editable={!loading}/>
                    </View>
                </View>
            </View>

            <View style={styles.box}>
                <Entypo name="flash" size={24} color="#f7ca09" />

                <View style={styles.noTitleBox}>
                    {Object.entries(Electronic).map(([kor , en])=>{
                        return (
                            <TouchableOpacity key={kor} onPress={() => dataChanger(en)} disabled={loading}>
                                <Text style={facility? facility[en]? styles.item_true : styles.item_false : styles.item_false}>{kor}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <View style={styles.box}>
                <Entypo name="download" size={24} color="#a7a6b0" />

                <View style={styles.noTitleBox}>
                    {Object.entries(Container).map(([kor , en])=>{
                        return (
                            <TouchableOpacity key={kor} onPress={() => dataChanger(en)} disabled={loading}>
                                <Text style={facility? facility[en]? styles.item_true : styles.item_false : styles.item_false}>{kor}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <View style={styles.box}>
                <MaterialCommunityIcons name="silverware-variant" size={30} color="#cacece" />

                <View style={styles.noTitleBox}>
                    {Object.entries(Tableware).map(([kor , en])=>{
                        return (
                            <TouchableOpacity key={kor} onPress={() => dataChanger(en)} disabled={loading}>
                                <Text style={facility? facility[en]? styles.item_true : styles.item_false : styles.item_false}>{kor}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <View style={styles.box}>
                <MaterialCommunityIcons name="glass-cocktail" size={30} color="#b0f8ef" />

                <View style={styles.noTitleBox}>
                    {Object.entries(Glass).map(([kor , en])=>{
                        return (
                            <TouchableOpacity key={kor} onPress={() => dataChanger(en)} disabled={loading}>
                                <Text style={facility? facility[en]? styles.item_true : styles.item_false : styles.item_false}>{kor}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <View style={styles.box}>
                <FontAwesome5 name="hand-holding" size={24} color="black" style={{marginBottom:8}}/>

                <View style={styles.noTitleBox}>
                    {Object.entries(Serving).map(([kor , en])=>{
                        return (
                            <TouchableOpacity key={kor} onPress={() => dataChanger(en)} disabled={loading}>
                                <Text style={facility? facility[en]? styles.item_true : styles.item_false : styles.item_false}>{kor}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <View style={styles.box}>
                <Entypo name="trash" size={22} color="#0735c6" style={{marginBottom:3}}/>

                <View style={styles.noTitleBox}>
                    {Object.entries(Cleaner).map(([kor , en])=>{
                        return (
                            <TouchableOpacity key={kor} onPress={() => dataChanger(en)} disabled={loading}>
                                <Text style={facility? facility[en]? styles.item_true : styles.item_false : styles.item_false}>{kor}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <View style={styles.box}>
                <Feather name="more-horizontal" size={24} color="#000000"/>

                <View style={styles.noTitleBox}>
                    {Object.entries(Ect).map(([kor , en])=>{
                        return (
                            <TouchableOpacity key={kor} onPress={() => dataChanger(en)} disabled={loading}>
                                <Text style={facility? facility[en]? styles.item_true : styles.item_false : styles.item_false}>{kor}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <BasicButton text={'등록 하기'} onPress={handleShopFacility} loading={loading} disabled={loading}/>

            </View>
        </ScrollView>
    </SafeAreaView>    
    )
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff",
    },
    inner:{
        padding:15,
    },
    box:{
        marginBottom:10,
        alignItems:"center",
    },
    rowBox:{
        flexDirection:"row",
        paddingVertical:20
    },
    titleBox:{
        flex:1, 
    },
    listBox:{
        flex:3, 
        flexDirection:"row", 
        flexWrap:"wrap",
    },
    title:{
        fontSize:14,
        fontWeight:'bold'
    },
    item_false:{
        color:'#666',
        marginRight:20,
        marginBottom:15,
    },
    item_true:{
        color:'black',
        marginRight:20,
        marginBottom:15,
        fontWeight:'bold',
    },
    noTitleBox:{
        flex:1, 
        flexDirection:"row", 
        flexWrap:"wrap",
        paddingVertical:20,
        justifyContent:"center",
    },
    cafeBox:{
        flex:1, 
        flexDirection:"row", 
        flexWrap:"wrap",
        justifyContent:"center",
    },
});