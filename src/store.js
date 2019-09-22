import Vue from 'vue'
import Vuex from 'vuex'

import { ZOMATO_HTTP } from '@/axios'
import { ENDPOINTS } from '@/endpoints'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    categories: [],
    selected_categories: [],
    is_serves_alcohol: true,
    cities: [],
    selected_city: {},
    restos: [],
    no_of_options: 2,
    range: [3, 5],
    min: 1,
    max: 5,
    selected_restos: []
  },
  getters: {
    getCategories: state => state.categories,
    getCities: state => state.cities,
    getSelectedCategories: state => state.selected_categories,
    getSelectedCity: state => state.selected_city,
    getIsServesAlcohol: state => state.is_serves_alcohol,
    getNoOfOptions: state => state.no_of_options,
    
    getMin: state => state.min,
    getMax: state => state.max,
    getRange: state => state.range,

    getRestos: state => state.restos,
    getSelectedRestos: state => state.selected_restos
  },
  mutations: {
    SET_CATEGORIES: (state, payload) => state.categories = payload,
    SET_CITIES: (state, payload) => state.cities = payload,
    SET_SELECTED_CATEGORIES: (state, payload) => state.selected_categories = payload,
    SET_SELECTED_CITY: (state, payload) => state.selected_city = payload,
    SET_IS_SERVES_ALCOHOL: (state, payload) => state.is_serves_alcohol = payload,
    SET_NO_OF_OPTIONS: (state, payload) => state.no_of_options = payload,
    SET_RANGE: (state, payload) => state.range = payload,

    ADD_RESTOS: (state, payload) => state.restos.push(...payload),
    ADD_SELECTED_RESTO: (state, new_resto) => state.selected_restos.push(new_resto),
    CLEAR_SELECTED_RESTOS: (state) => state.selected_restos = []
  },
  actions: {
    setCategories: ({ commit }) => {
      // ZOMATO_HTTP({
      //   url: ENDPOINTS.categories,
      //   method: 'GET'
      // })
      //   .then((response) => {
      //     let categories = response.data.categories
      //     categories = categories.map(item => {
      //       return {
      //         id: item.categories.id,
      //         name: item.categories.name
      //       }
      //     })
      //     commit('SET_CATEGORIES', categories)
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    },
    setCities: ({ commit }) => {
      commit('SET_CITIES', [
        { name: 'Mumbai', entity_id: 3 },
        { name: 'Bengaluru', entity_id: 4 },
        { name: 'Chennai', entity_id: 7 },
        { name: 'Delhi', entity_id: 1 }
      ])
    },
    setDefaultCity: ({ state, commit }) => {
      commit('SET_SELECTED_CITY', state.cities[0])
    },
    findRestos: ({ state, commit, dispatch }) => {

      let totalRecordsFound = undefined
      let recordsLeft = undefined
      let currRecord = 0
      let pageSize = 20

      // {results_found: 1465835, results_start: 0, results_shown: 20, restaurants: Array(20)}

      ZOMATO_HTTP({
        url: ENDPOINTS.search,
        method: 'GET',
        params: {
          category: '3',
          entity_id: 3,
          entity_type: 'city',
          start: currRecord,
          count: pageSize
        }
      })
        .then((response) => {

          totalRecordsFound = parseInt(response.data.results_found)
          recordsLeft = totalRecordsFound - pageSize
          currRecord = currRecord + pageSize + 1

          let restaurants = response.data.restaurants
          let restos = restaurants.map(item => {
            return {
              id: item.restaurant.id,
              name: item.restaurant.name,
              url: item.restaurant.url,
              location: item.restaurant.location,
              cuisines: item.restaurant.cuisines,
              timings: item.restaurant.timings,
              average_cost_for_two: item.restaurant.average_cost_for_two,
              currency: item.restaurant.currency,
              highlights: item.restaurant.highlights,
              rating: item.restaurant.user_rating.aggregate_rating,
              establishment: item.restaurant.establishment,
              has_table_booking: item.restaurant.has_table_booking,
              thumb: item.restaurant.thumb
            }
          })
          console.log(restos)
          commit('ADD_RESTOS', restos)

          dispatch('pickRandomRestos')

          // ZOMATO_HTTP({
          //   url: ENDPOINTS.search,
          //   method: 'GET',
          //   data: {
          //     entity_id: 3,
          //     entity_type: 'city',
          //     start: currRecord,
          //     count: pageSize
          //   }
          // })
          //   .then((response) => {

          //     recordsLeft -= pageSize
          //     currRecord = currRecord + pageSize + 1

          //     let restos = response.data.restaurants.map(item => item.restaurant)
          //     console.log(restos)
          //     commit('ADD_RESTOS', restos)
          //   })
          //   .catch((error) => {
          //     console.log(error)
          //   })

        })
        .catch((error) => {
          console.log(error)
        })
    },

    pickRandomRestos: ({ state, commit }) => {

      commit('CLEAR_SELECTED_RESTOS')

      let randomlySelectedIndices = []
      let noOfOptions = state.no_of_options
      let restos = state.restos

      while (randomlySelectedIndices.length < noOfOptions) {
        var index = Math.floor( Math.random() * restos.length) + 1
        if (randomlySelectedIndices.indexOf(index) === -1) 
          randomlySelectedIndices.push(index)
      }
      randomlySelectedIndices.forEach(index => commit('ADD_SELECTED_RESTO', restos[index]))
    }
  }
})
