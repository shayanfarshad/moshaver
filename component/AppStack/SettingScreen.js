import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, PixelRatio, Image, TextInput, KeyboardAvoidingView } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import LottieView from 'lottie-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment-jalaali';

class SettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roll: '',
            show: false,
            provider: {},
            workTime: ['', ''],
            timeClick: true,
            client:{}
        }
        AsyncStorage.getItem('@roll').then((value) => {
            this.setState({ roll: value });
        })
            .then(res => {
                //do something else
            });
        AsyncStorage.getItem('@provider').then((value) => {
            this.setState({ provider: value });
        })
            .then(res => {
                //do something else
                console.log('pro', this.state.provider)
            });
        AsyncStorage.getItem('@client').then((value) => {
            this.setState({ client: value });
        })
            .then(res => {
                //do something else
                console.log('cli', this.state.client)
            });
    }

    selectPhotoTapped = () => {
        const options = {
            title: 'Select Avatar',
            allowsEditing: 'true',
            cancelButtonTitle: 'انصراف',
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                    avatarSource: source,
                });
            }
        });
    }

    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        const jDate = moment(currentDate).format('HH:mm');
        const timeArr = this.state.workTime;
        if (this.state.timeClick) {
            timeArr[0] = jDate;
            this.setState({ workTime: timeArr, timeClick: false })
            console.log(timeArr[0], this.state.timeClick)
        } else {
            timeArr[1] = jDate;
            this.setState({ workTime: timeArr, timeClick: true, show: false })
            console.log(timeArr[1], this.state.timeClick, this.state.workTime)
        }

    };

    showTimepicker = () => {
        this.setState({ show: true })
    };

    handleCard = (number) => {
        this.setState({
            cardNumber: number.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim(),
        });
    }
    saveProfileClient = () => {
        const profile = new Object();
        profile.nickname = this.state.clientNickName;
        profile.avatar = this.state.avatarSource;
        AsyncStorage.setItem('@client', JSON.parse(profile))
    }
    saveProfileProvider = () => {
        const profile = new Object();
        profile.username = this.state.username;
        profile.nickname = this.state.nickname;
        profile.number = this.state.number;
        profile.avatar = this.state.avatarSource;
        profile.cardNumber = this.state.cardNumber;
        profile.workTime = this.state.workTime;
        console.log('pro : ', profile)
        AsyncStorage.setItem('@provider', JSON.parse(profile))
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.roll == 'client' ?
                    <View style={styles.mainview}>
                        <KeyboardAvoidingView
                            behavior="padding"
                            enabled
                            style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                                <LottieView source={require('../../assets/anim/setting3.json')} loop autoPlay style={{ marginLeft: '30%' }} />
                                <TouchableOpacity onPress={this.selectPhotoTapped}>
                                    <View
                                        style={[styles.avatar, styles.avatarContainer, { marginBottom: 40, marginLeft: '5%' }]}>
                                        {this.state.avatarSource == null ? (
                                            <Text style={{ fontSize: 20, color: 'black' }}>آپلود عکس</Text>
                                        ) : (
                                                <Image style={styles.avatar} source={this.state.avatarSource} />
                                            )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.items}>
                                <Text style={{ color: 'yellow', fontSize: 18, width: '40%' }}>نام مستعار : </Text>
                                <TextInput
                                    ref={input => {
                                        this.clientNickName = input;
                                    }}
                                    style={styles.inputItem}
                                    onChangeText={(text) => this.setState({ clientNickName: text })} />
                            </View>
                        </KeyboardAvoidingView>
                        <TouchableOpacity onPress={this.saveProfileClient} style={{ width: '50%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, elevation: 10, marginBottom: 20 }}>
                            <Text>ذخیره</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.mainview}>
                        <KeyboardAvoidingView
                            behavior="padding"
                            enabled
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                                <LottieView source={require('../../assets/anim/setting3.json')} loop autoPlay style={{ marginLeft: '30%' }} />
                                <TouchableOpacity onPress={this.selectPhotoTapped}>
                                    <View
                                        style={[styles.avatar, styles.avatarContainer, { marginBottom: 40, marginLeft: '5%' }]}>
                                        {this.state.avatarSource == null ? (
                                            <Text style={{ fontSize: 20, color: 'black' }}>آپلود عکس</Text>
                                        ) : (
                                                <Image style={styles.avatar} source={this.state.avatarSource} />
                                            )}
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.items}>
                                <Text style={{ color: 'yellow', fontSize: 18, width: '40%' }}>نام و نام خانوادگی : </Text>
                                <TextInput
                                    ref={input => {
                                        this.username = input;
                                    }}
                                    style={styles.inputItem}
                                    onChangeText={(text) => this.setState({ username: text })} />
                            </View>
                            <View style={styles.items}>
                                <Text style={{ color: 'yellow', fontSize: 18, width: '40%' }}>نام مستعار :</Text>
                                <TextInput
                                    ref={input => {
                                        this.nickname = input;
                                    }}
                                    style={styles.inputItem}
                                    onChangeText={(text) => this.setState({ nickname: text })} />
                            </View>
                            <View style={styles.items}>
                                <Text style={{ color: 'yellow', fontSize: 18, width: '40%' }}>تلفن تماس :</Text>
                                <TextInput
                                    ref={input => {
                                        this.number = input;
                                    }}
                                    style={styles.inputItem}
                                    onChangeText={(text) => this.setState({ number: text })} />
                            </View>
                            <View style={styles.items}>
                                <Text style={{ color: 'yellow', fontSize: 18, width: '40%' }}>ساعت کاری :</Text>
                                <TouchableOpacity onPress={this.showTimepicker} style={{
                                    width: '59%',
                                    height: 50,
                                    marginRight: '1%', justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <TextInput style={[styles.inputItem, { width: '100%' }]}
                                        editable={false}
                                        value={this.state.workTime[0] + ' تا ' + this.state.workTime[1]}
                                        ref={input => {
                                            this.workTime = input;
                                        }}
                                        onChangeText={text => this.setState({ workTime: text })} />
                                </TouchableOpacity>
                            </View>

                            {this.state.show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    timeZoneOffsetInMinutes={0}
                                    value={new Date()}
                                    mode={"time"}
                                    is24Hour={true}
                                    display="default"
                                    onChange={this.onChange}
                                />
                            )}
                            <View style={styles.items}>
                                <Text style={{ color: 'yellow', fontSize: 18, width: '40%' }}>شماره کارت بانکی :</Text>
                                <TextInput
                                    ref={input => {
                                        this.cardNumber = input;
                                    }}
                                    placeholder='0000-0000-0000-0000'
                                    value={this.state.cardNumber}
                                    onChangeText={(text) => this.handleCard(text)}
                                    keyboardType={'numeric'}
                                    style={[styles.inputItem, { fontSize: 16 }]} />
                            </View>
                        </KeyboardAvoidingView>
                        <TouchableOpacity onPress={this.saveProfileProvider} style={{ width: '50%', height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 10, elevation: 10, marginBottom: 20 }}>
                            <Text>ذخیره</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainview: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        paddingTop: 40,
        paddingHorizontal: '5%',
        backgroundColor: '#0e2d45'
    },
    avatarContainer: {
        backgroundColor: 'white',
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 20,
        width: 150,
        height: 150,
    },
    items: {
        width: '95%',
        marginHorizontal: '2.5%',
        height: 60,
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    inputItem: {
        width: '58%',
        height: 50,
        marginRight: '2%',
        marginVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 2,
        textAlign: 'center',
        color: 'black',
        fontSize: 18,
        fontFamily: 'IRANSansMobile_Light'
    }
})
export { SettingScreen }
