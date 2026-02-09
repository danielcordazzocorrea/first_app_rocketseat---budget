import { View, Text, TouchableOpacityProps, TouchableOpacity } from 'react-native'
import { Button } from '../Button'
import { styles } from './styles'
import { StatusIcon } from '../StatusIcon'
import { StatusBudget } from '@/types/StatusBudget';

type Props = TouchableOpacityProps & {
    name: string;
    quantity: number;
    discount: number;
    freight: number;
    status: StatusBudget;
    onDelete: () => void;
    onStatusChange: () => void;
    onEdit: () => void;
}

export function Item({name, quantity, discount, freight, status, onDelete, onEdit, onStatusChange}: Props) {
    return (
        <View style={styles.container}>
            <View>
                 <TouchableOpacity onPress={onStatusChange}>
                     <StatusIcon status={status}/>
                 </TouchableOpacity>
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