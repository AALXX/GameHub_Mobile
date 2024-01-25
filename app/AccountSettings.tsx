import { Button, ScrollView, Switch, TextInput, TouchableOpacity } from 'react-native'

import React, { useEffect, useState } from 'react'
import { View, Text } from '../components/Themed'
import axios from 'axios'
import { accLogout, deleteAccount } from '../auth/Auth'
import { Picker } from '@react-native-picker/picker'
import { router, useLocalSearchParams } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface IAccoutSettingsPopupProps {
    UserName: string
    UserEmail: string
    UserVisibility: string
    UserDescription: string
    UserPrivateToken: string
}

const AccountSettings = (props: IAccoutSettingsPopupProps) => {
    const [userName, setUserName] = useState<string>('')
    const [email, setEmail] = useState('')
    const [Visibility, setVisibility] = useState('')
    const [description, setDescription] = useState('')
    const params = useLocalSearchParams()

    // const userToken: string = getCookie('userToken') as string

    const [sure, setSure] = useState(false)

    useEffect(() => {
        setUserName(params.UserName as string)
        setEmail(params.UserEmail as string)
        setVisibility(params.UserVisibility as string)
        setDescription(params.UserDescription as string)
    }, [])

    const changeUserData = async () => {
        const userToken = await AsyncStorage.getItem('userToken')
        axios
            .post(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/user-account/change-user-data`, {
                userName: userName,
                userEmail: email,
                userDescription: description,
                userVisibility: Visibility,
                userToken: userToken
            })
            .then(res => {
                if (res.data.error) {
                    alert('error encoutered!')
                }
                // window.location.reload()
            })
            .catch(err => {
                if (err) {
                    alert(`error, ${err.message}`)
                }
            })
    }

    const changePassword = () => {
        axios.post(`${process.env.SERVER_BACKEND}/user-account-manager/change-user-password-check-link`, { userEmail: props.UserEmail }).then(res => {
            if (res.data.error) {
                window.alert('error')
            }
            // Router.reload()
        })
    }

    return (
        <ScrollView className="fixed w-full h-full bg-[#323232]">
            <View className="flex flex-col w-full items-center">
                <View className="flex flex-col self-center w-[90%] ">
                    <Text className="text-[#ffffff] mt-4">Username</Text>
                    <View className="flex h-[2.5rem]">
                        <TextInput className="text-white bg-[#3b3b3b] h-[6vh] mt-[2%] indent-3" placeholder="User Name..." value={userName} onChangeText={text => setUserName(text)} />
                    </View>

                    <Text className="text-white mt-4">Email</Text>
                    <View className="flex h-[2.5rem] mt-[1rem]">
                        <TextInput className="text-white bg-[#3b3b3b] h-[6vh] mt-[2%] indent-3" placeholder="Email" keyboardType="email-address" value={email} onChangeText={text => setEmail(text)} />
                    </View>
                </View>
                <View className="flex self-center w-[90%] flex-col mt-4">
                    <Text className=" text-white mt-[1rem]">Profile Visibility:</Text>
                    <Picker className="h-4 bg-[#3b3b3b] w-full text-white" selectedValue={Visibility} onValueChange={itemValue => setVisibility(itemValue)}>
                        <Picker.Item label="Public" value="public" />
                        <Picker.Item label="Private" value="private" />
                    </Picker>
                </View>
                <View className="flex self-center mt-4 w-[90%] flex-col">
                    <Text className="mt-[1rem] text-white">About Chanel:</Text>
                    <TextInput
                        className="bg-[#3b3b3b]"
                        style={{
                            color: 'white',
                            height: 7 * 20, // Adjust the height based on the number of rows and font size
                            textAlignVertical: 'top' // Align text to the top
                        }}
                        multiline
                        placeholder="Your message"
                        maxLength={100}
                        onChangeText={text => setDescription(text)}
                        value={description}
                    />
                </View>
                <TouchableOpacity
                    className="flex flex-row bg-[#575757] border-none text-white mt-4 h-8 w-[90%]  hover:bg-[#525252] active:bg-[#2b2b2b]"
                    onPress={async () => {
                        await changeUserData()
                    }}
                >
                    <Text className="w-full text-white h-8 text-center mt-2 hover:bg-[#525252] active:bg-[#2b2b2b]">Update</Text>
                </TouchableOpacity>
            </View>

            <View className="self-center h-[0.1vh] w-[90%] bg-white mt-4" />
            <View className="flex flex-col w-[90%]  self-center">
                <TouchableOpacity
                    className="flex flex-row bg-[#575757] self-center  border-none text-white mt-4 h-8 w-full  hover:bg-[#525252] active:bg-[#2b2b2b]"
                    onPress={() => {
                        alert('delete')
                        // changePassword()
                    }}
                >
                    <Text className="w-full text-white h-8 text-center mt-2 hover:bg-[#525252] active:bg-[#2b2b2b]">Change Password</Text>
                </TouchableOpacity>
            </View>

            <View className="self-center h-[0.1vh] w-[90%] bg-white mt-4" />
            <View className="flex flex-col w-[90%]  self-center">
                <TouchableOpacity
                    className="flex flex-row bg-[#575757] self-center  border-none text-white mt-4 h-8 w-full  hover:bg-[#525252] active:bg-[#2b2b2b]"
                    onPress={() => {
                        accLogout()
                        router.replace('/AccountProfile')
                    }}
                >
                    <Text className="w-full text-white h-8 text-center mt-2 hover:bg-[#525252] active:bg-[#2b2b2b]">Log Out</Text>
                </TouchableOpacity>
            </View>

            <View className="self-center h-[0.1vh] w-[90%] bg-white mt-4" />
            <View className="flex flex-col w-[90%] self-center">
                <TouchableOpacity
                    className="flex flex-row bg-[#ad2c2c] self-center  border-none text-white mt-4 h-8 w-full  hover:bg-[#525252] active:bg-[#2b2b2b]"
                    onPress={async () => {
                        const succesfullDeleted = await deleteAccount(sure, (await AsyncStorage.getItem('userToken')) as string)
                        if (succesfullDeleted) {
                            accLogout()
                            router.replace('/AccountProfile')
                        }
                    }}
                >
                    <Text className="w-full text-white h-8 text-center mt-2 hover:bg-[#525252] active:bg-[#2b2b2b]">Delete Account</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: '3%' }}>
                    <Switch trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={sure ? '#f5dd4b' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={() => setSure(!sure)} value={sure} />
                    <Text className="text-white ml-3">Sure</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default AccountSettings
