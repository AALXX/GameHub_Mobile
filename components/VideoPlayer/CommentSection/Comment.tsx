import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Image } from 'expo-image'

interface ICommentProps {
    ownerToken: string
    comment: string
    ownerName: string
}

const Comment = (props: ICommentProps) => {
    return (
        <View className="flex flex-col bg-[#494949] h-[14vh] w-[95%] mt-4 self-center">
            <View className="flex flex-row  w-full h-[7vh]">
                <Link href={`/user?id=${props.ownerToken}`} className="self-center" asChild>
                    <TouchableOpacity>
                        <Image source={`${process.env.EXPO_PUBLIC_FILE_SERVER}/${props.ownerToken}/Main_Icon.png`} className="ml-1 w-10 h-10 self-center rounded-full" alt="SettingIcon" />
                    </TouchableOpacity>
                </Link>
                <Text className="text-white mt-4 ml-2">{props.ownerName}</Text>
            </View>
            <View className="self-center h-[0.1vh] w-full bg-white" />
            <View className="flex  w-[92%] self-center  h-full">
                <Text className="text-white mt-2 text-sm">{props.comment}</Text>
            </View>
        </View>
    )
}

export default Comment
