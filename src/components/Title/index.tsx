import { Text, TextProps } from "react-native";
import { styles } from "./styles";

export function Title({ children, ...rest }: TextProps) {
    return (
        <Text style={styles.title} {...rest}>
            {children}
        </Text>
    );
}