import React from 'react'
import {Image, ImageBackground, Text, View} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';

import styles from './style';

const Home = () => {
    const navigation = useNavigation();

    function handleNavigateToPoints() {
        navigation.navigate('Points');
    }
    return (
        <ImageBackground
            source={require('../../assets/home-background.png')}
            imageStyle={{width: 274, height: 368}}
            style={styles.container}>
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <Text style={styles.title}>
                    Seu Marketplace de coleta de resíduos
                </Text>
                <Text style={styles.description}>
                     Ajudamos pessoas a encontrarem pontos de coleta de forma desconhecida
                </Text>
            </View>

            <View style={styles.footer}>
                <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24} />
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>
        </ImageBackground>
    )
}

export default Home;
