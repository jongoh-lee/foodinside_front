import * as React from "react";
import { StyleSheet, Image, View, Text, TouchableOpacity, Alert } from "react-native";
import constants from "../../constants";
import Swiper from 'react-native-swiper';
import { MaterialCommunityIcons, Feather, AntDesign } from '@expo/vector-icons'; 
import Caption from "../../components/Custom/Caption"
import ScreenLoader from "../../components/Custom/ScreenLoader"
import Modal from "react-native-modal";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { EDIT_USER_POST, EDIT_PROFILE_POST, TOGGLE_LIKE, SEE_FULL_POST } from "../../screens/Visitor/VisitorQueries";
import { useNavigation } from "@react-navigation/native";
import ShadowInput from "../Custom/ShadowInput";
import useInput from "../../hooks/useInput";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


export default ({ id : postId, user, userInfo, files, tasting, isSelf, isLiked:isLikedProp, likeCount:likeCountProp, profile, profileId, createdAt}) => {
  const { id: userId, username, avatar } = profileId ? user : userInfo;
  const [isLiked, setIsLiked] = React.useState();
  const [likeCount, setLikeCount] = React.useState();
  const commentInput = useInput("");
  const { value : text } = commentInput;
  const [showText, setShowText] = React.useState(2);
  const [postModal, setPostModal] = React.useState(false);
  const [imageList, setImageList] = React.useState(files);
  const navigation = useNavigation();
  const postTime = createdAt.slice(0, 10).replace(/-/gi, '/');

  const { data, loading:fileLoader, error } = useQuery(SEE_FULL_POST,{
    variables:{
      id: postId
    },
    fetchPolicy:"cache-and-network"
  })
  
  const [toggleLikeMutation, { loading:likeLoading}] = useMutation(TOGGLE_LIKE,{
    variables:{
      postId: postId,
      token: profile.token,
      profileId: profile.id,
      userId: userId
    },
    refetchQueries:[`seeFullProfile`, `me`, `myProfile`]
    //update(cache, {data: { toggleLike }}) {
    //  cache.writeQuery({
    //    query: SEE_FULL_POST,
    //    data: { seeFullPost: {
    //      ...toggleLike
    //    } },
    //  });
    //}
  })

  const [editProfilePostMutation, {loading:profileloading}] = useMutation(EDIT_PROFILE_POST,{
    refetchQueries: [`me`]
  });

  const [editUserPostMutation, {loading:userloading}] = useMutation(EDIT_USER_POST,{
    refetchQueries: [`seeFullProfile`]
  });

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
          postId: postId,
          action: DELETE
        }
      })
      if(editUserPost){
        navigation.navigate("내 정보", { id: postId});
      }
    } catch(e){
      console.log("포스트 삭제 in 사용자 에러", e);
    }
  };

  React.useEffect(() =>{
    setIsLiked(isLikedProp);
    setLikeCount(likeCountProp);
  },[isLikedProp, likeCountProp])

  React.useEffect(()=>{
    if(data?.seeFullPost.allFiles.length > 1){
      setImageList(data.seeFullPost.allFiles)
    }
  },[data])

  return (
    <>
      <View>
        {/* 헤더 */}
        <TouchableOpacity onPress={() => navigation.navigate("SeeUser", {
          user:{ username, isSelf }
          })}>
          <View style={styles.headerBar}>
            <View style={styles.headerLeft}>
              <Image style={styles.avatar} source={avatar? { uri: avatar } : require('../../assets/Icons/avatarBasic.png')} />
              <View>
                <Text style={styles.username}>{username}</Text>
                {!profileId && <TouchableOpacity onPress={() => navigation.navigate("프로필 보기", {
                      seeFullProfile:{
                          id: profile.id,
                          profileName: profile.profileName,
                          sector: profile.sector,
                          isSelf: profile.isSelf
                      }
                  })} style={{zIndex:100, paddingTop:2}}><Caption>{profile.profileName}</Caption></TouchableOpacity>}
              </View>
            </View>

            <TouchableOpacity onPress={() => setPostModal(true)} style={{zIndex:200}}>
              <Feather name="more-vertical" size={20} style={{paddingHorizontal:5}} color={'rgba(0, 0, 0, .7)'}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        {/* 이미지 */}
        <View style={styles.imageBox}>
          <Swiper paginationStyle={{bottom:10}} dot={<View style={{backgroundColor: 'rgba(255,255,255,.3)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3}} />} activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 4, marginRight: 4}} />}>
            {imageList.map((image, i) => <Image key={i} style={styles.image} source={{uri: image.url}}/>)}
          </Swiper>
        </View>

        {/* 포스트 현황 */}
        <View style={styles.postInfo}>
          <View style={styles.snsBar}>
            <View style={{flexGrow:1, flexShrink:1}}>
              <TouchableWithoutFeedback onPress={() => showText ? setShowText(null) : setShowText(2)}>
                <Text style={styles.tasting} numberOfLines={showText}>{tasting}</Text>
                {/* <ShadowInput {...commentInput} placeholder={"댓글을 입력해 주세요"} blurOnSubmit={true} textAlign={"left"} returnKeyType={'done'} /> */}
              </TouchableWithoutFeedback>
            </View>
            {/* <View style={styles.snsButton}> */}
              {/* <TouchableOpacity>
                {text.length > 0 ? (
                  <MaterialCommunityIcons name={"comment-plus-outline"} size={30} style={{color:'black'}} />
                ) : (
                  <MaterialCommunityIcons name={"comment-text-outline"} size={30} style={{color:'#9e9b9d'}} />
                )}
              </TouchableOpacity> */}
              {/* <Caption>{12}개</Caption> */}
            {/* </View> */}
            <View style={styles.snsButton}>
              <TouchableOpacity onPress={onPressLike} disabled={likeLoading}>
                {isLiked? (
                    <MaterialCommunityIcons name="heart" size={30} style={{color:'red'}} /> 
                ):(
                    <MaterialCommunityIcons name="heart-outline" size={30} style={{color:'#9e9b9d'}} /> 
                )}
              </TouchableOpacity>
              <Caption>{likeCount ? likeCount : 0}개</Caption>
            </View>
          </View>

          <Caption style={styles.postingTime}>{postTime}</Caption>
        </View>
      </View>

      {(profileloading || userloading) ? <ScreenLoader /> : null}

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
    backgroundColor:"#E0E0E0"
  },
  username: {
    fontSize: 14,
    fontWeight:'bold',
  },

  //사진
  imageBox:{
    width: constants.width,
    height: constants.width,
  },
  image: {
    width: constants.width,
    height: constants.width,
    resizeMode: "cover",
  },

  //postInfo
  postInfo:{
    padding:5,
    maxHeight: 78
  },
  snsBar: {
    flexDirection: "row",
    justifyContent:"flex-end",
    alignItems:"flex-start",
  },
  snsButton: {
    alignItems:"center",
    paddingHorizontal:5
  },
  tasting: {
    paddingVertical:5,
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