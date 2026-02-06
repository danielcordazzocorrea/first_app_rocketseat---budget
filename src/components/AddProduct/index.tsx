import { Title } from "../Title";
import { View, TouchableOpacityProps, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { styles } from "./styles";

type Props = TouchableOpacityProps & {
    title: string;
}

export function AddProduct({ title, ...rest }: Props) {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <View>
                <MaterialIcons name="add" size={24} color="#fff" />
            </View>
            <View>
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
}
