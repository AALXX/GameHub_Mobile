import { Text, View } from '../Themed'

import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AccountVideoTemplate, { IVideoTemplateProps } from './AccountVideoTemplate'
import ProfileCards from './utils/ProfileCards'
import AboutChanelTab from './AboutChanelTab'
import { useRouter } from 'expo-router'
import AccountLivetemplate from './AccountLivetemplate'

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
    const router = useRouter()
    const [refreshing, setRefreshing] = useState(false)

    const [userData, setUserData] = useState<IUserDataProps>({ UserName: '', UserDescription: '', UserEmail: '', AccountFolowers: '' })
    const [liveData, setLiveData] = useState<ILiveDataProps | null>(null)
    const [hasVideos, setHasVideos] = useState<boolean>(false)
    const [videosData, setVideosData] = useState<Array<IVideoTemplateProps>>([])

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

    const handleRefresh = async () => {
        setRefreshing(true)
        const profileData = await getProfileData(await AsyncStorage.getItem('userToken'))
        setUserData(profileData.userData)
        setLiveData(profileData.liveData)
        setRefreshing(false)
    }

    const handleScroll = async (event: any) => {
        // Check if the user has scrolled to the top
        const offsetY = event.nativeEvent.contentOffset.y
        if (offsetY <= 0) {
            // User has scrolled to the top, trigger the refresh
            await handleRefresh()
        }
    }

    switch (componentToShow) {
        case 'LandingPage':
            component = (
                <View className="flex  w-full  h-full">
                    {liveData == null ? null : (
                        <View>
                            <AccountLivetemplate
                                StreamTitle={liveData.StreamTitle}
                                Likes={liveData.Likes}
                                Dislikes={liveData.Dislikes}
                                StreamToken={liveData.StreamToken}
                                StartedAt={liveData.StartedAt}
                                UserPublicToken={userPublicToken}
                            />
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
            component = <AboutChanelTab userDescription={userData.UserDescription} />
            break

        default:
            component = <div>No matching component found</div>
    }

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={async () => {
                        await handleRefresh()
                    }}
                />
            }
        >
            <Image source={`${process.env.EXPO_PUBLIC_FILE_SERVER}/${userPublicToken}/Main_Icon.png`} placeholder="acountImage" className="self-center mt-[5vh]" style={{ width: 80, height: 80, borderRadius: 50 }} />
            <View className="flex flex-row justify-center mt-[2vh]">
                <Text className="self-center text-lg">{userData.UserName}</Text>
                <TouchableOpacity
                    onPress={() => {
                        router.push({
                            pathname: '/AccountSettings',
                            params: { UserName: userData.UserName, UserEmail: userData.UserEmail, UserVisibility: 'public', UserDescription: userData.UserDescription, UserPublicToken: userPublicToken }
                        })
                    }}
                >
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
