import { StyleSheet, Button } from 'react-native'

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
                <Link href="/LoginRegisterModal" asChild>
                    <Button title="login" />
                </Link>
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
