import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {
    name: keyof typeof MaterialIcons.glyphMap;
    color?: string;
    size?: number;
}

export function Button({ name, color, size, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <MaterialIcons 
                name={name}   
                color={color}
                size={size}
            />
        </TouchableOpacity>
    );
}