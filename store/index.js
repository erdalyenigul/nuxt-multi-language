export const state = () => ({
  locales: ['tr', 'en'],
  locale: 'tr',
  name: '',
  email: ''
})

export const mutations = {
  SET_LANG (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  setName (state, name) {
    state.name = name
  },
  setEmail (state, email) {
    state.email = email
  }
}

export const actions = {
  setName ({ commit }, name) {
    commit('setName', name)
  },
  setEmail ({commit}, email) {
    commit('setEmail', email)
  }
}
