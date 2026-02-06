import {View, Text, Alert } from "react-native";
import { Input } from "@/components/Input";
import { AddProduct } from "@/components/AddProduct";
import { Title } from "@/components/Title";
import { BottomRoutesProps } from "@/routes/BottomRoutes";

import { StatusBudget } from "@/types/StatusBudget";

import { ItemStorage, ItemStorageType } from "@/Storage/StorageItems";

import { useState } from "react";

import { styles } from "./styles";

export function Add({navigation}: BottomRoutesProps<'add'>) {
    
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [discount, setDiscount] = useState('');
    const [freight, setFreight] = useState('');

    async function onAdd() {
        if (!name || !quantity) {
            return Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
        }
        try{
            const item: ItemStorageType = {
                id: Math.random().toString(36).substring(2, 9),
                name,
                quantity: parseInt(quantity),
                discount: discount ? parseInt(discount) : 0,
                freight: freight ? parseInt(freight) : 0,
                status: StatusBudget.PENDING,
            }
            console.log(item);            
            await ItemStorage.add(item);
            console.log("veio aqui");
            const items = await ItemStorage.get();
            console.log(items);
            navigation.navigate('home')
        } catch (error) {
            Alert.alert("Erro", "Não foi possível adicionar o item.");
            console.error(error);
        }
        
    }

    return (
        <View style={styles.container}>
            <Title>Adicione um novo orçamento</Title>
            <View style={ styles.form }>
                <Input placeholder="Nome do item*" onChangeText={setName}/>
                <Input placeholder="Quantidade*" keyboardType="numeric" onChangeText={setQuantity}/>
                <Input placeholder="Desconto" keyboardType="numeric" onChangeText={setDiscount}/>
                <Input placeholder="Frete" keyboardType="numeric" onChangeText={setFreight}/>
                <AddProduct title="Adicionar" onPress={onAdd}/>
            </View>
        </View>
    );
}