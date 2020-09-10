import * as React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity, Alert } from "react-native";
import constants from "../../constants";
import Swiper from 'react-native-swiper';
import { MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons'; 
import { Caption } from "react-native-paper";
import Modal from "react-native-modal";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { EDIT_USER_POST, EDIT_PROFILE_POST, TOGGLE_LIKE, SEE_FULL_POST } from "../../screens/Visitor/VisitorQueries";
import { useNavigation } from "@react-navigation/native";
import ShadowInput from "../Custom/ShadowInput";
import useInput from "../../hooks/useInput";

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom:10
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 14,
    fontWeight:'bold',
  },

  //사진
  imageBox:{
    width: constants.width,
    height: constants.height / 2,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: "cover",
  },

  //postInfo
  postInfo:{
    padding:5,
  },
  snsBar: {
    flexDirection: "row",
    justifyContent:"flex-end",
    alignItems:"flex-start"
  },
  snsButton: {
    alignItems:"center",
    paddingHorizontal:5
  },
  tasting: {
    marginLeft: 5,
    paddingVertical: 10,
  },
  postingTime:{
    paddingBottom:5
  },

  
  //modal
  modal:{
    justifyContent:"flex-end",
    margin:0,
    paddingHorizontal:5
  },
  modalContent_top:{
      backgroundColor: 'white',
      paddingHorizontal: 22,
      borderRadius: 15,
      borderColor: 'rgba(0, 0, 0, 0.1)',
      paddingBottom:20,
      marginBottom:10
  },
  modalContent_bottom:{
    backgroundColor: 'white',
    paddingHorizontal: 22,
    borderRadius: 15,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical:10,
    marginBottom:10
},
  modalList:{
      width:'100%',
      paddingVertical:10,
      flexDirection:'row',
      alignItems:"center",
  },
  modalText:{
      fontSize:14,
      marginLeft:10
  },
  modalText_red:{
    fontSize:14,
    marginLeft:10,
    color:'red'
},
});

