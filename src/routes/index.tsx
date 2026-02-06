import { NavigationContainer } from "@react-navigation/native";
import { BottomRoutes } from "./BottomRoutes";

export function Routes() {
    return (
        <NavigationContainer>
            <BottomRoutes />
        </NavigationContainer>
    )
}