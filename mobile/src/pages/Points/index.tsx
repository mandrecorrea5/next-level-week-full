import React, { useState, useEffect} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { SvgUri } from 'react-native-svg'
import api from '../../services/api';

import styles from "./style";

interface Item {
 id: number,
 title: string,
 image_url: string,
}

const Points = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const navigation = useNavigation();

    useEffect(() => {
        api.get('items')
            .then(response => {
                console.log(response.data);
                setItems(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    function handleNavigateBack() {
        navigation.goBack();
    }

    function handleNavigateToDatail() {
        navigation.navigate('Detail');
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex(item => item === id);

        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);

            setSelectedItems(filteredItems);
        }else {
            setSelectedItems([ ...selectedItems, id]);
        }
    }

    return(
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name="arrow-left" size={20} color="#34cb79" />
                </TouchableOpacity>

                <Text style={styles.title}>
                    Bem Vindo.
                </Text>

                <Text style={styles.description}>
                    Encontre no mapa um ponto de coleta.
                </Text>

                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: -23.6500764,
                            longitude: -46.6477025,
                            latitudeDelta: 0.014,
                            longitudeDelta: 0.014,
                        }}
                    >
                        <Marker
                            style={styles.mapMarker}
                            coordinate={{
                                latitude: -23.6500764,
                                longitude: -46.6477025,
                            }}
                            onPress={handleNavigateToDatail}
                        >
                            <View style={styles.mapMarkerContainer}>
                                <Image source={{
                                    uri: 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=433&q=40',
                                }} />
                                <Text style={styles.mapMarkerTitle}>Mercado</Text>
                            </View>
                        </Marker>
                    </MapView>
                </View>
            </View>

            <View style={styles.itemsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingHorizontal: 20}}
                >
                    {
                        items.map(item => (
                            <TouchableOpacity
                                key={String(item.id)}
                                style={[
                                    styles.item,
                                    selectedItems.includes(item.id)
                                        ? styles.selectedItem
                                        : {}
                                ]}
                                activeOpacity={0.6}
                                onPress={() => handleSelectItem(item.id)}>
                                <SvgUri
                                    uri={item.image_url}
                                    width={42}
                                    height={42}
                                />
                                <Text style={styles.itemTitle}>
                                    {item.title}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        </>
    )
}

export default Points;
