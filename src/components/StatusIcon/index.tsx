import { CircleCheck, CircleDashed } from "lucide-react-native";
import { StatusBudget } from "@/types/StatusBudget";

export function StatusIcon({ status }: { status: StatusBudget }) {
    return (
        status === StatusBudget.SENT ? <CircleCheck size={24} color="#4CAF50" /> : <CircleDashed size={24} color="#FF9800" />
    )
}