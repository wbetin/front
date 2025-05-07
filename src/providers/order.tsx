"use client"
import { createContext, ReactNode, useState } from "react";
import { api } from "@/services/api"
import { getCookiesClient } from "@/lib/cookieClient"
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface OrderItemProps {
    id: string;
    amount: number;
    created_at: string;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        description: string;
        price: number;
        banner: string;
        category_id: string;
    }
    order: {
        id: string;
        table: number;
        name: string | null;
        draft: boolean;
        status: boolean;
    }
}

type OrderContextData = {
    isOpen: boolean;
    onRequestOpen: (order_id: string) => Promise<void>;
    onRequestClose: () => void;
    order: OrderItemProps[];
    finishOrder: (order_id: string) => Promise<void>;
}

type OrderProviderProps = {
    children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextData);

export function OrderProvider({ children }: OrderProviderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [order, setOrder] = useState<OrderItemProps[]>([]);
    const router = useRouter();

    async function onRequestOpen(order_id: string) {
        const token = getCookiesClient();

        const response = await api.get("/order/detail", {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                order_id: order_id
            }
            })

            setOrder(response.data);
            setIsOpen(true);
    }

    function onRequestClose() {
        setIsOpen(false);
    }

    async function finishOrder(order_id: string) {
        const token = getCookiesClient();

        const data = {
            order_id: order_id,
        }

        try{
            await api.put("/order/finish", data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }catch(err) {
            console.log(err);
            toast.error("Erro ao concluir o pedido!")
            return;
        }

        toast.success("Pedido concluído com sucesso!")
        router.refresh();
        setIsOpen(false);
    }

    return (
        <OrderContext.Provider value={{
            isOpen,
            onRequestOpen,
            onRequestClose,
            finishOrder,
            order
        }}>
            {children}
        </OrderContext.Provider>
    )
}