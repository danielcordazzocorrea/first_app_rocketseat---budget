import {View, Text} from "react-native";
import { Title } from "@/components/Title";
import { BottomRoutesProps } from "@/routes/BottomRoutes";
import { styles } from "../Home/styles";
export function Add({navigation}: BottomRoutesProps<'add'>) {
    return (
        <View style={styles.container}>
            <Title>Welcome to the Add Screen</Title>
        </View>
    );
}