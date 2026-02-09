import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

import { styles } from "./styles"

type Props = TouchableOpacityProps & {
    title: string
}

export function ButtonEdit({title, ...rest}: Props){
    return(
        <TouchableOpacity {...rest} style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}