import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import { Pressable, useColorScheme } from 'react-native'
import { Image } from 'expo-image'

import Colors from '../../constants/Colors'
import NavBar from '../NavBar'

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
}

export default function TabLayout() {
    const colorScheme = useColorScheme()

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
                    header: () => {
                        return <NavBar title="Tab One" />
                    }
                }}
            />
            <Tabs.Screen
                name="AddPost"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => <Image source={require('../../assets/AddPost.svg')} placeholder="acountImage" className="mt-10" style={{ width: 40, height: 40 }} />,
                    header: () => {
                        return <NavBar title="Tab Two" />
                    }
                }}
            />

            <Tabs.Screen
                name="AccountProfile"
                options={{
                    title: '',
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={`${process.env.EXPO_PUBLIC_FILE_SERVER}/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzQ2NzkxMjZ9.8wWitGJAELNTcTFwcsDejqp2lV0AtD5oVo2s3CxGXE4/Main_Icon.png`}
                            placeholder="acountImage"
                            className="mt-10"
                            style={{ width: 50, height: 50, borderRadius: 25 }}
                        />
                    ),
                    header: () => {
                        return <NavBar title="" />
                    }
                }}
            />
        </Tabs>
    )
}
