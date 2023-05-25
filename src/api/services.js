import { instance } from './axios-instance'

export const $api = {
  login(body) {
    return instance.post("auth/login", body);
  },

  register(body) {
    return instance.post('auth/register', body);
  }
}

