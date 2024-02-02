import { View } from 'react-native'
import React from 'react'
import { Text } from '../components/Themed'

interface INavBar {
    title: string
}

const NavBar = (props: INavBar) => {
    return (
        <View className="w-full h-[11vh] bg-[#0f0f0f] flex justify-between items-center">
            <View className='mt-[6vh]'>
                <Text className='text-lg'>{props.title}</Text>
            </View> 
        </View>
    )
}

export default NavBar
