import * as React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from "react-native";
import constants from "../../constants";
import ShadowInput from "../../components/Custom/ShadowInput";
import axios from "axios";
import useInput from "../../hooks/useInput";
import { useMutation } from "@apollo/react-hooks";
import { UPLOAD } from "./VisitorQueries";

export default ({ navigation, route }) => {
    const [images, setImages] = React.useState();
    const tastingInput = useInput("");
    const [loading, setLoading] = React.useState(false);
    
    const scrollViewRef1 = React.useRef();
    const [uploadMutation] = useMutation(UPLOAD,{
        refetchQueries:[`me`]
    });

    const handleUpload = async () => {
        const formData = new FormData();

        for (var i = 0; i < images.length; i++) {
            formData.append('file', {
                name: images[i].filename,
                type: "image/jpeg",
                uri: images[i].uri,
            });
        }

        try {
        setLoading(true);
        const {
            data: { location }
        } = await axios.post("https://foodinside-backend.herokuapp.com/api/upload", formData, {
            headers: {
              "content-type": "multipart/form-data"
            }
        });
        
        const {
                data: { upload }
            } = await uploadMutation({
                variables: {
                    id: route.params.id,
                    tasting: tastingInput.value,
                    createFiles: location
                }
            });
            if (upload.id) {
                navigation.pop(2)
            }
        } catch (e) {
            console.log("리뷰 업로드 에러:",e)
        } finally {
            setLoading(false);
        }
    }

    navigation.setOptions({
        headerRight:() => (
            <TouchableOpacity style={loading? styles.button_disabled : styles.button} onPress={() => handleUpload()} disabled={loading}>
                {loading ? <ActivityIndicator size={"small"} color={"white"}/> : <Text style={styles.buttonText}>업로드</Text>}
           </TouchableOpacity>
        ),
    });
    React.useEffect(() => {
        setImages(route.params.images)
    },[])
    return (
        
    <ScrollView style={styles.container}>
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
                {images?.map(
                    (image, index) => (
                        <Image key={index} style={styles.image} source={{uri:image.uri}} />
                    )
                )}
            </ScrollView>
        </View>
            
        <ShadowInput {...tastingInput} editable={!loading} blurOnSubmit={false} textAlign={"left"} textAlignVertical={"top"} height={100} multiline={true} placeholder={"내용을 입력해 주세요..."} returnKeyType={"default"}/>
    </ScrollView>
    );
};

const WIDTH = constants.width - 20
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ffffff',
        padding:15,
    },
    //버튼
    button:{
        padding:5,
        paddingHorizontal:10,
        borderRadius:5,
        backgroundColor:"rgb(5, 230, 244)",
        marginRight:10,
        width:70,
        alignItems:"center"
    },
    button_disabled:{
        padding:5,
        paddingHorizontal:10,
        borderRadius:5,
        backgroundColor:"rgba(5, 230, 244, .4)",
        marginRight:10,
        width:70,
        alignItems:"center"
    },
    buttonText:{
        color:'#ffffff',
        fontSize:16,
    },
    //이미지 롤
    imageRoll:{
        flexDirection:"row", 
        width:'100%', 
        paddingVertical:10,
        borderWidth:1,
        borderColor:'#e0e0e0',
        borderStyle:'dashed',
        borderRadius:10,
        marginBottom:20
    },
    image:{
        width: WIDTH /3, 
        height: WIDTH /3, 
        borderRadius:20, 
        backgroundColor:'#e0e0e0', 
        marginRight:10 ,
    },

});