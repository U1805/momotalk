import { createRouter, createWebHistory } from 'vue-router'
import Info from '@/views/InfoView/InfoView.vue'
import Chat from '@/views/ChatView/ChatView.vue'
import Help from '@/views/HelpView/HelpView.vue'
import Arona from '@/views/ChatView/Chat2AronaView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'info',
            component: Info
        },
        {
            path: '/chat',
            name: 'chat',
            component: Chat
        },
        {
            path: '/help',
            name: 'help',
            component: Help
        },
        {
            path: '/arona',
            name: 'Arona',
            component: Arona
        }
    ]
})

export default router
