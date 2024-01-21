import React, { Dispatch, SetStateAction } from 'react'
import { TouchableOpacity, View, Text } from 'react-native'

interface IProfileCardsProps {
    Title: string
    TabName: string
    setComponentToShow: Dispatch<SetStateAction<string>>
}

const ProfileCards = (props: IProfileCardsProps) => {
    return (
        <TouchableOpacity className="mt-auto w-[32vw] h-[4vh] ml-1" onPress={() => props.setComponentToShow(props.TabName)}>
            <View className="flex flex-col bg-[#6b6b6b62] h-full justify-center  cursor-pointer">
                <Text className="text-white self-center ">{props.Title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default ProfileCards
