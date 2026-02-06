import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0",
        alignItems: "center",
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24, 
        backgroundColor: "#ffffff",
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#dfdddd",
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#000000",
    },
    headerContent: {
        alignItems: "center",
        gap: 8,
    },
});