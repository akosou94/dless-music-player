import { Api } from '@/api'

export const putName = async (params, token, id) => Api(`users/${id}`, 'PUT', params, token)
