import * as React from "react";
import { StyleSheet, View, Text} from "react-native";
import { MaterialCommunityIcons, Entypo, FontAwesome5, Ionicons, Feather } from "@expo/vector-icons"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import SquareInput from "../../components/Custom/SquareInput";

const facility = {
    fridge:{
        "25": false,
        "30": false,
        "45": false,
        "65": false,
        "기타": false,
    },
    fridge_ect:{
        "음료 쇼케이스": false,
        "테이블": false,
        "밧드": false,
        "김치": false,
        "참치": false,
        "와인": false,
        "아이스크림": false,
        "기타": false,
    },
    fire:{
        "낮은 레인지": false,
        "중화 레인지": false,
        "업소용 레인지": false,
        "가정용 레인지": false,
        "인덕션 레인지": false,
        "기타": false,
    },
    griller:{
        "상화식": false,
        "하화식": false,
        "숯불": false,
        "기타": false,
    },
    griddle:{
        "600": false,
        "900": false,
        "1200": false,
        "1500": false,
        "기타": false,
    },
    fryer:{
        "전기식": false,
        "가스식": false,
        "기타": false,
    },
    oven:{
        "데크": false,
        "컨벡션": false,
        "스팀 컨벡션": false,
        "콤비 스티머": false,
        "기타": false,
    },
    cafe:{
        "에스프레소 머신": null,
        "원두 그라인더": null,
        "온수기": null,
        "제빙기": null,
        "블렌더": null,
        "로스팅 머신": null,
        "기타": null,
    },
    Electronics:{
        "전기 밥솥": false,
        "전기 국통": false,
        "식기 세척기": false,
        "전자 레인지": false,
        "take out 포장기": false,
        "인덕션": false,
        "믹서기": false,
        "온장고": false,
        "반죽기": false,
        "발효기": false,
        "제빙기": false,
        "빙삭기": false,
        "해면기": false,
        "제면기계": false,
        "파스타 기계": false,
        "냉면 기계": false,
        "탄산음료 기계": false,
        "소프트아이스크림 기계": false,
        "생맥주 디스펜서 + 탄산가스": false,
    },
    tableware:{
        "수저통": false,
        "냅킨통": false,
        "양념통": false,
        "물수건": false,
        "오프너": false,
        "수저": false,
        "젓가락": false,
        "포크": false,
        "나이프": false,
        "쟁반": false,
        "물병": false,
        "주전자": false,
        "가스버너": false,
        "호출벨": false,
    },
    container:{
        "보울": false,
        "스텐밧드": false,
        "대형 국통": false,
        "플라스틱 밧드": false,
        "유리 밧드": false,
        "반찬통": false,
        "대야": false,
        "take out 용기": false,
    },
    glass:{
        "음료": false,
        "물": false,
        "머그": false,
        "소주": false,
        "사케": false,
        "고량주": false,
        "샷": false,
        "와인": false,
        "샴페인": false,
        "칵테일": false,
        "언더락": false,
        "하이볼": false,
        "글라스": false,
        "500cc": false,
        "2000cc": false,
        "3000cc": false,
    },
    serving:{
        "공기": false,
        "접시류": false,
        "뚝배기": false,
        "옹기": false,
        "돌솥": false,
        "냄비": false,
        "볶음판": false,
        "찬기": false,
        "종지": false,
        "쿠프": false,
        "대접": false,
        "볼": false,
        "가위": false,
        "국자": false,
    },
    cleaner:{
        "주방 세제": false,
        "락스": false,
        "살균 세척제": false,
        "빗자루": false,
        "쓰레받기": false,
        "밀대": false,
        "양동이": false,
        "호스": false,
        "마포": false,
        "청소솔": false,
        "진공청소기": false,
    },
    ect:{
        "음향 기기": false,
        "TV": false,
        "프롬프터": false,
        "에어컨": false,
        "와이파이": false,
        "CCTV": false,
        "무인 키오스크": false,
        "우산 꽂이": false,
    }

}

