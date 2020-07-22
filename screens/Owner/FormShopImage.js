import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Caption } from "react-native-paper";
import constants from "../../constants";
import Modal from "react-native-modal";

const files = [
    {
        id:'a',
        type:'EXTERIOR',
        url:'asdfkj',
    },
    {
        id:'b',
        type:'EXTERIOR',
        url:'asdfkj2',
    },
    {
        id:'c',
        type:'EXTERIOR',
        url:'asdfkj3',
    },
    {
        id:'d',
        type:'EXTERIOR',
        url:'asdfkj4',
    },
    {
        id:'a1',
        type:'HALL',
        url:'ㄱㄴㄷㄹ1',
    },
    {
        id:'b1',
        type:'HALL',
        url:'ㄱㄴㄷㄹ2',
    },
    {
        id:'c1',
        type:'HALL',
        url:'ㄱㄴㄷㄹ3',
    },
    {
        id:'d1',
        type:'HALL',
        url:'ㄱㄴㄷㄹ4',
    },
    {
        id:'ㄱ1',
        type:'KITCHEN',
        url:'abcd1',
    },
    {
        id:'ㄴ1',
        type:'KITCHEN',
        url:'abcd2',
    },
    {
        id:'ㄷ1',
        type:'KITCHEN',
        url:'abcd3',
    },
    {
        id:'ㄹ1',
        type:'KITCHEN',
        url:'abcd4',
    },
    {
        id:'ㄱ11',
        type:'TABLEWARE',
        url:'abcd12',
    },
    {
        id:'ㄴ11',
        type:'TABLEWARE',
        url:'abcd22',
    },
    {
        id:'ㄷ11',
        type:'TABLEWARE',
        url:'abcd32',
    },
    {
        id:'ㄹ11',
        type:'TABLEWARE',
        url:'abcd43',
    },
    {
        id:'ㄱ22',
        type:'CLEANER',
        url:'gggggs1',
    },
    {
        id:'ㄴ22',
        type:'CLEANER',
        url:'gggggs2',
    },
    {
        id:'ㄷ22',
        type:'CLEANER',
        url:'gggggs33',
    },
    {
        id:'ㄹ22',
        type:'CLEANER',
        url:'gggggs3',
    },
    {
        id:'ㄱ35',
        type:'ECT',
        url:'gggggaas1',
    },
    {
        id:'ㄴ35',
        type:'ECT',
        url:'gggaaggs2',
    },
    {
        id:'ㄷ35',
        type:'ECT',
        url:'ggsgggs33',
    },
    {
        id:'ㄹ35',
        type:'ECT',
        url:'ggsgggs3',
    }
]

