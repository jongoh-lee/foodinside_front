import React, {Component,} from 'react';
import {
    BackHandler,
    ToastAndroid,
} from 'react-native';

class DisableBack extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        ToastAndroid.show('뒤로가기 버튼을 사용할 수 없습니다.', ToastAndroid.SHORT);
        return true;
    }

    render() {
        return this.props.children
    }
}

export default DisableBack;