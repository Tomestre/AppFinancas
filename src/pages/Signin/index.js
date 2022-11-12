
import { useNavigation } from "@react-navigation/native";
import React, {useState, useContext} from "react";
import { Platform } from "react-native";
import SignUp from "../Signup";
import {Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText} from './styled';
import {AuthContext} from "../../context/auth";


export default function SignIn(){
    
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    return (
      <Background>
        <Container
            behavior={Platform.OS === 'ios' ? 'padding' : ''}>
                <Logo source={require('../../assets/Logo.png')}/>

                <AreaInput>
                    <Input 
                    placeholder='email'
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text)=> setEmail(text)}/>

                </AreaInput>

                <AreaInput>
                    <Input 
                    placeholder='senha'
                    autoCorrect={false}
                    autoCapitalize="none"
                    value={password}
                    onChangeText={(text)=> setPassword(text)}/>

                </AreaInput>

                <SubmitButton>
                    <SubmitText>Entrar</SubmitText>
                </SubmitButton>

                <Link onPress={() => navigation.navigate(SignUp)}>
                <LinkText>Criar uma conta!</LinkText>
                </Link>


        </Container>
      </Background>
    )
}