export default ({ id : postId, user, files, tasting, isSelf, isLiked:isLikedProp, likeCount:likeCountProp, profile, profileId, postComments}) => {
  
  
  const { data, error, loading} = useQuery(SEE_FULL_POST,{
    variables:{
      id: postId
    },
  });
  
  const { username, avatar } = user;
  const [isLiked, setIsLiked] = React.useState(data?.seeFullPost.isLiked);
  const [likeCount, setLikeCount] = React.useState(data?.seeFullPost?.likeCount? data?.seeFullPost?.likeCount : 0);
  const [ images, setImages ] = React.useState(files);
  const commentInput = useInput("");
  const { value : text } = commentInput;
  
  const [postModal, setPostModal] = React.useState(false);
  
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE,{
    variables:{
      postId: postId,
      profileId: profile.id
    },
    refetchQueries:[`seeFullProfile`, `me`]
    //update(cache, {data: { toggleLike }}) {
    //  cache.writeQuery({
    //    query: SEE_FULL_POST,
    //    data: { seeFullPost: {
    //      ...toggleLike
    //    } },
    //  });
    //}
  })

  const onPressLike = async() =>{
    if( isLiked === true){
      setLikeCount(likeCount - 1)
    }else{
      setLikeCount(likeCount + 1)
    }
    setIsLiked(!isLiked)
    try{
      await toggleLikeMutation();
    }catch(e){
      console.log("좋아요 에러",e);
    }
  }

  //모달
  const [editProfilePostMutation] = useMutation(EDIT_PROFILE_POST,{
    refetchQueries: [`me`]
  });

  const [editUserPostMutation] = useMutation(EDIT_USER_POST,{
    refetchQueries: [`seeFullProfile`]
  });

  const navigation = useNavigation();

  const deleteProfilePost = async () => {
    let DELETE = "DELETE";
    setPostModal(false);
    try {
      const { 
        data : { editProfilePost } 
      } = await editProfilePostMutation({
        variables:{
          profileId: profileId,
          postId: postId,
          action: DELETE
        }
      })
      if(editProfilePost){
        navigation.goBack();
      }
    } catch(e){
      console.log("포스트 삭제 in 프로필 에러", e);
    }
  }

  const deleteUserPost = async () => {
    let DELETE = "DELETE";
    setPostModal(false);
    try {
      const { 
        data : { editUserPost } 
      } = await editUserPostMutation({
        variables:{
          profileId: profileId,
          postId: postId,
          action: DELETE
        }
      })
      if(editUserPost){
        navigation.goBack();
      }
    } catch(e){
      console.log("포스트 삭제 in 사용자 에러", e);
    }
  }

  return (
    <>
      
      {/* 헤더 */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => navigation.navigate("SeeUser", {
          user:{ username, isSelf }
        })}>
          <View style={styles.headerLeft}>
            <Image style={styles.avatar} source={{ uri: avatar }} />
            <View>
              <Text style={styles.username}>{username}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setPostModal(true)}>
          <Feather name="more-vertical" size={20} style={{paddingHorizontal:5}} color={'rgba(0, 0, 0, .7)'}/>
        </TouchableOpacity>
      </View>

      {/* 이미지 */}
      <View style={styles.imageBox}>
        <Swiper paginationStyle={{bottom:10}} dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3}} />} activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4}} />}>
          {images.map(image => <Image key={image.id} style={styles.image} source={{uri: image.url}}/>)}
        </Swiper>
      </View>

      {/* 포스트 현황 */}
      <View style={styles.postInfo}>
        <View style={styles.snsBar}>
          <View style={{flexGrow:1}}>
            <ShadowInput {...commentInput} placeholder={"댓글을 입력해 주세요"} blurOnSubmit={true} textAlign={"left"} returnKeyType={'done'} />
          </View>
          <View style={styles.snsButton}>
            <TouchableOpacity>
              {text.length > 0 ? (
                <MaterialCommunityIcons name={"comment-plus-outline"} size={30} style={{color:'black'}} />
              ) : (
                <MaterialCommunityIcons name={"comment-text-outline"} size={30} style={{color:'#9e9b9d'}} />
              )}
            </TouchableOpacity>
            <Caption>{12}개</Caption>
          </View>

          <View style={styles.snsButton}>
            <TouchableOpacity onPress={onPressLike}>
              {isLiked? (
                  <MaterialCommunityIcons name="heart" size={30} style={{color:'red'}} /> 
              ):(
                  <MaterialCommunityIcons name="heart-outline" size={30} style={{color:'#9e9b9d'}} /> 
              )}
            </TouchableOpacity>
            <Caption>{likeCount}개</Caption>
          </View>
        </View>

        {tasting.length > 0? <Text style={styles.tasting} >{tasting}</Text> : null}

        <Caption style={styles.postingTime}>12분 전</Caption>
      </View>

      {/* 모달*/}
      <Modal
      isVisible={postModal}
      onBackdropPress={() => setPostModal(false)}
      onSwipeComplete={() => setPostModal(false)}
      onBackButtonPress={() => setPostModal(false)}
      swipeDirection={'down'}
      style={styles.modal}
      backdropOpacity={.4}
      >
      {isSelf === true? (
        <>
          <View style={styles.modalContent_top}>
            <MaterialCommunityIcons name="chevron-down" size={26} color="#666" style={{alignSelf:"center"}} />

            <TouchableOpacity style={styles.modalList} onPress={() => navigation.navigate("") }>
              <MaterialCommunityIcons name="square-edit-outline" size={24} color="#666" /><Text style={styles.modalText}>리뷰 수정</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalList} onPress={() => setPostModal(false)}>
              <AntDesign name="back" size={24} color="#666" /><Text style={styles.modalText}>취소</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent_bottom}>
            <TouchableOpacity style={styles.modalList} onPress={() => Alert.alert('확인','리뷰를 삭제 하시겠습니까?',
                [
                  {
                    text: '취소',
                    style: 'cancel',
                  },
                  {text: '확인',
                  onPress: () => profileId? deleteProfilePost() : deleteUserPost()
                },
                ],
            {cancelable: true},
            )}>
              <MaterialCommunityIcons name="delete-empty-outline" size={25} color="red"/><Text style={styles.modalText_red}>리뷰 삭제</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={styles.modalContent_top}>
            <MaterialCommunityIcons name="chevron-down" size={26} color="#666" style={{alignSelf:"center"}} />
              <TouchableOpacity style={styles.modalList} onPress={() => setPostModal(false)}>
                <AntDesign name="back" size={24} color="#666" /><Text style={styles.modalText}>취소</Text>
              </TouchableOpacity>
           
          </View>

          <View style={styles.modalContent_bottom}>
            <TouchableOpacity style={styles.modalList}>
              <MaterialCommunityIcons name="alarm-light-outline" size={25} color="red"/><Text style={styles.modalText_red}>신고 하기</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      
    </Modal>

    </>
)};