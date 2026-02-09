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

    emptyContainer: {
        flex: 1,
        marginTop: -70,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
    },
    empty: {
        fontSize: 16,
        color: '#666',
    },
    filters: {
        flexDirection: 'row',
        gap: 10,
    },
    modal: {
        position: 'absolute',
        height: '70%',
        width: '100%',
        top: '30%',
        backgroundColor: '#eaeaea',
        padding: 30,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        gap: 10,
  },
  title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
    },
});