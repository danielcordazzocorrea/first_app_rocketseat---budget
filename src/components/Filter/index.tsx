import { TouchableOpacity, Text, TouchableOpacityProps} from 'react-native'
import { StatusIcon } from '../StatusIcon'
import { styles } from './styles'
import { StatusBudget } from '@/types/StatusBudget';

type Props = TouchableOpacityProps & {
    status: StatusBudget;
    isActive: boolean;
    onPress: () => void;
}

    

export function Filter({ status, isActive, onPress, ...rest }: Props) {
    return (
        <TouchableOpacity
            style={[styles.container, {opacity: isActive ? 1 : 0.5}] }
            onPress={onPress}
            activeOpacity={0.8}
            {...rest}>
            <StatusIcon status={status} />
            <Text style={styles.title}>{status === StatusBudget.SENT ? "Enviados" : "Rascunhos"}</Text>

        </TouchableOpacity>
    )
}