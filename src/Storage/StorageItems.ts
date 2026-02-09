import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBudget } from "@/types/StatusBudget";

const ITEMS_STORAGE_KEY = "@budget:itens"

export type ItemStorageType = {
    id: string;
    name: string;
    quantity: number;
    discount: number;
    freight: number;
    status: StatusBudget;
}

export async function get(): Promise<ItemStorageType[]> {
    try{
        const data = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        throw error;
    }
}

export async function save(items: ItemStorageType[]) {
    try {
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        throw error;
    }
}

export async function add(item: ItemStorageType) {
    try {
        const items = await get();
        const itemsUpdated = [...items, item];
        await save(itemsUpdated);
    } catch (error) {
        throw error;
    }
}

export async function remove(id: string) {
    try {
        const items = await get();
        const itemsUpdated = items.filter(item => item.id !== id);
        await save(itemsUpdated);
        return itemsUpdated;
    } catch (error) {
        throw error;
    }
}

async function change(updatedItem: ItemStorageType) {
    try {
        const items = await get();
        const newitems = await remove(updatedItem.id);
        if (updatedItem.status === StatusBudget.PENDING) {
            updatedItem.status = StatusBudget.SENT;
        } else {
            updatedItem.status = StatusBudget.PENDING;
        }
        const itemsUpdated = [...newitems, updatedItem];
        await save(itemsUpdated);

    } catch (error) {
        throw error;
    }
}

async function update(id: string, name: string, quantity: number, discount: number, freight: number): Promise <ItemStorageType[]> {
    try {
        const items = await get()
        const updated = items.map(item =>
            item.id === id ? { ...item, name, quantity, discount, freight } : item
        )
        await save(updated)
        return updated
    } catch (error) {
        throw error
    }
}

export const ItemStorage = {
    get,
    add,
    remove,
    change,
    update,
}