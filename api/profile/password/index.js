import { Api } from '@/api'

export const postPassword = async (params, token) => Api('auth/change-password', 'POST', params, token)