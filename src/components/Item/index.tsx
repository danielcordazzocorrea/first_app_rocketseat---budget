import { View, Text, TouchableOpacityProps } from 'react-native'
import { Button } from '../Button'
import { styles } from './styles'

type Props = TouchableOpacityProps & {
    name: string;
    quantity: number;
    discount: number;
    freight: number;
    onDelete: () => void;
    onStatusChange: () => void;
    onEdit: () => void;
}

export function Item({name, quantity, discount, freight, onDelete, onEdit, onStatusChange}: Props) {
    return (
        <View style={styles.container}>
            <View>
                 <Button name='radio-button-unchecked' color='black' onPress={onStatusChange} size={30}/>
                <Text style={styles.name}>{name}</Text>
                <Text>Quantidade: {quantity}</Text>
                <Text>Desconto: {discount}</Text>
                <Text>Frete: {freight}</Text>
            </View>
            <View style={styles.buttons}>
                <Button name='edit' onPress={onEdit} size={30}/>
                <Button name='delete' color='red' onPress={onDelete} size={30}/>
            </View>
        </View>
    )
}