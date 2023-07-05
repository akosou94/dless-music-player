import { Api } from '@/api'

export const putEmail = async (params, token, id) => Api(`users/${id}`, 'PUT', params, token)
