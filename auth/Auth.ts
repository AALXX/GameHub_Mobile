import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const accRegisterFunc = async (userName: string, userEmail: string, password: string, repeatedPassword: string) => {
    if (password !== repeatedPassword) {
        alert("Passwords don't match!")
        return false
    }

    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/user-account/register-account`, {
        userName,
        userEmail,
        password
    })

    if (!res.data.error && res.data.userprivateToken != null) {
        await AsyncStorage.setItem('userToken', res.data.userprivateToken)
        await AsyncStorage.setItem('userPublicToken', res.data.userpublictoken)
        return true
    }

    return false
}

const accLoginFunc = async (userEmail: string, password: string) => {
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/user-account/login-account`, {
        userEmail,
        password
    })
    if (!res.data.error && res.data.userprivateToken != null) {
        await AsyncStorage.setItem('userToken', res.data.userprivateToken)
        await AsyncStorage.setItem('userPublicToken', res.data.userpublicToken)
        return true
    }

    if (res.data.userprivateToken === null) {
        alert('incorect credentials!')
    }

    return false
}

const accLogout = async () => {
    try {
        await AsyncStorage.removeItem('userToken')
        await AsyncStorage.removeItem('userPublicToken')

        window.location.reload()
    } catch (e) {
        console.log(`is logged in error ${e}`)
    }
}

const isLoggedIn = async () => {
    //* client-side
    const userToken = await AsyncStorage.getItem('userToken')
    if (userToken != undefined) {
        return true
    } else {
        return false
    }
}

const deleteAccount = async (sure: boolean, UserPrivateToken: string) => {
    if (!sure) {
        window.alert('CheckBox Not Checked')
        return false
    }

    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_BACKEND}/user-account/delete-user-account/`, { userToken: UserPrivateToken })
    if (res.data.error) {
        window.alert('error')
        return false
    }

    return true
}


export { accRegisterFunc, accLoginFunc, accLogout, isLoggedIn, deleteAccount }
