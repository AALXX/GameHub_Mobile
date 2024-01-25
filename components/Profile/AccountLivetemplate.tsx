import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { abbreviateNumber } from './utils/NumberAbrev'
import TruncatedText from './utils/TruncatedText'

export interface ILiveStreamProps {
    StreamTitle: string
    Likes: number
    Dislikes: number
    StreamToken: string
    StartedAt: string
    UserPublicToken: string
}

const AccountLivetemplate = (props: ILiveStreamProps) => {
    return (
        <View className="flex mt-[2vh] w-full ">
            <Link href={`/live/${props.StreamToken}`} asChild>
                <TouchableOpacity className="w-full h-full">
                    <View className="flex flex-col bg-white w-full h-full">
                        <Image source={`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/${props.UserPublicToken}/${props.StreamToken}/Thumbnail_image.jpg`} className="absolute self-center w-[100vw] h-[27.57vh]" />
                        <View className="flex flex-col h-full z-10">
                            <View className="flex flex-row mt-auto bg-[#00000088] h-[25%]">
                                <TruncatedText text={props.StreamTitle} characters={26} className="text-white text-lg self-center ml-3" />

                                <View className="flex flex-row ml-auto">
                                    <Image source={require('../../assets/PlayerIcons/Like_icon.svg')} className="self-center mr-1" style={{ width: 20, height: 20 }} alt="LikeIcon" />
                                    <Text className="text-white self-center mr-3">{abbreviateNumber(props.Likes)}</Text>

                                    <Image source={require('../../assets/PlayerIcons/Dislike_icon.svg')} className="self-center mr-1" style={{ width: 20, height: 20 }} alt="DisLikeIcon" />
                                    <Text className="text-white self-center mr-5">{abbreviateNumber(props.Dislikes)}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Link>
        </View>
    )
}

export default AccountLivetemplate
