import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image, SafeAreaView} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Caption } from "react-native-paper";
import constants from "../../constants";
import axios from "axios";
import Modal from "react-native-modal";
import { useMutation } from "@apollo/react-hooks";
import BasicButton from "../../components/Custom/BasicButton";
import { COMPLETE_SHOP_IMAGE, MY_SHOP } from "./OwnerQueries";

export default ({ navigation, route }) => {
    // 스크롤 ref 변수 대입 가능
    const scrollViewRef1 = React.useRef();
    const scrollViewRef2 = React.useRef();
    const scrollViewRef3 = React.useRef();
    const scrollViewRef4 = React.useRef();
    const scrollViewRef5 = React.useRef();
    const scrollViewRef6 = React.useRef();
    const [loading, setLoading] = React.useState(false);
    //모달
    const [editImageModal, setEditImageModal] = React.useState(false);

    // 모든 이미지 파일을 배열에 담긴 각각의 객체로 받아 옵니다.
    const [allImages, setAllImages] = React.useState(route.params.shopImages);
    // --------- data 관리 ---------------
    // 새로운 이미지 배열 > create
    const [newImages, setNewImages] = React.useState([]);
    
    // 수정하는 이미지 배열 > edit
    const [editImages, setEditImages] = React.useState([]);
    
    // 삭제하는 이미지 배열 > delete
    const [deleteImages, setDeleteImages] = React.useState([]);

    //선택한 이미지 index > front 수정
    const [chosenImage, setChosenImage] = React.useState();

    //이미지 추가 함수 front: list 바꾸고 back_end: data 추가
    const onSelect = ({ photo, data }) => {
        setNewImages(newImages.concat(photo.map( el => ({ type: data, url: el.uri, filename: el.filename}))))
    };

    // 이미지 수정 함수 front 바꾸고 edit list 추가
    const onEdit = ({ photo, data }) => {
        let index = editImages.findIndex(image => image.id === data.id);
        if(index > -1){
            editImages[index] = {id: data.id, type: data.type, url: photo.uri, filename: photo.filename };
        }else{
            setEditImages(editImages.concat({id: data.id, type: data.type, url: photo.uri, filename: photo.filename }));
        }
        setAllImages(allImages.map((el) => el.id === data.id ? {...el, url:photo.uri} : el))
    };

    //이미지 삭제 > id 있으면 삭제 리스트 추가 없으면 삭제
    const deleteImage = ( image ) => {
        if(image.id) {
            setDeleteImages(deleteImages.concat({id:image.id})),
            setEditImages(editImages.filter(el => el.id !== image.id))
            setAllImages(allImages.filter((el) => el.id !== image.id))
        } else {
            setNewImages(newImages.filter((el) => el !== image))
        }
        return setEditImageModal(false)
    };

    const [ completeShopImageMutation ] = useMutation(COMPLETE_SHOP_IMAGE);
    
    const handleSubmit = async () => {
        setLoading(true);
        try {
            if(newImages.length > 0){
                const formNewImages = new FormData();
                for (var i = 0; i < newImages.length; i++) {
                    formNewImages.append('file', {
                        name: newImages[i].filename,
                        type: "image/jpeg",
                        uri: newImages[i].url,
                    });
                }
                const {
                    data: { location : newImageUrls }
                } = await axios.post("http://172.30.1.11:4000/api/upload", formNewImages, {
                    headers: {
                      "content-type": "multipart/form-data"
                    }
                });
                for (var i = 0; i < newImages.length; i++) {
                    newImages[i] = {
                        type: newImages[i].type,
                        url: newImageUrls[i].url
                    }
                }
            }

            if(editImages.length > 0){
                const formEditImages = new FormData();
                for (var i = 0; i < editImages.length; i++) {
                    formEditImages.append('file', {
                        name: editImages[i].filename,
                        type: "image/jpeg",
                        uri: editImages[i].url,
                    });
                }
                const {
                    data: { location : editImageUrls }
                } = await axios.post("http://172.30.1.11:4000/api/upload", formEditImages, {
                    headers: {
                      "content-type": "multipart/form-data"
                    }
                });
                for (var i = 0; i < editImages.length; i++) {
                    editImages[i] = {
                        id:editImages[i].id,
                        type: editImages[i].type,
                        url: editImageUrls[i].url
                    }
                }
            }

            console.log(newImages);
            const {
                data : { completeShopImage }
            } = await completeShopImageMutation({
                variables:{
                    createImages:[...newImages],
                    deleteImages:[...deleteImages],
                    editImages:[...editImages]
                }
            });
            if(completeShopImage){
                navigation.goBack()
            }
        } catch(e) {
          console.log("가게 이미지 에러:",e)
        } finally {
          setLoading(false);
        }
    }
    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.inner}>

                    <View style={styles.box}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10, alignItems:"center"}}>
                            <Text style={styles.title}>외부 사진{`\n`}<Caption>출입구를 한눈에 보여주세요</Caption></Text>

                            <TouchableOpacity style={{flexDirection:"row"}} disabled={loading} onPress={() => (
                              navigation.navigate('최근 항목', {
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
                                            <TouchableOpacity key={index} disabled={loading} onPress={()=> (
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
                                        <TouchableOpacity key={index} disabled={loading} onPress={()=> (
                                            setEditImageModal(true),
                                            setChosenImage(image)
                                        )}>
                                            <Image style={styles.image} source={{uri:image.url}} />
                                        </TouchableOpacity>
                                    )
                                )}

                                {allImages.filter((image) => image.type === "EXTERIOR").length + newImages.filter((image) => image.type === "EXTERIOR").length === 0 && (
                                    <View style={styles.imageNull}/>
                                )}

                            </ScrollView>
                        </View>
                    </View>

                    <View style={styles.box}>
                        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10, alignItems:"center"}}>
                            <Text style={styles.title}>홀 사진{`\n`}<Caption>인테리어/의자/테이블을 보여주세요</Caption></Text>

                            <TouchableOpacity style={{flexDirection:"row"}} disabled={loading} onPress={() => (
                              navigation.navigate('최근 항목', {
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
                                            <TouchableOpacity key={index} disabled={loading} onPress={()=> (
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
                                        <TouchableOpacity key={index} disabled={loading} onPress={()=> (
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

                            <TouchableOpacity style={{flexDirection:"row"}} disabled={loading} onPress={() => (
                              navigation.navigate('최근 항목', {
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
                                            <TouchableOpacity key={index} disabled={loading} onPress={()=> (
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
                                        <TouchableOpacity key={index} disabled={loading} onPress={()=> (
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

                            <TouchableOpacity style={{flexDirection:"row"}} disabled={loading} onPress={() => (
                              navigation.navigate('최근 항목', {
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
                                            <TouchableOpacity key={index} disabled={loading} onPress={()=> (
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
                                        <TouchableOpacity key={index} disabled={loading} onPress={()=> (
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

                            <TouchableOpacity style={{flexDirection:"row"}} disabled={loading} onPress={() => (
                              navigation.navigate('최근 항목', {
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
                                            <TouchableOpacity key={index} disabled={loading} onPress={()=> (
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
                                        <TouchableOpacity key={index} disabled={loading} onPress={()=> (
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

                            <TouchableOpacity style={{flexDirection:"row"}} disabled={loading} onPress={() => (
                              navigation.navigate('최근 항목', {
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
                                            <TouchableOpacity key={index} disabled={loading} onPress={()=> (
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
                                        <TouchableOpacity key={index} disabled={loading} onPress={()=> (
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
                    <BasicButton text={'사진 올리기'} onPress={handleSubmit} loading={loading} disabled={newImages.length + deleteImages.length + editImages.length > 0 ? loading : true} />
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
                            data: chosenImage
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
        </SafeAreaView>
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
