import { createRouter, createWebHistory } from 'vue-router'
import Info from '@/views/InfoView/InfoView.vue'
import Chat from '@/views/ChatView/ChatView.vue'
import Help from '@/views/HelpView/HelpView.vue'

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
        }
    ]
})

export default router
