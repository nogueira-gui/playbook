import React from 'react';
import {Text,View,Button,SafeAreaView,ScrollView,StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import { AuthContext } from "../context/authContext";
import Spacer from "../components/spacer";
import jsonFile from "../../assets/playbookEx.json";

export default function Devocional(){
    const { signOut } = React.useContext(AuthContext);
   
    return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
         <Text style={styles.title}>
         Me diga com quem tu andas... 
         </Text>
         <Text style={styles.texto}>
         “Não vos enganeis. As más companhias corrompem os bons costumes.” 1Co 15:33 (AXXI)
         </Text>
         <Text style={styles.texto}>
         Karl Menninger foi um psiquiatra americano muito influente no século passado. 
         Ele disse que “meio ambiente é mais importante do que hereditariedade” 
         no processo de formação de uma pessoa. Quando você nasceu, carregou em si 
         uma herança genética, que ao longo dos anos desenvolveram algumas características 
         físicas e até psicológicas. Todavia, sua maior influência para formação do seu 
         comportamento atual veio do meio ambiente onde você viveu até hoje. Se uma criança brasileira, 
         após ter nascido, for levada para a China e passar seus próximos sete anos em Pequim, 
         sendo criada por uma família chinesa, qual o idioma e costumes essa criança terá?
         </Text> 
         <Text style={styles.texto}>
         Você já deve ter ouvido o ditado: “Me diga com quem tu andas e te direis quem és”. Certamente você já ouviu ou leu isso em algum lugar. Isso explica porque muitas pessoas não conseguem mudar seus resultados. O meio ambiente e as pessoas com quem convivemos estão sempre exercendo algum tipo de influência sobre nós.
         Jim Rohn foi um empreendedor, autor e palestrante motivacional americano. Este homem disse que nós somos a média das cinco pessoas com quem mais relacionamos. A média em peso, renda, conhecimento, estilo de vida. Poucas coisas vão te deixar mais desconfortável, vão te tirar da zona de conforto do que estar rodeado de pessoas melhores do que você. No outro extremo, estar envolvido por pessoas erradas vão sempre te trazer dano, dor e prejuízo.
         Se você realmente quer resultados extraordinários na vida, ande e acompanhe pessoas extraordinárias. 
         </Text><Text style={styles.subtitle}>Más companhias impedem o mover de Deus
         </Text><Text style={styles.texto}>
         Dependendo do lugar onde você estiver, e principalmente com as pessoas que estiverem o acompanhando, o mover de Deus fica impedido. Pessoas com pensamentos errados podem trazer muito dano.
         </Text><Text style={styles.texto}>“53 Tendo Jesus proferido estas parábolas, retirou-se dali. 54 E, chegando à sua terra, ensinava-os na sinagoga, de tal sorte que se maravilhavam e diziam: Donde lhe vêm esta sabedoria e estes poderes miraculosos? 55 Não é este o filho do carpinteiro? Não se chama sua mãe Maria, e seus irmãos, Tiago, José, Simão e Judas? 56 Não vivem entre nós todas as suas irmãs? Donde lhe vem, pois, tudo isto? 57 E escandalizavam-se nele. Jesus, porém, lhes disse: Não há profeta sem honra, senão na sua terra e na sua casa. 58 E não fez ali muitos milagres, por causa da incredulidade deles.” Mt 13:53-58
         </Text><Text style={styles.texto}>Está claro no texto que aquelas pessoas incrédulas impediram a manifestação plena do poder de Deus através de Cristo. 
         Você já deve ter tido a experiência de estar com determinada pessoa ou num determinado lugar e parecer que os céus estavam fechados. Foi isso o que aconteceu com Cristo. Ele estava próximo de pessoas incrédulas, num lugar de incredulidade, e por consequência o poder não fluiu. 
         </Text><Text style={styles.texto}>
         Não há relação neutra
         Pessoas influenciam nosso comportamento, porque antes influenciam nossa maneira de pensar. Por isso, podemos afirmar que não há relação neutra.
         Não existem relacionamentos neutros nas nossas vidas. Todas as pessoas com quem relacionamos provocam algum tipo de resultado em nós. Pessoas nos alegram ou nos entristecem; nos colocam pra cima ou pra baixo; nos ajudam ou atrapalham. As pessoas com quem relacionamos tem esse poder de nos fazer o bem, e nos fazer sentirmos melhores, ou nos trazer dano, dor e sofrimento. 
         </Text><Text style={styles.subtitle}>
         Quem são as pessoas com quem você está relacionando? 
         </Text><Text style={styles.texto}>
         Lembre-se: </Text><Text style={styles.texto}>
         “1 Bem-aventurado o homem que não anda no conselho dos ímpios, não se detém no caminho dos pecadores, nem se assenta na roda dos escarnecedores. 2 Antes, o seu prazer está na lei do SENHOR, e na sua lei medita de dia e de noite.” Sl 1:1-2 
         </Text><Text style={styles.byLine}>
         Texto extraído do livro “Metanoia” de Edenir Araújo
         </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: "center",
       marginTop: 2,//Constants.statusBarHeight,
      //  backgroundColor: "#265099",
       // tintColor: "#FFF"
    },
    input:{
       tintColor: "#FFF"
    },
    scrollView: {
      backgroundColor: 'steelblue',
      marginHorizontal: 10,
    },
     texto: {
       fontSize: 18,
       textAlign: "justify",
       color: 'white',
       marginLeft: 15,
       marginRight: 15,
       alignSelf: "center",
       marginTop: 15
     },
     title: {
      fontSize: 25,
      textAlign: "justify",
      color: 'white',
      marginLeft: 15,
      marginRight: 15,
      alignSelf: "center",
      fontWeight:"bold"
      
    },
    subtitle: {
      fontSize: 24,
      textAlign: "justify",
      color: '#FFF',
      marginLeft: 15,
      marginRight: 15,
      alignSelf: "center",
      fontWeight:"bold",
      marginTop: 15
    },
    byLine: {
      fontSize: 14,
      textAlign: "justify",
      color: 'white',
      marginLeft: 15,
      marginRight: 15,
      alignSelf: "center",
      fontWeight:"bold",
      marginBottom: 100
    }
 });