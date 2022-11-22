import React, { useContext, useEffect, useState } from "react";
import HistoricoList from "../../components/HistoricoList";
import { Text } from "react-native";

import { AuthContext } from "../../context/auth";
import {Background, Container,Nome,Saldo, Title, List} from './styles'
import { firebase } from "@react-native-firebase/database";
import { set } from "react-native-reanimated";


export default function Home(){

    const [historico , setHistorico] = useState([]);
    const [saldo , setSaldo] = useState(0)
    
    const {user} = useContext(AuthContext);

    //só vai ter uid se tiver usuario
    const uid = user && user.uid;

    useEffect(
        ()=> {
            async function loadList(){
                await firebase.database().ref('users').child(uid).on('value', (snapshot)=>{
                    setSaldo(snapshot.val().saldo);
                    
                });

                await firebase.database().ref('historico')
                .child(uid)
                .orderByChild('date')
                .limitToLast(10)
                .on('value', (snapshot)=>{
                    setHistorico([]);

                    snapshot.forEach((childItem)=>{
                        let list = {
                            key: childItem.key,
                            tipo: childItem.val().tipo,
                            valor: childItem.val().valor,
                        };

                        setHistorico((oldList)=> [...oldList, list].reverse());
                    })
                })
            }


        loadList();

        },[]
    );

    return (
        <Background>
            <Container>
                <Nome>{user && user.nome}</Nome>
                <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}</Saldo>
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