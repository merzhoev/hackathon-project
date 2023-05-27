import { instance } from './axios-instance'

export const $api = {
  login(body) {
    return instance.post("auth/login", body);
  },

  register(body) {
    return instance.post('users', body);
  },

  getMe() {
    return instance.post('auth/me')
  },
  getCategory() {
    return instance.get('categories')
  },
  getProducts() {
    return instance.get('products')
  },
  getCategoryProducts(id) {
    return instance.get(`products/${id}`)
  }
}

