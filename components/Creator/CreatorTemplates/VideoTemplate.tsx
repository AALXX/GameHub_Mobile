import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
export interface IVideoTemplateProps {
    VideoTitle: string
    VideoToken: string
    Likes: number
    Dislikes: number
    OwnerName: string
    OwnerToken: string
}

import { Image } from 'expo-image'
import TruncatedText from '../../Profile/utils/TruncatedText'
import { abbreviateNumber } from '../../Profile/utils/NumberAbrev'

const VideoTemplate = (props: IVideoTemplateProps) => {
    return (
        <View className="flex mt-[2vh] w-full h-56 ">
            <Link href={`/watch/${props.VideoToken}`} asChild>
                <TouchableOpacity className="w-full h-full">
                    <View className="flex flex-col bg-white w-full h-full ">
                        <Image
                            source={`${process.env.EXPO_PUBLIC_FILE_SERVER}/${props.OwnerToken}/${props.VideoToken}/Thumbnail_image.jpg`}
                            placeholder="acountImage"
                            className="absolute self-center w-[100vw] h-[27.57vh]"
                        />
                        <View className="flex flex-col h-full ">
                            <View className="flex flex-row mt-auto bg-[#00000088] h-[30%]">
                                <Image source={`${process.env.EXPO_PUBLIC_FILE_SERVER}/${props.OwnerToken}/Main_Icon.png`} placeholder="acountImage" className=" rounded-full self-center w-9 h-9" />

                                <View className="flex flex-col self-center w-[60%]">
                                    <Text className="text-white text-base ml-3">{props.OwnerName}</Text>
                                    <View className="self-center h-[0.1vh] w-[90%] bg-white " />

                                    <TruncatedText text={props.VideoTitle} characters={26} className="text-white text-base ml-3" />
                                </View>
                                <View className="flex flex-row ml-auto">
                                    <Image source={require('../../../assets/PlayerIcons/Like_icon.svg')} className="self-center mr-1" style={{ width: 20, height: 20 }} alt="LikeIcon" />
                                    <Text className="text-white self-center mr-2">{abbreviateNumber(props.Likes)}</Text>

                                    <Image source={require('../../../assets/PlayerIcons/Dislike_icon.svg')} className="self-center mr-1" style={{ width: 20, height: 20 }} alt="DisLikeIcon" />
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

export default VideoTemplate
