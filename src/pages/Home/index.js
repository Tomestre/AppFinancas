import React, { useContext, useState } from "react";
import HistoricoList from "../../components/HistoricoList";
import { Text } from "react-native";

import { AuthContext } from "../../context/auth";
import {Background, Container,Nome,Saldo, Title, List} from './styles'


export default function Home(){

    const [historico , setHistorico] = useState([
        {key:'1', tipo:'receita', valor: 1200},
        {key:'2', tipo:'despesa', valor: 200},
    ]);
    
    const {user} = useContext(AuthContext);

    return (
        <Background>
            <Container>
                <Nome>Lucas</Nome>
                <Saldo>R$ 122,00</Saldo>
            </Container>

            <Title>Ultimas movimentações</Title>
            
            <List
            showVerticalScrollIndicator={false}
            data={historico}
            keyExtractor={item => item.key}
            renderItem={({item})=> (<HistoricoList data={item} />)}
            />
            
            

        </Background>
    )
}