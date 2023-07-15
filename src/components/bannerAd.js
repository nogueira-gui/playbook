import React from 'react';
import { View } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

if (__DEV__) console.log('Running in dev mode');
const adUnitIdBiblia1 = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8609227792865969/8052416071';
const adUnitIdBiblia2 = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8609227792865969/6154625444';
const adUnitIdNotas = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8609227792865969/2073331085';
const adUnitIdNotasDetalhes = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8609227792865969/3462434374';
const adUnitIdNotasEditor = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8609227792865969/2991661088';
const adUnitIdUpgradePage = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8609227792865969/8303421849';

function BannerAdBiblia1() {
    return (
        <View style={{ alignSelf: 'center' }}>
            <BannerAd
                unitId={adUnitIdBiblia1}
                size={BannerAdSize.BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>

    )
}
function BannerAdBiblia2() {
    return (
        <View style={{ alignSelf: 'center' }}>
            <BannerAd
                unitId={adUnitIdBiblia2}
                size={BannerAdSize.BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>

    )
}
function BannerAdNotas() {
    return (
        <BannerAd
            unitId={adUnitIdNotas}
            size={BannerAdSize.INLINE_ADAPTIVE_BANNER} //smartBannerPortrait
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
    )
}
function BannerAdNotasDetalhes() {
    return (
        <View style={{ alignSelf: 'center' }}>
            <BannerAd
                unitId={adUnitIdNotasDetalhes}
                size={BannerAdSize.MEDIUM_RECTANGLE}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    )
}
function BannerAdNotasEditor() {
    return (
        <View style={{ alignSelf: 'center' }}>
            <BannerAd
                unitId={adUnitIdNotasEditor}
                size={BannerAdSize.MEDIUM_RECTANGLE}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    )
}
function BannerAdUpgradePage() {
    return (
        <View style={{alignSelf:"center"}}>
            <BannerAd
                unitId={adUnitIdUpgradePage}
                size={BannerAdSize.MEDIUM_RECTANGLE}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
        </View>
    )
}
export { BannerAdBiblia1, BannerAdBiblia2, BannerAdNotas, BannerAdNotasDetalhes, BannerAdNotasEditor, BannerAdUpgradePage }