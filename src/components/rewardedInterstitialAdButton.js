import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAdControl } from '../context/admobControl';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-8609227792865969/2076908933';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    // keywords: ['fashion', 'clothing'],
  });
export default function RewardInterstitialAdButton() {
    const [loaded, setLoaded] = React.useState(false);
    const { setTempPremium } = useAdControl();

    React.useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
          });
          const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                removeADTemp();
              console.log('User earned reward of ', reward);
            },
          );
      
          // Start loading the rewarded ad straight away
          rewarded.load();
      
          // Unsubscribe from events on unmount
          return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
          };
    }, []);

    const removeADTemp = async () => {
        let tomorrow = new Date().getTime() + (24 * 60 * 60 * 1000);
        setTempPremium(tomorrow);
        await AsyncStorage.setItem("@blockAdTemp", tomorrow.toString());
    }

    if (!loaded) {
        return null;
    }

    return (
        <TouchableOpacity
            onPress={() => {
                rewarded.show();
            }}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent:"center", backgroundColor: 'blue', padding: 10 }}
        >
            <Entypo name="video" size={24} color="white" style={{ marginRight: 10 }} />
            <Text style={{ color: 'white' }}>Remover anúncios por 24 horas</Text>
        </TouchableOpacity>
    );
}
