import React, {useEffect, useState} from "react";
import {Image, Linking, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from "./style";
import {Feather as Icon, FontAwesome} from "@expo/vector-icons";
import {RectButton} from "react-native-gesture-handler";
import api from "../../services/api";
import MailComposer, {MailComposerOptions} from "expo-mail-composer";

interface Params {
    point_id: number
}

interface Data {
    point: {
        image: string,
        name: string,
        email: string,
        whatsapp: string,
        city: string,
        uf: string
    },
    items: {
        title: string
    }[]
}

const Detail = () => {
    const [data, setData] = useState<Data>({} as Data);

    const navigation = useNavigation();
    const route = useRoute();
    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleComposeMail() {
        MailComposer.composeAsync({
            subject: 'Interesse na coleta de resíduos',
            recipients: data.point.email ,
        })
    }

    function handleWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta`);
    }

    const routeParams = route.params as Params;

    useEffect(() => {
        api.get(`points/${routeParams.point_id}`)
            .then(response => {
                setData(response.data);
            })
            .catch(err => {

            })
    }, [])

    if (!data.point) {
        return null;
    }

    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>

                <Image
                    source={{uri: data.point.image}}
                    style={styles.pointImage}
                />
                <Text style={styles.pointName}>
                    {data.point.name}
                </Text>
                <Text style={styles.pointItems}>
                    {data.items.map(item => item.title)}
                </Text>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}>
                        Endereço
                    </Text>
                    <Text style={styles.addressContent}>
                        {data.point.city}, {data.point.uf}
                    </Text>
                </View>

                <View style={styles.footer}>
                    <RectButton
                        style={styles.button}
                        onPress={handleWhatsapp}>
                        <FontAwesome name="whatsapp" size={20} color="#FFF" />
                        <Text style={styles.buttonText}>
                            Whatsapp
                        </Text>
                    </RectButton>

                    <RectButton
                        style={styles.button}
                        onPress={handleComposeMail}>
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
