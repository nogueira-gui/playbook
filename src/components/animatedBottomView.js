import React, { useEffect } from 'react'
import { Dimensions, Animated } from 'react-native'
import { useBible } from '../context/bible';

const AnimatedBottomView = (props) => {

    const { height, width } = Dimensions.get('window');
    const { showPanel, verseList } = useBible();
    const [ firstStart, setFirstStart] = React.useState(false);
    // Animation
    const startValue = new Animated.Value(Math.round(height + height *0.66));
    const endValue = Math.round(height - height * 0.66);
    const [duration, setDuration] = React.useState(0);

    useEffect(()=>{
        if(firstStart == false){
            //Set duration 0 first to hide when reload app
            _showBottomView('HIDE');
            setDuration(500);
            setFirstStart(true);
        }
        if(showPanel){
            _showBottomView('SHOW');
        }else{
            _showBottomView('HIDE');
        }
    },[showPanel]);

    const _showBottomView = (key) => {
        if(key==="SHOW"){
            startValue.setValue(Math.round(height + height *0.66));
            Animated.timing(startValue, {
                toValue: endValue,
                duration: duration,
                useNativeDriver: false,
            }).start()
        }else{
            startValue.setValue(endValue);
            Animated.timing(startValue, {
                toValue: height,
                duration: duration,
                useNativeDriver: false,
            }).start()
        }
    }

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    height: height*0.3,
                    width: width,
                    backgroundColor: '#d6d6d6',
                    alignItems: 'center', justifyContent: 'center',
                    borderTopRightRadius: 23, borderTopLeftRadius: 23,
                    transform: [
                    {
                        translateY: startValue
                    },
                    ],
                },
            ]} >
            {props.children}
        </Animated.View>
    )
}

export default AnimatedBottomView;