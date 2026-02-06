import { createBottomTabNavigator, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import { Home } from '@/app/Home/index';
import { Add } from '@/app/Add/index';

export type BottomRoutesList = {
    home: undefined;
    add: undefined;
}

export type BottomRoutesProps<T extends keyof BottomRoutesList> = BottomTabScreenProps<BottomRoutesList, T>;

const Tab = createBottomTabNavigator<BottomRoutesList>();

export function BottomRoutes() {
    return (
        <Tab.Navigator id='home' initialRouteName='home' screenOptions={{ headerShown: false, 
        tabBarActiveTintColor: "#2C46B1", 
        tabBarInactiveTintColor: "#444444", 
        tabBarShowLabel: false,
        tabBarStyle: { height: 80, paddingTop: 0, paddingBottom: 0, justifyContent: 'center' }}}>
            <Tab.Screen name='home' component={Home} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="home" color={color} size={size + 7} /> )}} />
            <Tab.Screen name='add' component={Add} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="add-box" color={color} size={size + 7} /> )}} />
        </Tab.Navigator>
    )
}