import { TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import { Link } from 'expo-router'

interface INavBar {
    title: string
}

const NavBar = (props: INavBar) => {

    return (
        <View className="w-full h-[12vh] bg-[#0f0f0f] flex flex-row justify-between items-center">
            <View className="flex mt-[6vh] w-full">
                <Link href={`/search`} asChild>
                    <TouchableOpacity className="flex justify-center ml-auto mr-4  w-10 h-9 self-center ">
                        <Image source={require(`../assets/Search_Icon.svg`)} className=" w-8 h-8 self-center " alt="sendSearch" />
                    </TouchableOpacity>
                </Link>
            </View>
        </View>
    )
}

export default NavBar
