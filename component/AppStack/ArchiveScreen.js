import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
class ArchiveScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roll: '',
            archiveList: [
                {
                    id: 0,
                    Subject: 'گوش قهرمان',
                    Date: '24/11/98',
                    Time: '23 دقیقه',
                    Cost: '30000 تومان',
                    Final: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد'
                },
                {
                    id: 1,
                    Subject: 'گوش قهرمان',
                    Date: '24/11/98',
                    Time: '60 دقیقه',
                    Cost: '100000 تومان',
                    Final: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد'
                },
                {
                    id: 2,
                    Subject: 'گوش قهرمان',
                    Date: '24/11/98',
                    Time: '35 دقیقه',
                    Cost: '50000 تومان',
                    Final: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد'
                },
                {
                    id: 3,
                    Subject: 'گوش قهرمان',
                    Date: '24/11/98',
                    Time: '16 دقیقه',
                    Cost: '20000 تومان',
                    Final: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد'
                }
            ]
        },
            AsyncStorage.getItem('@roll').then((value) => {
                this.setState({ roll: value });
            })
                .then(res => {
                    //do something else
                });
    }


    render() {
        return (
            <View style={{ flex: 1, width: '100%', backgroundColor: 'orange' }}>
                <SafeAreaView>
                    <ScrollView>
                        <FlatList
                            data={this.state.archiveList}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (

                                    <View style={styles.archivecard}>
                                        <ScrollView>
                                            {this.state.roll == 'client' ?
                                                <View>
                                                    <Text>موضوع مشاوره : {item.Subject}</Text>
                                                    <Text>تاریخ مشاوره : {item.Date}</Text>
                                                    <Text>زمان مشاوره : {item.Time}</Text>
                                                    <Text>هزینه مشاوره : {item.Cost}</Text>
                                                    <Text>نتیجه مشاوره : {item.Final}</Text>
                                                </View>
                                                :
                                                <View>
                                                    <Text>موضوع مشاوره : {item.Subject}</Text>
                                                    <Text>تاریخ مشاوره : {item.Date}</Text>
                                                    <Text>زمان مشاوره : {item.Time}</Text>
                                                    <Text>هزینه مشاوره : {item.Cost}</Text>
                                                    <Text>نتیجه مشاوره : {item.Final}</Text>
                                                </View>
                                            }

                                        </ScrollView>
                                    </View>
                                )
                            }}
                        />
                    </ScrollView>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    archivecard:
    {
        width: '95%',
        marginHorizontal: '2.5%',
        height: 250,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 2,
        marginVertical: 15,
        paddingHorizontal: '2%',
        paddingVertical: '2%'
    }
})
export { ArchiveScreen }
