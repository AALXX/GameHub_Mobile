import { StyleSheet, Button, TouchableOpacity } from 'react-native'

import { Text, View } from '../../components/Themed'
import { Link } from 'expo-router'
import { useEffect, useState } from 'react'
import { isLoggedIn } from '../../auth/Auth'
import AccountProfileComp from '../../components/Profile/AccountProfileComp'

const AccountProfile = () => {
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        const loginAync = async () => {
            const usrLoggedIn = await isLoggedIn()
            setUserLoggedIn(usrLoggedIn)
        }
        loginAync()
    }, [])

    return (
        <View style={styles.container}>
            {userLoggedIn ? (
                <AccountProfileComp />
            ) : (
                <View className="flex w-full h-full">
                    <Text className="mt-8 text-lg self-center">Not logged In</Text>
                    <Link href="/LoginRegisterModal" asChild className="self-center">
                        <TouchableOpacity>
                            <Text className="text-lg">login!</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            )}
        </View>
    )
}

export default AccountProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})
