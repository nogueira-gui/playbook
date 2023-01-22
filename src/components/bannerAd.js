import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitIdBiblia1 = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8609227792865969/8052416071';
const adUnitIdBiblia2 = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8609227792865969/6154625444';
const adUnitIdNotas = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8609227792865969/2073331085';
const adUnitIdNotasDetalhes = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8609227792865969/3462434374';
const adUnitIdNotasEditor = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8609227792865969/2991661088';
const adUnitIdUpgradePage = __DEV__ ? TestIds.BANNER : 'ca-app-pub-8609227792865969/8303421849';

export default function BannerAdBiblia1() {
    return (
        <BannerAd
            unitId={adUnitIdBiblia1}
            size={BannerAdSize.BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
    )
}
export default function BannerAdBiblia2() {
    return (
        <BannerAd
            unitId={adUnitIdBiblia2}
            size={BannerAdSize.BANNER}
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
    )
}
export default function BannerAdNotas() {
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
export default function BannerAdNotasDetalhes() {
    return (
        <BannerAd
            unitId={adUnitIdNotasDetalhes}
            size={BannerAdSize.MEDIUM_RECTANGLE} 
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
    )
}
export default function BannerAdNotasEditor() {
    return (
        <BannerAd
            unitId={adUnitIdNotasEditor}
            size={BannerAdSize.MEDIUM_RECTANGLE} 
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
    )
}
export default function BannerAdUpgradePage() {
    return (
        <BannerAd
            unitId={adUnitIdUpgradePage}
            size={BannerAdSize.MEDIUM_RECTANGLE} 
            requestOptions={{
                requestNonPersonalizedAdsOnly: true,
            }}
        />
    )
}
