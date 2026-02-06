import { TouchableOpacity, View, Text, FlatList } from "react-native";
import { Title } from "../../components/Title";
import { AddProduct } from "@/components/AddProduct";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";  

import { BottomRoutesProps } from "@/routes/BottomRoutes";

export function Home({navigation}: BottomRoutesProps<'home'>) {
    return (
        <View style={styles.container}>
            <View style={ styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>Orçamentos</Text>
                    <MaterialIcons name="description" size={24} color="black" />
                </View>
                <AddProduct title="Novo" onPress={() => navigation.navigate('add')}/>
            </View>
            <View>
                
            </View>
        </View>
    );
}