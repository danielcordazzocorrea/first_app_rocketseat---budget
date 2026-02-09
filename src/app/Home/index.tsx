import { TouchableOpacity, View, Text, FlatList } from "react-native";
import { Title } from "../../components/Title";
import { AddProduct } from "@/components/AddProduct";
import { MaterialIcons } from "@expo/vector-icons";
import { Item } from "@/components/Item";
import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Filter } from "@/components/Filter";

import { styles } from "./styles";  

import { BottomRoutesProps } from "@/routes/BottomRoutes";
import { ItemStorage, ItemStorageType } from "@/Storage/StorageItems";
import { StatusBudget } from "@/types/StatusBudget";

const FILTER_STATUS: StatusBudget[] = [ StatusBudget.PENDING, StatusBudget.SENT ];

export function Home({navigation}: BottomRoutesProps<'home'>) {

    const [items, setItems] = useState<ItemStorageType[]>([]);
    const [activeFilter, setActiveFilter] = useState<StatusBudget | null>(StatusBudget.PENDING);

    async function getItems() {
        try {
            const storedItems = await ItemStorage.get();
            setItems(storedItems);
        } catch (error) {
            console.error("Erro ao carregar os itens:", error);
        }
    }

    async function onRemove(id: string) {
        try {
            await ItemStorage.remove(id);
            getItems();
        } catch (error) {
            console.error("Erro ao remover o item:", error);
        }
    }

    async function onStatusChange(item: ItemStorageType) {
        try {
            await ItemStorage.change(item);
            getItems();
        } catch (error) {
            console.error("Erro ao alterar o status do item:", error);
        }
    }

    useFocusEffect(
        useCallback(() => {
            getItems();
        }, [])
    );

    return (
        <View style={styles.container}>
            <View style={ styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Orçamentos</Text>
                    <MaterialIcons name="description" size={24} color="black" />
                </View>
                <AddProduct title="Novo" onPress={() => navigation.navigate('add')}/>
            </View>
            <View style={styles.filters}>
                {FILTER_STATUS.map((status) => (
                    <Filter 
                        key={status}
                        status={status}
                        isActive={status === activeFilter}
                        onPress={() => setActiveFilter(status)}
                    />
                ))}
            </View>
            <FlatList
                data={items.filter(item => item.status === activeFilter)}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => 
                <Item 
                    name={item.name}
                    quantity={item.quantity}
                    discount={item.discount}
                    freight={item.freight} 
                    onDelete={() => onRemove(item.id)} 
                    onStatusChange={() => onStatusChange(item)}
                    onEdit={() => console.log("Editar")}
                    status={item.status}
                />}
                contentContainerStyle={[{ padding: 20}, items.length === 0 && { flex: 1, justifyContent: 'center', alignItems: 'center' }]}
                ListEmptyComponent={() => 
                        <Text style={styles.empty}>Nenhum item aqui!</Text>
                    }
            />
        </View>
    );
}