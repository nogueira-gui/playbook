import React from 'react';
import { Text, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import Card from '../../components/card';
import adjust from '../../utils/fontAdjust';
import { useTheme } from '../../context/theme';
import { useAdControl } from '../../context/admobControl';
import { StatusBar } from 'expo-status-bar';
import MonetizationCtrl from "../../services/monetization";
import { BannerAdUpgradePage } from '../../components/bannerAd';
import RewardInterstitialAdButton from '../../components/rewardedInterstitialAdButton';

const UpgradePage = () => {
  const { modeStyle } = useTheme();
  const { premium, tempPremium, setPremium } = useAdControl();
  const [isUpgradeBtnLoading, setIsUpgradeBtnLoading] = React.useState(false);

  React.useEffect(() => {
    return function cleanup() {
      setIsUpgradeBtnLoading(false);
    };
  },[]);

  async function handlePurchase() {
    setIsUpgradeBtnLoading(true);

    try {
      const result = await MonetizationCtrl.I.buyUpgrade();
      if (result) {
        setPremium(true);
        Alert.alert(
          title = "Upgrade app",
          message = "Obrigado por utilizar nosso aplicativo!\n Esperamos garantir a melhor experiência para você!",
        );
      }
    } catch (e) {
      Alert.alert("Ocorreu um erro", JSON.stringify(e));
    }

    setIsUpgradeBtnLoading(false);
  }

  return (
    <SafeAreaView style={modeStyle == "dark" ? {
      backgroundColor: "#121212",
      flex: 1,
      alignContent: 'center'
    } : {
      backgroundColor: "#fbfbff",
      flex: 1,
      alignContent: 'center'
    }}>
      <StatusBar style={modeStyle == 'dark' ? "light" : "dark"} />
      {
        premium ?
          <Card>
            <Text style={{ fontSize: adjust(20), textAlign: 'center' }}>{`Você já possui acesso PREMIUM  `}
              <FontAwesome name="diamond" size={adjust(20)} color="black" /></Text>
          </Card> :
          <>
            <Card>
              <Text style={{ fontSize: adjust(14) }}><FontAwesome name="diamond" size={adjust(20)} color="black" />Aplicativo sem propagandas por tempo ilimitado</Text>
              <Text style={{ fontSize: adjust(14) }}><Entypo name="heart" size={adjust(20)} color="red" />Apoiar desenvolvedores</Text>
            </Card>
            <Card>
              <TouchableOpacity style={{
                backgroundColor: "#7db32e",
                borderRadius: 30,
                alignItems: 'center',
              }} onPress={() => {
                if (!isUpgradeBtnLoading) {
                  handlePurchase();
                }
              }} >
                <Text style={{ paddingVertical: '5%', fontSize: adjust(20), fontWeight: 'bold', color: 'white' }}>{`Remover Anúncios`}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{
                marginHorizontal: '10%',
                marginVertical: '5%',
                backgroundColor: "transparent",
                borderBottomWidth: 1,
                alignItems: 'center',
              }} >
                <Text style={{ fontSize: adjust(14), fontWeight: 'normal', color: 'black' }}>{`Já fez essa compra antes?`}</Text>
              </TouchableOpacity>
            </Card>
            {tempPremium > new Date().getTime() || premium ? null :
              <>
                <Card>
                  <RewardInterstitialAdButton/>
                </Card>
                  <Card>
                    <BannerAdUpgradePage />
                  </Card>
              </>
            }
          </>
      }
    </SafeAreaView>
  );
};

export default UpgradePage;