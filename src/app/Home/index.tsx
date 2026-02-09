import { TouchableOpacity, View, Text, FlatList, Modal, Alert } from "react-native";
import { Title } from "../../components/Title";
import { AddProduct } from "@/components/AddProduct";
import { MaterialIcons } from "@expo/vector-icons";
import { Item } from "@/components/Item";
import { useState, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { Filter } from "@/components/Filter";
import { Input } from "@/components/Input";
import { ButtonEdit } from "@/components/ButtonEdit";

import { styles } from "./styles";  

import { BottomRoutesProps } from "@/routes/BottomRoutes";
import { ItemStorage, ItemStorageType } from "@/Storage/StorageItems";
import { StatusBudget } from "@/types/StatusBudget";

const FILTER_STATUS: StatusBudget[] = [ StatusBudget.PENDING, StatusBudget.SENT ];

export function Home({navigation}: BottomRoutesProps<'home'>) {

    const [items, setItems] = useState<ItemStorageType[]>([]);
    const [activeFilter, setActiveFilter] = useState<StatusBudget | null>(StatusBudget.PENDING);
    const [showModal, setShowModal] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<ItemStorageType | null>(null);
    const [editedTitle, setEditedTitle] = useState("")
    const [editedQuantity, setEditedQuantity] = useState("")
    const [editedDiscount, setEditedDiscount] = useState("")
    const [editedFreight, setEditedFreight] = useState("")

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

    async function onEdit(item: ItemStorageType) {
        console.log("Editando item:", item);
        setItemToEdit(item);
        setEditedTitle(item.name);
        setEditedQuantity(item.quantity.toString());
        setEditedDiscount(item.discount.toString());
        setEditedFreight(item.freight.toString());
        setShowModal(true);
    }

    async  function saveEdit(selected: ItemStorageType){
        if (editedTitle.trim() === ""){
            return Alert.alert("Atenção!", "O título não pode ser vazio.")
        }
        if (editedQuantity.trim() !== "" && isNaN(Number(editedQuantity))) {
            return Alert.alert("Atenção!", "Quantidade deve ser um número.")
        }
        try {
            await ItemStorage.update(selected.id, editedTitle, editedQuantity ? parseInt(editedQuantity) : selected.quantity, editedDiscount ? parseInt(editedDiscount) : selected.discount, editedFreight ? parseInt(editedFreight) : selected.freight);
            setShowModal(false)
            setEditedTitle("")
            setEditedQuantity("")
            setEditedDiscount("")
            setEditedFreight("")
            getItems()
        } catch (error) {
            Alert.alert("Erro", "Erro ao salvar edição!")
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
                    onEdit={() => onEdit(item)}
                    status={item.status}
                    
                />}
                contentContainerStyle={[{ padding: 20}, items.filter(item => item.status === activeFilter).length === 0 && { flex: 1, justifyContent: 'center', alignItems: 'center' }]}
                ListEmptyComponent={() => (
                        <View style={{ alignItems: 'center', gap: 10 }}>
                            <MaterialIcons 
                                name={activeFilter === StatusBudget.PENDING ? "schedule" : "send"} 
                                size={48} 
                                color="gray" 
                            />
                            <Text style={styles.empty}>Nenhum item aqui!</Text>
                        </View>
                    )}
            />
            <Modal visible={showModal} animationType="slide" backdropColor='#79797904'>
                    <View style={styles.modal}>
                    <Text style={styles.title}>Edição do Item: {itemToEdit?.name}</Text>
                    <Input placeholder="Editar título" value={editedTitle} onChangeText={setEditedTitle}/>
                    <Input placeholder="Editar quantidade" value={editedQuantity} onChangeText={setEditedQuantity}/>
                    <Input placeholder="Editar desconto" value={editedDiscount} onChangeText={setEditedDiscount}/>
                    <Input placeholder="Editar frete" value={editedFreight} onChangeText={setEditedFreight}/>
                    <ButtonEdit title="Salvar" onPress={() => saveEdit(itemToEdit!)}/>
                    <ButtonEdit title="Fechar" onPress={() => setShowModal(false)}/>
                </View>
            </Modal>
        </View>
    );
}