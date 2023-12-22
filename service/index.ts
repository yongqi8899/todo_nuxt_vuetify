import type { UseFetchOptions } from 'nuxt/dist/app/composables'

const BASE_URL = 'https://retoolapi.dev'
type Methods = 'GET' | 'POST' | 'DELETE' | 'PATCH'

class ITRequest {
  async request<T = any >(
    url: string,
    method: Methods,
    data?: any,
    options?: UseFetchOptions<T>,
  ): Promise<any> {
    const newOptions: UseFetchOptions<T> = {
      baseURL: BASE_URL,
      method,
      ...options,
    }
    const localMethod = method.toUpperCase()
    if (localMethod === 'GET') {
      newOptions.query = data
    }
    if (localMethod === 'POST' || localMethod === 'PATCH' || localMethod === 'DELETE') {
      newOptions.body = data
    }

    let result

    try {
      result = await $fetch.raw(url, newOptions as any)
    } catch (err) {
      console.error('[request]', err)
    }

    return result
  }

  get<T = any>(url: string, params?: any, options?: UseFetchOptions<T>) {
    return this.request<T>(url, 'GET', params, options)
  }

  post<T = any>(url: string, data?: any, options?: UseFetchOptions<T>) {
    return this.request<T>(url, 'POST', data, options)
  }

  delete<T = any>(url: string, data?: any, options?: UseFetchOptions<T>) {
    return this.request<T>(url, 'DELETE', data, options)
  }

  patch<T = any>(url: string, data?: any, options?: UseFetchOptions<T>) {
    return this.request<T>(url, 'PATCH', data, options)
  }
}

export default new ITRequest()
