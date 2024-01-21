import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Image } from 'expo-image'
import { abbreviateNumber } from './utils/NumberAbrev'
import TruncatedText from './utils/TruncatedText'

export interface IVideoTemplateProps {
    VideoTitle: string
    Likes: number
    Dislikes: number
    VideoToken: string
    userPublicToken: string
}

const AccountVideoTemplate = (props: IVideoTemplateProps) => {
    return (
        <View className="flex mt-[2vh] w-full h-56 ">
            <Link href={`/watch/${props.VideoToken}`} asChild>
                <TouchableOpacity className="w-full h-full">
                    <View className="flex flex-col bg-white w-full h-full ">
                        <Image
                            source={`${process.env.EXPO_PUBLIC_FILE_SERVER}/${props.userPublicToken}/${props.VideoToken}/Thumbnail_image.jpg`}
                            placeholder="acountImage"
                            className="absolute self-center w-[100vw] h-[27.57vh]"
                        />
                        <View className="flex flex-col h-full ">
                            <View className="flex flex-row mt-auto bg-[#00000088] h-[25%]">
                                <Link href={`/account/edit-video?vt=${props.VideoToken}`} className="self-center" asChild>
                                    <TouchableOpacity>
                                        <Image source={require('../../assets/AccountIcons/Settings_icon.svg')} className="ml-1 w-6 h-6 self-center" alt="SettingIcon" />
                                    </TouchableOpacity>
                                </Link>
                                <TruncatedText text={props.VideoTitle} characters={26} className="text-white text-lg self-center ml-3" />

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

export default AccountVideoTemplate
