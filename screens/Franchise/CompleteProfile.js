import * as React from "react";
import {StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity, Alert} from "react-native";
import { profile } from "../../components/Franchise/data";
import SquareInput from "../../components/Custom/SquareInput";
import useInput from "../../hooks/useInput";
import numInput from "../../hooks/numInput";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import constants from "../../constants";
import BasicButton from "../../components/Custom/BasicButton";
import Modal from "react-native-modal";
import ModalSubmenu from "../../components/Franchise/ModalSubmenu";
import ModalMemberInfo from "../../components/Franchise/ModalMemberInfo";
import DismissKeyboard from "../../components/Custom/DismissKeyboard";

export default ({ navigation, route }) => {
  // 초기 요청 값
  const [image, setImage] = React.useState(null);
  const shopNameInput = useInput("");
  const sortInput = useInput("");
  const pointInput = numInput("");
  const regionInput = useInput("");
  const foodGuideInput = useInput(profile.foodGuide);
  const originInput = useInput(profile.origin);

  //메뉴 수정
  const [subMenus, setSubmenus] = React.useState(profile.Submenu);
  
  //메뉴 추가
  const [newMenuList, setNewMenuList] = React.useState([]);
  
  // 메뉴 삭제
  const [chosenMenu, setChosenMenu] = React.useState("");
  const deleteMenu = (menuId) => {
    const found = subMenus.some(el => el.id === menuId);
    if(found){
      setSubmenus(subMenus.filter(
        (Submenu) => Submenu.id !== menuId
        ));
      }else {
        setNewMenuList(newMenuList.filter(
          (newMenu) => newMenu.id !== menuId
      ))
    }
    setMenuModal(false);
  };

  //멤버 수정
  const [members, setMembers] = React.useState(profile.members);
  //멤버 추가
  const [newMembers, setNewMembers] = React.useState([]);
  //멤버 삭제
  const [chosenMember, setChosenMember] = React.useState("");
  const deleteMember = (Id) => {
    const found = members.some(member => member.id === Id);
    if(found){
      setMembers(members.filter(
        (member) => member.id !== Id
        ));
      }else {
        setNewMembers(newMembers.filter(
          (member) => member.id !== Id
      ))
    }
    setMemberModal(false);
  };


  // 모달
  const [menuModal, setMenuModal] = React.useState(false);
  const [editMenuModal, setEditMenuModal] = React.useState(false);
  const [memberModal, setMemberModal] = React.useState(false);
  const [editMemberModal, setEditMemberModal] = React.useState(false);

  // changImage hook
  const onSelect = (mainImage) => {
    setImage(mainImage.photo.uri)
  };

  // 나중에 back_end에서 처리합시다
  const handleMenuSubmit = () => {
    if(id){
      edit
    }
    //만약 id가 있다면 Submenu 리스트를 찾아서 해당 메뉴를 업데이트
    //만약 id가 없다면 create Submenu Mutation으로 메뉴 만들기

    //프로트엔드는 id 유무를 찾아서 수정 혹은 새로운 배열 만들기
  }

  navigation.setOptions({
    headerRight:() => (
      <TouchableWithoutFeedback onPress={() => console.log('hi')}>
        <View style={styles.save}>
          <Text style={styles.saveText}>저장</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  })
  return (
  <>
    <ScrollView>
      <View style={styles.container}>
        
        <Text style={[styles.title, {paddingVertical:10}]}>업체 정보 </Text>

          <View style={styles.innerBox_border}>
            <View style={{flexDirection:"row"}}>
              <SquareInput {...shopNameInput} placeholder={'업체명'} width={'70%'}/>
              <SquareInput {...sortInput} placeholder={'분류'} width={'30%'}/>
            </View>
            <View style={{flexDirection:"row"}}>
              <Text style={[{ padding:9 ,paddingLeft:10, width:'70%', borderWidth:1}, {borderColor: pointInput.value? "rgb(5, 230, 244)" : "rgba(5, 230, 244, .3)"}]}>리뷰가 받는 좋아요 1개당 발행하는 포인트</Text>
              <SquareInput {...pointInput} placeholder={'0'} width={'30%'}/>
            </View>
            <SquareInput {...regionInput} placeholder={'희망 영업 지역'} width={'100%'}/>
          </View>

        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10}}>
          <Text style={styles.title}>대표 이미지</Text>

          <TouchableOpacity style={{flexDirection:"row"}} onPress={() => (
              navigation.navigate('SelectPhoto', {
                onSelect : onSelect
              })
            )}>
            <MaterialCommunityIcons
              name="camera"
              size={20}
              color="#666"
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

          <View style={styles.innerBox}>
            <ImageBackground style={{width:'100%', height:constants.height * 0.22, alignItems:"center", justifyContent:"center", backgroundColor:'#e0e0e0'}} source={{uri:image}}>
              {image === null? <Text style={{color:'rgba(255,255,255, .6)', fontSize:24}}>이미지가 없습니다</Text> : null }
            </ImageBackground>
          </View>

        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10}}>
          <Text style={styles.title}>메뉴 정보</Text>
          <TouchableOpacity style={{flexDirection:"row"}} onPress={() => (
              setChosenMenu({id:new Date().valueOf()}),
              setEditMenuModal(true)
            )}>
            <MaterialCommunityIcons
              name="plus"
              size={20}
              color="#666"
              style={{
                opacity: 0.7,
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight:5
              }}
              />
            <Text style={{color:'#666'}}>메뉴 추가</Text>
          </TouchableOpacity>
        </View>

          <ScrollView style={styles.menuScroll} showsHorizontalScrollIndicator={false} contentContainerStyle={{flexGrow:1}} horizontal>
            <View style={styles.menuContainer}>
              <Text style={styles.menuName} numberOfLines={1}>{profile.mainMenu.menuName}</Text>
              <Image style={styles.menuImage} source={{uri:profile.mainMenu.menuImage}}/>
              <View style={styles.priceBox}>
                  <Text style={{textDecorationLine:"underline"}}>{profile.mainMenu.fullPrice}</Text>
                  <Text style={styles.salePrice}>{profile.mainMenu.salePrice}</Text>
              </View>
            </View>

            {newMenuList && newMenuList.map((menu) => (
            <TouchableOpacity key={menu.id} onPress={() => (
              setMenuModal(true),
              setChosenMenu(menu)
              )}>
              <View style={styles.menuContainer}>
                <Text style={styles.menuName} numberOfLines={1}><Text style={{fontSize:10, color:'red'}}>New </Text>{menu.menuName}</Text>
                <Image style={styles.menuImage} source={{uri:menu.menuImage}}/>
                <View style={styles.priceBox}>
                    <Text style={styles.fullPrice}>{menu.fullPrice}</Text>
                    <Text style={styles.salePrice}>{menu.salePrice}</Text>
                </View>
              </View>
            </TouchableOpacity>
            ))}

            {subMenus && subMenus.map((menu) => (
            <TouchableOpacity key={menu.id} onPress={() => (
              setMenuModal(true),
              setChosenMenu(menu)
              )}>
              <View style={styles.menuContainer}>
                <Text style={styles.menuName} numberOfLines={1}>{menu.menuName}</Text>
                <Image style={styles.menuImage} source={{uri:menu.menuImage}}/>
                <View style={styles.priceBox}>
                    <Text style={styles.fullPrice}>{menu.fullPrice}</Text>
                    <Text style={styles.salePrice}>{menu.salePrice}</Text>
                </View>
              </View>
            </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.innerBox_border}>
            <SquareInput {...foodGuideInput} placeholder={'푸드 가이드'} width={'100%'} multiline={true} returnKeyType={'none'}/>
            <SquareInput {...originInput} placeholder={'원산지'} width={'100%'} multiline={true} returnKeyType={'none'}/>
            
          </View>

        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10}}>
          <Text style={styles.title}>팀원 정보</Text>
          <TouchableOpacity style={{flexDirection:"row"}} onPress={() => (
            setEditMemberModal(true),
            setChosenMember({id:new Date().valueOf()})
            )}>
            <MaterialCommunityIcons
              name="plus"
              size={20}
              color="#666"
              style={{
                opacity: 0.7,
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight:5
              }}
              />
            <Text style={{color:'#666'}}>팀원 추가</Text>
          </TouchableOpacity>
        </View>

          <View style={styles.innerBox}>
            <View style={styles.memberContainer}>
              {members && members.map((member) => 
              <TouchableOpacity key={member.id} onPress={() => (
                setMemberModal(true),
                setChosenMember(member)
                )}>
                <View key={member.id} style={styles.card}>
                    <View style={styles.member}>
                        <Image style={styles.image} source={{uri:member.image}} />

                        <View style={styles.position}>
                            <Text style={styles.text} numberOfLines={1}>{member.name}({member.position})</Text>
                        </View>
                    </View>

                    <View style={{flex:1}}>
                        <Text style={{padding:10, fontWeight:"bold", color:"#666"}}>경력🍴</Text>
                        <View style={styles.careerBox}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.careerText}>{member.career}</Text>
                            </ScrollView>
                        </View>
                    </View>
                </View>
              </TouchableOpacity>)}

              {newMembers && newMembers.map((member) => 
              <TouchableOpacity key={member.id} onPress={() => (
                setMemberModal(true),
                setChosenMember(member)
                )}>
                <View key={member.id} style={styles.card}>
                    <View style={styles.member}>
                        <Image style={styles.image} source={{uri:member.image}} />

                        <View style={styles.position}>
                            <Text style={styles.text} numberOfLines={1}>{member.name}({member.position})</Text>
                        </View>
                    </View>

                    <View style={{flex:1}}>
                        <Text style={{padding:10, fontWeight:"bold", color:"#666"}}>경력🍴</Text>
                        <View style={styles.careerBox}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={styles.careerText}>{member.career}</Text>
                            </ScrollView>
                        </View>
                    </View>
                </View>
              </TouchableOpacity>)}
            </View>
          </View>

        <BasicButton text={'제출하기'} />
      </View>
    </ScrollView>
                
    <Modal
      isVisible={menuModal}
      onBackdropPress={() => setMenuModal(false)}
      backdropColor={'#ffffff'}
      backdropOpacity={.6}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      style={{justifyContent:"center", alignItems:"center"}}
      >
      <View style={styles.content}>
        <TouchableOpacity style={styles.modalList} onPress={()=> (
            setMenuModal(false),
            setEditMenuModal(true)
            )}>
            <MaterialCommunityIcons name="circle-edit-outline" size={24} color="#666" /><Text style={styles.modalText}>메뉴 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.modalList} onPress={() => Alert.alert('확인','선택한 메뉴가 삭제됩니다.',
            [
              {
                text: '취소',
                style: 'cancel',
              },
              {text: '확인',
              onPress: () => deleteMenu(chosenMenu.id),
            },
            ],
            {cancelable: true},
          )}>
            <MaterialCommunityIcons name="delete-circle-outline" size={24} color="red" /><Text style={[styles.modalText, {color:'red'}]}>메뉴 삭제</Text>
        </TouchableOpacity>
      </View>
    </Modal>

    <Modal
      isVisible={editMenuModal}
      onBackdropPress={() => setEditMenuModal(false)}
      backdropColor={'#ffffff'}
      backdropOpacity={.5}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      style={{justifyContent:"center", alignItems:"center"}}
      coverScreen={false}
      >
      <ModalSubmenu {...chosenMenu} setEditMenuModal={setEditMenuModal} setSubmenus={setSubmenus} subMenus={subMenus} newMenuList={newMenuList} setNewMenuList={setNewMenuList}/>
    </Modal>
    

    <Modal
      isVisible={memberModal}
      onBackdropPress={() => setMemberModal(false)}
      backdropColor={'#ffffff'}
      backdropOpacity={.6}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      style={{justifyContent:"center", alignItems:"center"}}
      >
      <View style={styles.content}>
        <TouchableOpacity style={styles.modalList} onPress={()=> (
            setMemberModal(false),
            setEditMemberModal(true)
            )}>
            <MaterialCommunityIcons name="circle-edit-outline" size={24} color="#666" /><Text style={styles.modalText}>정보 수정</Text>
        </TouchableOpacity>
        {members.findIndex(member => member.id === chosenMember.id) === 0 ? null : (
          <TouchableOpacity style={styles.modalList} onPress={() => Alert.alert('확인','선택한 팀원이 사라집니다.',
          [
            {
              text: '취소',
              style: 'cancel',
            },
            {text: '확인',
            onPress: () => deleteMember(chosenMember.id),
          },
          ],
          {cancelable: true},
          )}>
          <MaterialCommunityIcons name="delete-circle-outline" size={24} color="red" /><Text style={[styles.modalText, {color:'red'}]}>멤버 삭제</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>

    <Modal
      isVisible={editMemberModal}
      onBackdropPress={() => setEditMemberModal(false)}
      backdropColor={'#ffffff'}
      backdropOpacity={.5}
      animationIn="slideInLeft"
      animationOut="slideOutRight"
      style={{justifyContent:"center", alignItems:"center"}}
      coverScreen={false}
      >
        <DismissKeyboard>
          <ModalMemberInfo {...chosenMember} setEditMemberModal={setEditMemberModal} members={members} setMembers={setMembers} newMembers={newMembers} setNewMembers={setNewMembers}/>
        </DismissKeyboard>
    </Modal>
  </>
)};


