import {Header} from '@/app/dashboard/components/header'
import { OrderProvider } from '@/providers/order'

export default function DashboardLayout({children}: 
    { children: React.ReactNode}
){
    return(
        <>
            <Header/>
            <OrderProvider>
            {children}
            </OrderProvider>
        </>
    )
}