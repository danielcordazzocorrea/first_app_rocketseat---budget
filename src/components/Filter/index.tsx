import { View, Text } from 'react-native'
import { StatusIcon } from '../StatusIcon'
import { styles } from './styles'
import { StatusBudget } from '@/types/StatusBudget';

type Props = {
    status: StatusBudget;
    isActive: boolean;
    onPress: () => void;
}

    

export function Filter({ status, isActive, onPress }: Props) {
    return (
        <View></View>
    )
}