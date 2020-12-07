import { FontAwesome5, MaterialCommunityIcons, Fontisto } from "@expo/vector-icons";
import * as React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Caption from "../../components/Custom/Caption";
import constants from "../../constants";

const WIDTH = constants.width - 40

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff"
    },
    subject:{
        justifyContent:"center",
        alignItems:"center",
        flex:1
    },
    subjectTitle:{
        paddingTop:5,
        fontSize:12,
        color: "rgba(0, 0, 0, .5)"
    },
    flexBox:{
        width: WIDTH,
        marginVertical:30,
    },
    question:{
        fontSize:14,
        color:"black",
        fontWeight:"bold",
        marginBottom:10
    },
})

export default () => {
    const [user, setUser] = React.useState('Franchise');
    return(
    <View style={styles.container}> 
        <ScrollView contentContainerStyle={{padding:10, flexGrow:1}}>
            {/* 입점 업체 알림 */}
                <View style={{flexDirection:"row", marginTop:30}}>
                    <TouchableWithoutFeedback onPress={()=> setUser("Franchise")}>
                        <View style={styles.subject}>
                            <Fontisto name="surgical-knife" size={26} color="rgba(0, 0, 0, .3)" />
                            <Text style={[styles.subjectTitle, {marginTop:5}]}>음식판매</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={()=> setUser("Visitor")}>
                        <View style={styles.subject}>
                            <MaterialCommunityIcons name="silverware-fork" size={30} color="rgba(0, 0, 0, .3)" />
                            <Text style={styles.subjectTitle}>방문고객</Text>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={()=> setUser("Owner")}>
                        <View style={styles.subject}>
                            <Fontisto name="shopping-store" size={26} color="rgba(0, 0, 0, .3)" />
                            <Text style={[styles.subjectTitle, {marginTop:5}]}>공간등록</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                
                {user === "Franchise" && (
                    <View style={{flex:1, padding:20}}>
                        <View style={styles.flexBox}>
                            <Text style={styles.question}>Q. 공유 음식점은 어떻게 빌릴 수 있나요?</Text>
                            <Caption style={{lineHeight:20}}>{`푸드 인사이드는 단순하게 공간을 빌려주는 앱이 아닙니다.\n\n공유 음식점을 예약하면 모든 사용자에게 여러분의 음식 정보가 나타납니다. 매일 똑같은 음식에 지친 소비자에게 여러분의 음식은 새로움을 선사하죠.\n\n그럼 일단 방문객에게 보여줄 업체 정보를 등록해야겠죠? \n\n'입점 업체'를 선택한 후 '프로필 신청'을 눌러 메뉴를 등록해주세요\n'프로필'이 완성되면 공유 음식점을 예약할 수 있습니다.`}
                            </Caption>
                        </View>
                        <View style={styles.flexBox}>
                            <Text style={styles.question}>Q. 프로필을 신청하니 심사 중이라고 나옵니다, 기준이 뭔가요?</Text>
                            <Caption style={{lineHeight:20}}>{`푸드 인사이드 입점 기준은 차별성입니다.\n만약 100명이 '김치찌개'를 등록한다면, 먼저 신청한 사람이 등록됩니다.\n시간이 지날수록 단순한 메뉴로 입점하기 어렵겠죠?`}</Caption>
                        </View>
                        <View style={styles.flexBox}>
                            <Text style={styles.question}>Q. 등록한 메뉴를 바꿀 수 있나요?</Text>
                            <Caption style={{lineHeight:20}}>{`처음에 등록한 메뉴는 이름과 사진을 변경할 수 없습니다.\n다만, 가격은 수정할 수 있고, 새로운 메뉴를 추가/삭제할 수 있습니다.\n\n경력 또한 수정할 수 없기 때문에 '일식 경력 7년' 보다는 '일식 경력 7년 이상'으로 작성해 주세요`}</Caption>
                        </View>
                        <View style={styles.flexBox}>
                            <Text style={styles.question}>Q. 심사에 어느정도 시간이 걸리나요?</Text>
                            <Caption style={{lineHeight:20}}>{`심사는 보통 2~3일 정도 소요됩니다.\n현재 갑작스러운 확진자 수의 증가로 심사를 잠시 멈춘 상태입니다. 심사는 선착순으로 이루어 지니 미리 신청해 주세요`}</Caption>
                        </View>
                        <View style={styles.flexBox}>
                            <Text style={styles.question}>Q. 영업 전에 준비해야 할게 있나요?</Text>
                            <Caption style={{lineHeight:20}}>{`영업 중 대표자는 '위생교육수료증'을. 모든 참여 인원은 1년 이내 '보건증'을 소지해야 합니다. 또 방문객에게 보여줄 60cmx180cm 배너를 준비해주세요`}</Caption>
                        </View>
                        <View style={styles.flexBox}>
                            <Text style={styles.question}>Q. 언제부터 음식을 판매할 수 있나요?</Text>
                            <Caption style={{lineHeight:20}}>{`현재 많은 분께서 메뉴를 등록주셨습니다.\n푸드 인사이드도 하루빨리 여러분에게 새로운 음식으로 인사드리고 싶은 마음이 간절합니다.\n\n하지만 최근 확진자 수가 급격하게 증가했습니다.\n확산의 속도를 역학조사가 따라가지 못하는 현 시점에서 무리한 진행은 코로나 확산 방지에 악영향을 미칠것으로 사료됩니다.\n\n때문에 공유 음식점 영업은 향후 확진자 수의 변화와 거리두기 추이를 보고 다시 안내드리겠습니다.\n\n가장 필요한 순간에 도움을 드리지 못해 대단히 죄송합니다. `}</Caption>
                        </View>
                    </View>
                )}

                {user === "Visitor" && (
                    <View style={{flex:1, padding:20}}>
                        <View style={styles.flexBox}>
                            <Text style={styles.question}>Q. 영업 중인 음식점이 한 곳도 없습니다</Text>
                            <Caption style={{lineHeight:20}}>{`현재 바이러스의 확산으로 공유 음식점 영업이 잠시 중단되었습니다.`}</Caption>
                        </View>
                        <View style={styles.flexBox}>
                            <Text style={styles.question}>Q. '단골'은 무엇인가요?</Text>
                            <Caption style={{lineHeight:20}}>{`마음에 드는 업체의 '단골'버튼을 눌러주세요, 해당 업체의 영업 날짜와 장소를 미리 알 수 있고 할인된 가격으로 음식을 밋볼 수 있습니다.`}</Caption>
                        </View>
                    </View>
                )}

                {user === "Owner" && (
                    <View style={{flex:1, padding:20}}>
                        <View style={styles.flexBox}>
                            <Text style={styles.question}>Q. 내 음식점도 등록할 수 있나요?</Text>
                            <Caption style={{lineHeight:20}}>{`푸드 인사이드는 한 상권안에 공유 음식점을 여러곳 가맹하여 랜덤 음식점 골목을 형성합니다. 주변 음식점과 함께 신청하면 등록할 수 있습니다.`}</Caption>
                        </View>
                        <View style={styles.flexBox}>
                            <Text style={styles.question}>Q. 꼭 쉬는 날만 빌려줘야 하나요?</Text>
                            <Caption style={{lineHeight:20}}>{`임대 날짜는 점주가 직접 정할 수 있습니다.`}</Caption>
                        </View>
                        <View style={styles.flexBox}>
                            <Text style={styles.question}>Q. 임대 가격은 얼마가 적당할까요?</Text>
                            <Caption style={{lineHeight:20}}>{`가격은 상가 임대료에 따라 다르겠지만 기본적으로 점주가 설정합니다. 하지만 처음부터 너무 높은 가격으로 책정한다면 입점 업체가 수익을 내기 어려워 다시 입점하지 않겠죠?`}</Caption>
                        </View>
                        <View style={styles.flexBox}>
                            <Text style={styles.question}>Q. 구체적인 내용은 어디로 문의하죠?</Text>
                            <Caption style={{lineHeight:20}}>{`ljo.foodinside@gmail.com으로 문의 주세요`}</Caption>
                        </View>
                    </View>
                )}
        </ScrollView>
    </View>   
    )
}