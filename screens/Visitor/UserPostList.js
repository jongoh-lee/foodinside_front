import * as React from "react";
import { View, StyleSheet, Text, ActivityIndicator, Platform } from "react-native";
import PostComponent from "../../components/Visitor/PostComponent";
import { FlatList } from "react-native-gesture-handler";
import constants from "../../constants";
import { useLazyQuery } from "@apollo/react-hooks";
import { LOAD_MORE_POST } from "./VisitorQueries";
import Caption from "../../components/Custom/Caption";

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:"#ffffff"
    }
});

export default ({ navigation, route }) => {
    const LENGTH = constants.width + 60 + (Platform.OS === 'android' ? 78 : 74);
    const flatList = React.useRef();
    const [imageLoading, setImageLoading] = React.useState(false)
    const [postList, setPostList] = React.useState(route.params.post.postList);
    const [endOfScroll, setEndOfScroll] = React.useState(false)
    const [loadMorePostQuery, { called, loading, data }] = useLazyQuery(LOAD_MORE_POST,{
        fetchPolicy:"network-only",
    });

    const renderPost = ({ item }) => {
    return (
        <PostComponent {...item}  profileId={null} userInfo={route.params.post.user}/>
    )};

    const loadMoreImages = async () => {
        setImageLoading(true);
        loadMorePostQuery({
            variables:{
                id: postList.slice(-1)[0].id,
                username: route.params.post.user.username
            }
        });
    }

    const renderFooter = () => {
        return(
            imageLoading ? <View style={{height: constants.height * 0.1, alignItems:"center", justifyContent:"center"}}>
                <ActivityIndicator color={"#E0E0E0"}/>
            </View> : endOfScroll ? (
            <View style={{height: constants.height * 0.1, alignItems:"center", justifyContent:"center"}}>
                <Caption>게시물이 없습니다</Caption>
            </View>
            ) : null
        )
    };

    React.useEffect(() => {
        if(data?.loadMorePost.length > 0){
            setPostList(postList.concat(data?.loadMorePost));
        }else if(data?.loadMorePost.length === 0){
            setEndOfScroll(true)
        }
        setImageLoading(false);
    }, [data?.loadMorePost]);

    return (
        <View style={styles.container}>
            <FlatList 
                ref={flatList}
                data={postList}
                renderItem={renderPost}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{paddingVertical:10, flexGrow:0}}
                initialScrollIndex={route.params.post.index}
                getItemLayout={(data, index) => ({
                    length: LENGTH, offset: LENGTH * index, index
                })}
                onScrollToIndexFailed={() => {}}
                onEndReached={loadMoreImages}
                onEndReachedThreshold={Platform.OS === 'ios'? 0 : 0.2}
                ListFooterComponent={renderFooter}
            />
        </View>
    )
}