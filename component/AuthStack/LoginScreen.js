import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    ToastAndroid,
} from 'react-native';
import LottieView from 'lottie-react-native';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            btntext: 'ادامه',
            phoneNumber: '',
            roll : this.props.navigation.state.params.roll
        };
    }

    entercode = () => {
        if (this.state.btntext == 'ادامه') {
            console.log(this.state.phoneNumber);
            if (this.state.phoneNumber.length !== 11 || this.state.phoneNumber == '' ) {
                this.setState(
                    {
                        visible: true,
                    },
                    () => {
                        this.hideToast();
                    },
                );
            } else {
                this.phoneNumber.clear();
                this.setState({
                    btntext: 'تایید',
                });
            }
        } else {
            console.log('pass', this.state.password);
            this.props.navigation.navigate('Home', {
                roll : this.state.roll
            })
        }
    };
    hideToast = () => {
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#4aa0f7', justifyContent: 'flex-start', alignItems: 'center'}}>
                <StatusBar translucent={true}/>
                <Toast visible={this.state.visible} message="شماره وارد شده اشتباه است"/>
                <LottieView source={require('../../assets/anim/login.json')}
                            style={{position: 'absolute', marginTop: 10}}
                            autoSize={true}
                            autoPlay={true}
                            loop
                />
                <KeyboardAvoidingView
                    behavior="padding"
                    enabled
                    style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <View style={styles.head}>
                        <Text style={{
                            color: 'white',
                            fontFamily: 'IRANSansMobile_Bold',
                            marginTop: 100,
                            fontSize: 18,
                        }}> ثبت نام مشاوره آنلاین</Text>
                        {this.state.btntext == 'ادامه' ? <TextInput
                            style={styles.input}
                            selectionColor={'#6f8fb3'}
                            placeholder='شماره موبایل'

                            keyboardType={'number-pad'}
                            ref={input => {
                                this.phoneNumber = input;
                            }}
                            onChangeText={text => this.setState({phoneNumber: text})}/> : <TextInput
                            style={styles.input}
                            selectionColor={'#6f8fb3'}
                            placeholder='رمز عبور'

                            keyboardType={'number-pad'}
                            ref={input => {
                                this.password = input;
                            }}
                            onChangeText={text => this.setState({password: text})}/>}
                        <TouchableOpacity onPress={this.entercode} style={styles.accept}>
                            <Text>{this.state.btntext}</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    head: {
        width: '90%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(11, 11, 54, 0.5)',
        borderRadius: 15,
        marginHorizontal: '5%',
        elevation: 2,
        marginTop: 20,
        marginBottom: 20,

    },
    input: {
        width: '80%',
        height: 50,
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        marginHorizontal: '10%',
        borderRadius: 20,
        marginTop: 30,
        fontFamily: 'IRANSansMobile_Light',
        lineHeight: 40,
    },
    accept: {
        width: '40%',
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
const Toast = (props) => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(
            props.message,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
            25,
            50,
        );
        return null;
    }
    return null;
};
export {LoginScreen};