export default ({ navigation, route }) => {
    // 스크롤 ref 변수 대입 가능
    const scrollViewRef1 = React.useRef();
    const scrollViewRef2 = React.useRef();
    const scrollViewRef3 = React.useRef();
    const scrollViewRef4 = React.useRef();
    const scrollViewRef5 = React.useRef();
    const scrollViewRef6 = React.useRef();

    //모달
    const [editImageModal, setEditImageModal] = React.useState(false);

    // 모든 이미지 파일을 배열이 아닌 각각의 객체로 받아 옵니다.
    const [allImages, setAllImages] = React.useState(route.params.shopImages);
    console.log(allImages);
    
    // --------- data 관리 ---------------
    // 새로운 이미지 배열 > create
    const [newImages, setNewImages] = React.useState([]);

    // 수정하는 이미지 배열 > edit
    const [editImages, setEditImages] = React.useState([]);

    // 삭제하는 이미지 배열 > delete
    const [deletImages, setDeletImages] = React.useState([]);

    //선택한 이미지 index > front 수정
    const [chosenImage, setChosenImage] = React.useState();

    //이미지 추가 함수 front list 바꾸고 back_end data 추가
    const onSelect = ({ photo, data }) => {
        setNewImages(newImages.concat({type:data, url:photo.uri}))
    };

    // 이미지 수정 함수 front 바꾸고 edit list 추가
    const onEdit = ({ photo, data }) => {
        setAllImages(allImages.map((el) => el.id === data ? {...el, url:photo.uri} : el))
        setEditImages(editImages.concat({id:data, url:photo.uri}))
    };

    //이미지 삭제 > id 있으면 삭제 리스트 추가 없으면 삭제
    const deleteImage = ( image ) => {
        if(image.id) {
            setDeletImages(deletImages.concat(image.id)),
            setAllImages(allImages.filter((el) => el.id !== image.id))
        } else {
            setNewImages(newImages.filter((el) => el !== image))
        }
        return setEditImageModal(false)
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.inner}>

                    <View style={styles.box}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10, alignItems:"center"}}>
                            <Text style={styles.title}>외부 사진{`\n`}<Caption>출입구를 한눈에 보여주세요</Caption></Text>

                            <TouchableOpacity style={{flexDirection:"row"}} onPress={() => (
                              navigation.navigate('SelectPhoto', {
                                onSelect : onSelect,
                                data: 'EXTERIOR'
                              })
                            )}>
                                <MaterialCommunityIcons name="camera" size={20} color="#666"
                                  style={{
                                    opacity: 0.7,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingRight:5
                                  }}
                                />
                                <Text style={{color:'#666'}}>사진 선택</Text>
                            </TouchableOpacity>
                        </View>
                          
                        <View style={styles.imageRoll}>
                            <ScrollView 
                                ref={scrollViewRef1}
                                onContentSizeChange={()=>{        
                                    scrollViewRef1.current.scrollToEnd({ animated: true });
                                }}
                                scrollEventThrottle={1} 
                                contentContainerStyle={{paddingLeft:10, flexGrow:1}} 
                                showsHorizontalScrollIndicator={false} 
                                horizontal
                            >   
                                {allImages.filter((image) => image.type === "EXTERIOR").map(
                                    (image, index) => (
                                            <TouchableOpacity key={index} onPress={()=> (
                                                setEditImageModal(true),
                                                setChosenImage(image)
                                            )}>
                                                <Image style={styles.image} source={{uri:image.url}} />
                                            </TouchableOpacity>
                                    )
                                )
                                }

                                {newImages.filter((image) => image.type === "EXTERIOR").map(
                                    (image, index) => (
                                        <TouchableOpacity key={index} onPress={()=> (
                                            setEditImageModal(true),
                                            setChosenImage(image)
                                        )}>
                                            <Image style={styles.image} source={{uri:image.url}} />
                                        </TouchableOpacity>
                                    )
                                )
                                }

                                {allImages.filter((image) => image.type === "EXTERIOR").length + newImages.filter((image) => image.type === "EXTERIOR").length === 0 && (
                                    <View style={styles.imageNull}/>
                                ) 

                                }

                            </ScrollView>
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10, alignItems:"center"}}>
                            <Text style={styles.title}>홀 사진{`\n`}<Caption>인테리어/의자/테이블을 보여주세요</Caption></Text>

                            <TouchableOpacity style={{flexDirection:"row"}} onPress={() => (
                              navigation.navigate('SelectPhoto', {
                                onSelect : onSelect,
                                data: 'HALL'
                              })
                            )}>
                                <MaterialCommunityIcons name="camera" size={20} color="#666"
                                  style={{
                                    opacity: 0.7,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingRight:5
                                  }}
                                />
                                <Text style={{color:'#666'}}>사진 선택</Text>
                            </TouchableOpacity>
                        </View>
                          
                        <View style={styles.imageRoll}>
                            <ScrollView 
                                ref={scrollViewRef2}
                                onContentSizeChange={()=>{        
                                    scrollViewRef2.current.scrollToEnd({ animated: true });
                                }}
                                scrollEventThrottle={1} 
                                contentContainerStyle={{paddingLeft:10, flexGrow:1}} 
                                showsHorizontalScrollIndicator={false} 
                                horizontal
                            >   
                                {allImages.filter((image) => image.type === "HALL").map(
                                    (image, index) => (
                                            <TouchableOpacity key={index} onPress={()=> (
                                                setEditImageModal(true),
                                                setChosenImage(image)
                                            )}>
                                                <Image style={styles.image} source={{uri:image.url}} />
                                            </TouchableOpacity>
                                    )
                                )
                                }

                                {newImages.filter((image) => image.type === "HALL").map(
                                    (image, index) => (
                                        <TouchableOpacity key={index} onPress={()=> (
                                            setEditImageModal(true),
                                            setChosenImage(image)
                                        )}>
                                            <Image style={styles.image} source={{uri:image.url}} />
                                        </TouchableOpacity>
                                    )
                                )
                                }

                                {allImages.filter((image) => image.type === "HALL").length + newImages.filter((image) => image.type === "HALL").length === 0 && (
                                    <View style={styles.imageNull}/>
                                ) 

                                }

                            </ScrollView>
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10, alignItems:"center"}}>
                            <Text style={styles.title}>주방 사진{`\n`}<Caption>주방구조/조리기기를 보여주세요</Caption></Text>

                            <TouchableOpacity style={{flexDirection:"row"}} onPress={() => (
                              navigation.navigate('SelectPhoto', {
                                onSelect : onSelect,
                                data: 'KITCHEN'
                              })
                            )}>
                                <MaterialCommunityIcons name="camera" size={20} color="#666"
                                  style={{
                                    opacity: 0.7,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingRight:5
                                  }}
                                />
                                <Text style={{color:'#666'}}>사진 선택</Text>
                            </TouchableOpacity>
                        </View>
                          
                        <View style={styles.imageRoll}>
                            <ScrollView 
                                ref={scrollViewRef3}
                                onContentSizeChange={()=>{        
                                    scrollViewRef3.current.scrollToEnd({ animated: true });
                                }}
                                scrollEventThrottle={1} 
                                contentContainerStyle={{paddingLeft:10, flexGrow:1}} 
                                showsHorizontalScrollIndicator={false} 
                                horizontal
                            >   
                                {allImages.filter((image) => image.type === "KITCHEN").map(
                                    (image, index) => (
                                            <TouchableOpacity key={index} onPress={()=> (
                                                setEditImageModal(true),
                                                setChosenImage(image)
                                            )}>
                                                <Image style={styles.image} source={{uri:image.url}} />
                                            </TouchableOpacity>
                                    )
                                )
                                }

                                {newImages.filter((image) => image.type === "KITCHEN").map(
                                    (image, index) => (
                                        <TouchableOpacity key={index} onPress={()=> (
                                            setEditImageModal(true),
                                            setChosenImage(image)
                                        )}>
                                            <Image style={styles.image} source={{uri:image.url}} />
                                        </TouchableOpacity>
                                    )
                                )
                                }

                                {allImages.filter((image) => image.type === "KITCHEN").length + newImages.filter((image) => image.type === "KITCHEN").length === 0 && (
                                    <View style={styles.imageNull}/>
                                ) 

                                }

                            </ScrollView>
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10, alignItems:"center"}}>
                            <Text style={styles.title}>식기 사진{`\n`}<Caption>식기류/잔을 보여주세요</Caption></Text>

                            <TouchableOpacity style={{flexDirection:"row"}} onPress={() => (
                              navigation.navigate('SelectPhoto', {
                                onSelect : onSelect,
                                data: 'TABLEWARE'
                              })
                            )}>
                                <MaterialCommunityIcons name="camera" size={20} color="#666"
                                  style={{
                                    opacity: 0.7,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingRight:5
                                  }}
                                />
                                <Text style={{color:'#666'}}>사진 선택</Text>
                            </TouchableOpacity>
                        </View>
                          
                        <View style={styles.imageRoll}>
                            <ScrollView 
                                ref={scrollViewRef4}
                                onContentSizeChange={()=>{        
                                    scrollViewRef4.current.scrollToEnd({ animated: true });
                                }}
                                scrollEventThrottle={1} 
                                contentContainerStyle={{paddingLeft:10, flexGrow:1}} 
                                showsHorizontalScrollIndicator={false} 
                                horizontal
                            >   
                                {allImages.filter((image) => image.type === "TABLEWARE").map(
                                    (image, index) => (
                                            <TouchableOpacity key={index} onPress={()=> (
                                                setEditImageModal(true),
                                                setChosenImage(image)
                                            )}>
                                                <Image style={styles.image} source={{uri:image.url}} />
                                            </TouchableOpacity>
                                    )
                                )
                                }

                                {newImages.filter((image) => image.type === "TABLEWARE").map(
                                    (image, index) => (
                                        <TouchableOpacity key={index} onPress={()=> (
                                            setEditImageModal(true),
                                            setChosenImage(image)
                                        )}>
                                            <Image style={styles.image} source={{uri:image.url}} />
                                        </TouchableOpacity>
                                    )
                                )
                                }

                                {allImages.filter((image) => image.type === "TABLEWARE").length + newImages.filter((image) => image.type === "TABLEWARE").length === 0 && (
                                    <View style={styles.imageNull}/>
                                ) 

                                }

                            </ScrollView>
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10, alignItems:"center"}}>
                            <Text style={styles.title}>청소 도구 사진{`\n`}<Caption>청소 도구를 보여주세요</Caption></Text>

                            <TouchableOpacity style={{flexDirection:"row"}} onPress={() => (
                              navigation.navigate('SelectPhoto', {
                                onSelect : onSelect,
                                data: 'CLEANER'
                              })
                            )}>
                                <MaterialCommunityIcons name="camera" size={20} color="#666"
                                  style={{
                                    opacity: 0.7,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingRight:5
                                  }}
                                />
                                <Text style={{color:'#666'}}>사진 선택</Text>
                            </TouchableOpacity>
                        </View>
                          
                        <View style={styles.imageRoll}>
                            <ScrollView 
                                ref={scrollViewRef5}
                                onContentSizeChange={()=>{        
                                    scrollViewRef5.current.scrollToEnd({ animated: true });
                                }}
                                scrollEventThrottle={1} 
                                contentContainerStyle={{paddingLeft:10, flexGrow:1}} 
                                showsHorizontalScrollIndicator={false} 
                                horizontal
                            >   
                                {allImages.filter((image) => image.type === "CLEANER").map(
                                    (image, index) => (
                                            <TouchableOpacity key={index} onPress={()=> (
                                                setEditImageModal(true),
                                                setChosenImage(image)
                                            )}>
                                                <Image style={styles.image} source={{uri:image.url}} />
                                            </TouchableOpacity>
                                    )
                                )
                                }

                                {newImages.filter((image) => image.type === "CLEANER").map(
                                    (image, index) => (
                                        <TouchableOpacity key={index} onPress={()=> (
                                            setEditImageModal(true),
                                            setChosenImage(image)
                                        )}>
                                            <Image style={styles.image} source={{uri:image.url}} />
                                        </TouchableOpacity>
                                    )
                                )
                                }

                                {allImages.filter((image) => image.type === "CLEANER").length + newImages.filter((image) => image.type === "CLEANER").length === 0 && (
                                    <View style={styles.imageNull}/>
                                ) 

                                }

                            </ScrollView>
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10, alignItems:"center"}}>
                            <Text style={styles.title}>기타{`\n`}<Caption>기타 물품(포장 용품/빔 프로젝터 등)을 보여주세요</Caption></Text>

                            <TouchableOpacity style={{flexDirection:"row"}} onPress={() => (
                              navigation.navigate('SelectPhoto', {
                                onSelect : onSelect,
                                data: 'ECT'
                              })
                            )}>
                                <MaterialCommunityIcons name="camera" size={20} color="#666"
                                  style={{
                                    opacity: 0.7,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    paddingRight:5
                                  }}
                                />
                                <Text style={{color:'#666'}}>사진 선택</Text>
                            </TouchableOpacity>
                        </View>
                          
                        <View style={styles.imageRoll}>
                            <ScrollView 
                                ref={scrollViewRef6}
                                onContentSizeChange={()=>{        
                                    scrollViewRef6.current.scrollToEnd({ animated: true });
                                }}
                                scrollEventThrottle={1} 
                                contentContainerStyle={{paddingLeft:10, flexGrow:1}} 
                                showsHorizontalScrollIndicator={false} 
                                horizontal
                            >   
                                {allImages.filter((image) => image.type === "ECT").map(
                                    (image, index) => (
                                            <TouchableOpacity key={index} onPress={()=> (
                                                setEditImageModal(true),
                                                setChosenImage(image)
                                            )}>
                                                <Image style={styles.image} source={{uri:image.url}} />
                                            </TouchableOpacity>
                                    )
                                )
                                }

                                {newImages.filter((image) => image.type === "ECT").map(
                                    (image, index) => (
                                        <TouchableOpacity key={index} onPress={()=> (
                                            setEditImageModal(true),
                                            setChosenImage(image)
                                        )}>
                                            <Image style={styles.image} source={{uri:image.url}} />
                                        </TouchableOpacity>
                                    )
                                )
                                }

                                {allImages.filter((image) => image.type === "ECT").length + newImages.filter((image) => image.type === "ECT").length === 0 && (
                                    <View style={styles.imageNull}/>
                                ) 

                                }

                            </ScrollView>
                        </View>
                    </View>

                </View>   
            </ScrollView>

            <Modal
                isVisible={editImageModal}
                onBackdropPress={() => setEditImageModal(false)}
                backdropColor={'#ffffff'}
                backdropOpacity={.6}
                animationIn="slideInLeft"
                animationOut="slideOutRight"
                style={{justifyContent:"center", alignItems:"center"}}
            >
                <View style={styles.content}>
                    {chosenImage && chosenImage.id ? (
                    <TouchableOpacity style={styles.modalList} onPress={()=> (
                        navigation.navigate('SelectPhoto', {
                            onSelect : onEdit,
                            data: chosenImage.id
                        }
                        ),
                        setEditImageModal(false)
                        )}>
                        <MaterialCommunityIcons name="circle-edit-outline" size={24} color="#666" /><Text style={styles.modalText}>사진 수정</Text>
                    </TouchableOpacity>) : (
                        null
                    )}
                    <TouchableOpacity style={styles.modalList} onPress={() => Alert.alert('확인','선택한 사진이 삭제됩니다.',
                        [
                          {
                            text: '취소',
                            style: 'cancel',
                          },
                          {text: '확인',
                          onPress: () => deleteImage(chosenImage),
                        },
                        ],
                        {cancelable: true},
                      )}>
                        <MaterialCommunityIcons name="delete-circle-outline" size={24} color="red" /><Text style={[styles.modalText, {color:'red'}]}>사진 삭제</Text>
                    </TouchableOpacity>
                </View>
                
            
            </Modal>
        </View>
    )
};


const WIDTH = constants.width - 20
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ffffff"
    },
    inner:{
        padding:15
    },
    box:{
        marginBottom:20
    },
    title:{
        fontSize:16,
        fontWeight:"bold"
    },
    imageRoll:{
        flexDirection:"row", 
        width:'100%', 
        paddingVertical:10,
        borderWidth:1,
        borderColor:'#e0e0e0',
        borderStyle:'dashed',
        borderRadius:10,
    },
    imageNull:{
        width: WIDTH /3,
        height: WIDTH /3,
        borderRadius:20,
        marginRight:10,
    },
    image:{
        width: WIDTH /3, 
        height: WIDTH /3, 
        borderRadius:20, 
        backgroundColor:'#e0e0e0', 
        marginRight:10 ,
    },
    //모달
    content: {
        width:WIDTH / 2,
        backgroundColor: '#ffffff',
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    modalList:{
        width:'100%',
        paddingVertical:10,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"center"
    },
    modalText:{
        fontSize:14,
        marginLeft:10
    },
})