const WIDTH = constants.width - 30;
const styles = StyleSheet.create({
  container:{
    backgroundColor:"white",
    padding:15,
    flex:1,
  },
  innerBox:{
    marginBottom:15
  },
  innerBox_border:{
    borderWidth:1,
    borderColor:'rgba(5, 230, 244, .3)',
    marginBottom:15
  },
  save:{
    paddingHorizontal:5
  },
  saveText:{
    color:'#05e6f4',
    fontSize:16,
  },
  title:{
    fontSize:16,
    fontWeight:"bold"
  },

  //메뉴 스크롤
  menuScroll:{
    flexDirection:"row",
  },
  menuContainer:{
    width: WIDTH /3,
    marginRight:5,
    alignItems:"center"
  },
  menuImage:{
    width: WIDTH /3,
    height: WIDTH / 3,
    resizeMode:"cover",
    borderRadius: 15,
  },
  menuName:{
    marginVertical:3,
  },
  priceBox:{
    flexDirection:"row",
    width: WIDTH /3,
    padding:5,
    justifyContent:"space-between"
  },
  fullPrice:{
    textDecorationLine:"line-through",
    justifyContent:"flex-start",
    color:'#666'
  },
  salePrice:{
    fontSize:14,
  },

  //팀원 스크롤
  memberContainer:{
    padding:5
  },
  card:{
    flexDirection:"row",
  },
  member:{
    width: WIDTH / 3,
    alignItems:"center"
  },
  image:{
    width: WIDTH / 3,
    height: WIDTH / 2.5,
    resizeMode:"cover",
    borderRadius:10
  },
  position:{
    flexDirection:"row",
    marginVertical:5,
    marginBottom:10
  },
  text:{
    fontSize:14
  },
  careerBox:{
    marginHorizontal:20,
    height: WIDTH / 3.5,
  },
  careerText:{
    fontSize:13,
    color:"#666",
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
});
