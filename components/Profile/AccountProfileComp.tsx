import { Text, View } from '../Themed'

import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AccountVideoTemplate, { IVideoTemplateProps } from './AccountVideoTemplate'
import ProfileCards from './utils/ProfileCards'

interface IUserDataProps {
    UserName: string
    UserDescription: string
    UserEmail: string
    AccountFolowers: string
}

interface ILiveDataProps {
    StreamTitle: string
    Likes: number
    Dislikes: number
    StreamToken: string
    StartedAt: string
}

const AccountProfile = () => {
    const [userPublicToken, setUserPublicToken] = useState<string>('')

    const [userData, setUserData] = useState<IUserDataProps>({ UserName: '', UserDescription: '', UserEmail: '', AccountFolowers: '' })
    const [liveData, setLiveData] = useState<ILiveDataProps | null>(null)
    const [hasVideos, setHasVideos] = useState<boolean>(false)
    const [videosData, setVideosData] = useState<Array<IVideoTemplateProps>>([])

    const [ToggledSettingsPopUp, setToggledSettingsPopUp] = useState(false)
    const [ToggledIconChangePopUp, setToggledIconChangePopUp] = useState(false)

    const [isAccIconHovered, setIsAccIconHovered] = useState(false)
    const [componentToShow, setComponentToShow] = useState<string>('LandingPage')

    let component

    const getProfileData = async (userToken: string | null) => {
        const resData = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/user-account/get-account-data/${userToken}`)
        if (resData.data.error == true) {
            return console.error('ERROR GET PROFILE DATA FAILED')
        }

        return resData.data
    }

    const getProfileVideos = async (userToken: string | null) => {
        const resData = await axios.get(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/user-account/get-account-videos/${userToken}`)
        if (resData.data.error == true) {
            return console.error('ERROR GET PROFILE VIDEO DATA FAILED')
        }

        return resData.data.videos
    }

    useEffect(() => {
        /**
         * Get user profile Data
         */
        ;(async () => {
            const UserPublicToken = await AsyncStorage.getItem('userPublicToken')
            setUserPublicToken(UserPublicToken || '')

            const profileData = await getProfileData(await AsyncStorage.getItem('userToken'))
            setUserData(profileData.userData)
            setLiveData(profileData.liveData)

            const profileVideos = await getProfileVideos(await AsyncStorage.getItem('userToken'))
            if (Object.keys(profileVideos).length !== 0) {
                setHasVideos(true)
                setVideosData(profileVideos)
            }
        })()
    }, [])

    switch (componentToShow) {
        case 'LandingPage':
            component = (
                <View className="grid xl:grid-cols-6 lg:grid-cols-5 gap-4 mt-[2vh]">
                    {liveData == null ? null : (
                        <View>
                            <Text>Landing</Text>
                            {/* <AccountLivetemplate StreamTitle={liveData.StreamTitle} Likes={liveData.Likes} Dislikes={liveData.Dislikes} StreamToken={liveData.StreamToken} StartedAt={liveData.StartedAt} /> */}
                        </View>
                    )}
                </View>
            )
            break
        case 'Videos':
            component = (
                <>
                    {hasVideos ? (
                        <View className="flex  w-full  h-full">
                            {videosData.map((video: IVideoTemplateProps, index: number) => (
                                <AccountVideoTemplate key={index} VideoTitle={video.VideoTitle} VideoToken={video.VideoToken} Likes={video.Likes} Dislikes={video.Dislikes} userPublicToken={userPublicToken} />
                            ))}
                        </View>
                    ) : (
                        <></>
                    )}
                </>
            )

            break
        case 'About':
            // component = <AboutChanelTab userDescription={userData.UserDescription} />
            break

        default:
            component = <div>No matching component found</div>
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={`${process.env.EXPO_PUBLIC_FILE_SERVER}/${userPublicToken}/Main_Icon.png`} placeholder="acountImage" className="self-center mt-[5vh]" style={{ width: 80, height: 80, borderRadius: 50 }} />
            <View className="flex flex-row justify-center mt-[2vh]">
                <Text className="self-center text-lg">{userData.UserName}</Text>
                <TouchableOpacity>
                    <Image source={require('../../assets/AccountIcons/Settings_icon.svg')} className="ml-1 w-6 h-6 self-center" alt="SettingIcon" />
                </TouchableOpacity>
            </View>
            <Text className="self-center">Followers: {userData.AccountFolowers}</Text>
            <View className="flex flex-row h-[8vh] items-center w-full ">
                <ProfileCards Title="LANDING PAGE" TabName="LandingPage" setComponentToShow={setComponentToShow} />
                <ProfileCards Title="VIDEOS" TabName="Videos" setComponentToShow={setComponentToShow} />
                <ProfileCards Title="ABOUT ME" TabName="About" setComponentToShow={setComponentToShow} />
            </View>
            <View className="self-center h-[0.1vh] w-full bg-white mt-[0.5vh]" />
            <View className="flex w-full self-center h-full ">{component}</View>
        </ScrollView>
    )
}

export default AccountProfile

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: '100%'
    }
})
