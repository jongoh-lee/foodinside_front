// 쿼리 호출 후 각각의 Component로 넣어주기
// component 별로 Data 처리구조 만들기

//새로운 QUERY 호출 후 비구조화 추출 FullShopDetails : 사진, 식기, 크기, 설명, 위치(지도), 체크인, 체크아웃, 환불정책, 달력
// 기존에 가져온 Data는 그대로 사용 가능
// 달력, 후기는 컴포넌트로 추가 합니다. 
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  and,
  block,
  call,
  cond,
  eq,
  interpolate,
  set,
  useCode,
} from "react-native-reanimated";
import { PanGestureHandler, State, ScrollView } from "react-native-gesture-handler";
import {
  onGestureEvent,
  snapPoint,
  timing,
  useValues,
} from "react-native-redash";
import { useMemoOne } from "use-memo-one";
import { Feather as Icon } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import ShopDescription from "../../components/Franchise/ShopDescription";


const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width,
    height: width,
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
  },
});
export default ({ route }) => {
  const { goBack } = useNavigation();
  const { listing } = route.params;
  const [
    translationX,
    translationY,
    velocityY,
    translateX,
    translateY,
    snapBack,
    state,
  ] = useValues([0, 0, 0, 0, 0, 0, State.UNDETERMINED]);
  const snapTo = snapPoint(translationY, velocityY, [0, height]);
  const scale = interpolate(translateY, {
    inputRange: [0, height / 2],
    outputRange: [1, 0.75],
    extrapolate: Extrapolate.CLAMP,
  });
  const gestureHandler = useMemoOne(
    () => onGestureEvent({ translationX, translationY, velocityY, state }),
    [state, translationX, translationY, velocityY]
  );
  useCode(
    () =>
      block([
        cond(
          and(eq(state, State.END), eq(snapTo, height), eq(snapBack, 0)),
          set(snapBack, 1)
        ),
        cond(
          snapBack,
          call([], () => goBack()),
          cond(
            eq(state, State.END),
            [
              set(
                translateX,
                timing({ from: translationX, to: 0, duration: 250 })
              ),
              set(
                translateY,
                timing({ from: translationY, to: 0, duration: 250 })
              ),
            ],
            [set(translateX, translationX), set(translateY, translationY)]
          )
        ),
      ]),
    // we disable the deps because we don't want the identity change on
    // snapPoint to trigger a side effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: "white",
            transform: [{ translateX }, { translateY }, { scale }],
          }}
        >
        <ScrollView>
          <View>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={listing.picture[0]}
              />
            <View style={styles.thumbnailOverlay}>
              <Icon.Button
                name="x"
                backgroundColor="transparent"
                underlayColor="transparent"
                onPress={() => goBack()}
                />
            </View>
          </View>
          <ShopDescription listing={listing} />
        </ScrollView>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};