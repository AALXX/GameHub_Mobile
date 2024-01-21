import { useState } from 'react'
import { TouchableOpacity, StyleSheet, TextInput, Text } from 'react-native'
import { View } from '../components/Themed'
import { accLoginFunc } from '../auth/Auth'

const LoginRegisterModal = () => {
    const [registerForm, setRegisterForm] = useState(false)

    // *-----------------------Register_Props-----------------------//
    const [registerUserName, setRegisterUserName] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerRepetedPassword, setRegisterRepeatedPassword] = useState('')

    // *-----------------------Login_Props-----------------------//
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const LogInFunc = async () => {
        const succesfullLogin = await accLoginFunc(loginEmail, loginPassword)
        if (succesfullLogin) {
            // router.push('/account')
        }
    }

    return (
        <View style={styles.container}>
            {!registerForm ? (
                <View className="flex flex-col w-[90%] h-[50%] mt-[20vh] self-center bg-[#2b2b2b] items-center">
                    <View className="flex mt-[20%] w-[80%] bg-[#2b2b2b] h-[10vh]">
                        <Text className="text-white">Email</Text>
                        <TextInput className="text-white bg-[#3b3b3b] h-[6vh] mt-[2%] indent-3" placeholder="Email..." value={loginEmail} onChangeText={text => setLoginEmail(text)} />
                    </View>
                    <View className="flex mt-[2vh] w-[80%] bg-[#2b2b2b] h-[10vh]">
                        <Text className="text-white">Password</Text>
                        <TextInput className="text-white bg-[#3b3b3b] h-[6vh] mt-[2%] indent-3" secureTextEntry={true} placeholder="Password..." value={loginPassword} onChangeText={text => setLoginPassword(text)} />
                    </View>
                    <TouchableOpacity className="mt-[5vh]" onPress={() => LogInFunc()}>
                        <Text className="text-white text-lg">Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="mt-[1vh]"
                        onPress={() => {
                            setRegisterForm(true)
                        }}
                    >
                        <Text className="text-[#9c9c9c]">Don' t Have An Account?</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="flex flex-col w-[90%] h-[70%] mt-[10vh] self-center bg-[#2b2b2b] items-center">
                    <View className="flex mt-[2vh] w-[80%] bg-[#2b2b2b] h-[10vh]">
                        <Text className="text-white">UserName</Text>
                        <TextInput className="text-white bg-[#3b3b3b] h-[6vh] mt-[2%] indent-3" placeholder="Email..." value={registerUserName} onChangeText={text => setRegisterUserName(text)} />
                    </View>
                    <View className="flex mt-[2vh] w-[80%] bg-[#2b2b2b] h-[10vh]">
                        <Text className="text-white">Email</Text>
                        <TextInput className="text-white bg-[#3b3b3b] h-[6vh] mt-[2%] indent-3" secureTextEntry={true} placeholder="Email..." value={registerEmail} onChangeText={text => setRegisterEmail(text)} />
                    </View>
                    <View className="flex mt-[2vh] w-[80%] bg-[#2b2b2b] h-[10vh]">
                        <Text className="text-white">Password</Text>
                        <TextInput
                            className="text-white bg-[#3b3b3b] h-[6vh] mt-[2%] indent-3"
                            secureTextEntry={true}
                            placeholder="Password..."
                            value={registerPassword}
                            onChangeText={text => setRegisterPassword(text)}
                        />
                    </View>
                    <View className="flex mt-[2vh] w-[80%] bg-[#2b2b2b] h-[10vh]">
                        <Text className="text-white">Repeat Password</Text>
                        <TextInput
                            className="text-white bg-[#3b3b3b] h-[6vh] mt-[2%] indent-3"
                            secureTextEntry={true}
                            placeholder="Repeat Password..."
                            value={registerRepetedPassword}
                            onChangeText={text => setRegisterRepeatedPassword(text)}
                        />
                    </View>
                    <TouchableOpacity className="mt-[5vh]" onPress={() => LogInFunc()}>
                        <Text className="text-white text-lg">Register Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="mt-[1vh]"
                        onPress={() => {
                            setRegisterForm(false)
                        }}
                    >
                        <Text className="text-[#9c9c9c]"> Already Have An Account?</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default LoginRegisterModal

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})
