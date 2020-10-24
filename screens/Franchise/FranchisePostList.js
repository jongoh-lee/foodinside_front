import * as React from "react";
import { View, StyleSheet, Text, ActivityIndicator, Platform } from "react-native";
import PostComponent from "../../components/Visitor/PostComponent";
import { FlatList } from "react-native-gesture-handler";
import constants from "../../constants";
import { useLazyQuery } from "@apollo/react-hooks";
import { LOAD_MORE_REVIEW } from "./ProfileQueries";
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

    const [loadMoreReviewQuery, { called, loading, data }] = useLazyQuery(LOAD_MORE_REVIEW,{
        fetchPolicy:"network-only",
    });

    const renderPost = ({ item }) => {
        return (
            <PostComponent {...item}  profileId={route.params.post.profileId}/>
        )
    };

    const loadMoreImages = async () => {
        loadMoreReviewQuery({
            variables:{
                id: postList.slice(-1)[0].id,
                profileId: route.params.post.profileId
            }
        });
        setImageLoading(true);
    }

    const renderFooter = () => {
        return(
            imageLoading ? <View style={{height: constants.height * 0.1, alignItems:"center", justifyContent:"center"}}>
                <ActivityIndicator color={"#666"}/>
            </View> : endOfScroll ? (
            <View style={{height: constants.height * 0.1, alignItems:"center", justifyContent:"center"}}>
              <Caption>게시물이 없습니다</Caption>
            </View>
            ) : null
        )
    }

    React.useEffect(() => {
        if(data?.loadMoreReview.length > 0){
            setPostList(postList.concat(data?.loadMoreReview));
        }else if(data?.loadMoreReview.length === 0){
            setEndOfScroll(true)
        }
        setImageLoading(false);
    }, [data?.loadMoreReview]);
    
    return (
        <View style={styles.container}>
            <FlatList 
                ref={flatList}
                data={postList}
                renderItem={renderPost}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{paddingVertical:10}}
                initialScrollIndex={route.params.post.index}
                getItemLayout={(data, index) => ({
                    length: LENGTH, offset: LENGTH * index, index
                })}
                onScrollToIndexFailed={() => {}}
                onEndReached={loadMoreImages}
                onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.2}
                ListFooterComponent={renderFooter}
            />
        </View>
    )
}