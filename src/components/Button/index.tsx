import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {
    name: keyof typeof MaterialIcons.glyphMap;
    color?: string;
}

export function Button({ name, color, ...rest }: Props) {
    return (
        <TouchableOpacity {...rest}>
            <MaterialIcons 
                name={name} 
                size={24}  
                color={color}
            />
        </TouchableOpacity>
    );
}