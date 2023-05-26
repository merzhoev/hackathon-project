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

  getProducts() {
    return instance.get('products')
  }
}

