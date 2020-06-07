import React from "react";
import {Image, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "./style";
import {Feather as Icon, FontAwesome} from "@expo/vector-icons";
import {RectButton} from "react-native-gesture-handler";

const Detail = () => {
    const navigation = useNavigation();
    function handleNavigateBack() {
        navigation.goBack();
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>

                <Image
                    source={{
                        uri: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=433&q=40',
                    }}
                    style={styles.pointImage}
                />
                <Text style={styles.pointName}>
                    Marcadão do João
                </Text>
                <Text style={styles.pointItems}>
                    Lâmpadas, Óleo de Cozinha
                </Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>
                        Endereço
                    </Text>
                    <Text style={styles.addressContent}>
                        São Luis, MA
                    </Text>
                </View>

                <View style={styles.footer}>
                    <RectButton
                        style={styles.button}
                        onPress={() => {}}>
                        <FontAwesome name="whatsapp" size={20} color="#FFF" />
                        <Text style={styles.buttonText}>
                            Whatsapp
                        </Text>
                    </RectButton>

                    <RectButton
                        style={styles.button}
                        onPress={() => {}}>
                        <Icon name="mail" size={20} color="#FFF" />
                        <Text style={styles.buttonText}>
                            Email
                        </Text>
                    </RectButton>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Detail;
