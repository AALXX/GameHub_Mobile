import { View, Text } from 'react-native'
import React from 'react'

interface IAboutChanelProps {
    userDescription: string
}

const AboutChanelTab = (props: IAboutChanelProps) => {
    return (
        <View className="flex w-full h-full mt-1">
            <View className="flex flex-col bg-[#2c2c2c] w-[35rem] h-[50vh]">
                <Text className="text-white  mt-3 ml-3">Description:</Text>
                <View className="self-center h-[0.1vh] w-full` bg-white mt-4" />
                <Text className="text-white  mt-3 ml-3">{props.userDescription}</Text>
            </View>
        </View>
    )
}

export default AboutChanelTab