export default () => {
    const [data, setData] = React.useState(facility);
    const valueChanger = ( type, key, value) => {
        let target = data[type];
        let newData = Object.assign(target, {[key] : !value});
        let hi = Object.assign(data, {[type] : newData});
        setData({...hi})
    };
    return (
    <View style={styles.container}> 
        <ScrollView>
            <View style={styles.inner}>

            <View style={styles.box}>
                <MaterialCommunityIcons name="snowflake" size={30} color="#00c4f6"/>

                <View style={styles.rowBox}>
                    <View style={styles.titleBox}>
                        <Text style={styles.title}>Box 냉장고</Text>
                    </View>

                    <View style={styles.listBox}>
                        {Object.entries(data.fridge).map(([key,value])=>{
                            return (
                                <TouchableOpacity key={key} onPress={() => valueChanger("fridge", key, value)}>
                                    <Text style={value? styles.item_true : styles.item_false}>{key}</Text>
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
                        {Object.entries(data.fridge_ect).map(([key,value])=>{
                            return (
                                <TouchableOpacity key={key} onPress={() => valueChanger("fridge_ect", key, value)}>
                                    <Text style={value? styles.item_true : styles.item_false}>{key}</Text>
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
                        {Object.entries(data.fire).map(([key,value])=>{
                            return (
                                <TouchableOpacity key={key} onPress={() => valueChanger("fire", key, value)}>
                                    <Text style={value? styles.item_true : styles.item_false}>{key}</Text>
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
                        {Object.entries(data.griller).map(([key,value])=>{
                            return (
                                <TouchableOpacity key={key} onPress={() => valueChanger("griller", key, value)}>
                                    <Text style={value? styles.item_true : styles.item_false}>{key}</Text>
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
                        {Object.entries(data.griddle).map(([key,value])=>{
                            return (
                                <TouchableOpacity key={key} onPress={() => valueChanger("griddle", key, value)}>
                                    <Text style={value? styles.item_true : styles.item_false}>{key}</Text>
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
                        {Object.entries(data.fryer).map(([key,value])=>{
                            return (
                                <TouchableOpacity key={key} onPress={() => valueChanger("fryer", key, value)}>
                                    <Text style={value? styles.item_true : styles.item_false}>{key}</Text>
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
                        {Object.entries(data.oven).map(([key,value])=>{
                            return (
                                <TouchableOpacity key={key} onPress={() => valueChanger("oven", key, value)}>
                                    <Text style={value? styles.item_true : styles.item_false}>{key}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </View>
            </View>

            <View style={styles.box}>
                <Ionicons name="ios-cafe" size={30} color="#c1a183"/>

                <View style={styles.noTitleBox}>
                    {Object.entries(data.cafe).map(([key,value])=>{
                        return (
                            <TouchableOpacity key={key} onPress={() => valueChanger("cafe", key, value)}>
                                <Text style={value? styles.item_true : styles.item_false}>{key}</Text>
                                <SquareInput />
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <View style={styles.box}>
                <Entypo name="flash" size={24} color="#f7ca09" />

                <View style={styles.noTitleBox}>
                    {Object.entries(data.Electronics).map(([key,value])=>{
                        return (
                            <TouchableOpacity key={key} onPress={() => valueChanger("Electronics", key, value)}>
                                <Text style={value? styles.item_true : styles.item_false}>{key}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <View style={styles.box}>
                <Entypo name="download" size={24} color="#a7a6b0" />

                <View style={styles.noTitleBox}>
                    {Object.entries(data.container).map(([key,value])=>{
                        return (
                            <TouchableOpacity key={key} onPress={() => valueChanger("container", key, value)}>
                                <Text style={value? styles.item_true : styles.item_false}>{key}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <View style={styles.box}>
                <MaterialCommunityIcons name="silverware-variant" size={30} color="#cacece" />

                <View style={styles.noTitleBox}>
                    {Object.entries(data.tableware).map(([key,value])=>{
                        return (
                            <TouchableOpacity key={key} onPress={() => valueChanger("tableware", key, value)}>
                                <Text style={value? styles.item_true : styles.item_false}>{key}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <View style={styles.box}>
                <MaterialCommunityIcons name="glass-cocktail" size={30} color="#b0f8ef" />

                <View style={styles.noTitleBox}>
                    {Object.entries(data.glass).map(([key,value])=>{
                        return (
                            <TouchableOpacity key={key} onPress={() => valueChanger("glass", key, value)}>
                                <Text style={value? styles.item_true : styles.item_false}>{key}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <View style={styles.box}>
                <FontAwesome5 name="hand-holding" size={24} color="black" style={{marginBottom:8}}/>

                <View style={styles.noTitleBox}>
                    {Object.entries(data.serving).map(([key,value])=>{
                        return (
                            <TouchableOpacity key={key} onPress={() => valueChanger("serving", key, value)}>
                                <Text style={value? styles.item_true : styles.item_false}>{key}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <View style={styles.box}>
                <Entypo name="trash" size={22} color="#0735c6" style={{marginBottom:3}}/>

                <View style={styles.noTitleBox}>
                    {Object.entries(data.cleaner).map(([key,value])=>{
                        return (
                            <TouchableOpacity key={key} onPress={() => valueChanger("cleaner", key, value)}>
                                <Text style={value? styles.item_true : styles.item_false}>{key}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            <View style={styles.box}>
                <Feather name="more-horizontal" size={24} color="#000000"/>

                <View style={styles.noTitleBox}>
                    {Object.entries(data.ect).map(([key,value])=>{
                        return (
                            <TouchableOpacity key={key} onPress={() => valueChanger("ect", key, value)}>
                                <Text style={value? styles.item_true : styles.item_false}>{key}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>

            </View>
        </ScrollView>
    </View>    
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
});