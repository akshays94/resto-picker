<template>
  <v-container>
    <v-layout row wrap justify-center>

      <v-flex xs12 md4 lg4>
        <v-flex xs12 mt-2 mb-2>
          <v-combobox
            v-model="selectedCity"
            :items="cities"
            item-text="name"
            item-value="entity_id"
            label="Select City"
            filled
          ></v-combobox>
        </v-flex>

        <v-flex xs12 mt-2 mb-2>
          <v-combobox
            v-model="selectedCategories"
            :items="categories"
            item-text="name"
            item-value="id"
            label="Select Categories"
            filled
            chips
            deletable-chips
            multiple
          ></v-combobox>
        </v-flex>

        <v-flex xs12>
          <v-switch
          v-model="isServesAlcohol"
          label="Serves Alcohol?"
          ></v-switch>
        </v-flex>

        <v-flex xs12>

          <v-card flat color="transparent">
            <v-subheader>Rating in between</v-subheader>

            <v-card-text>
              <v-row>
                <v-col class="pr-4">
                  <v-range-slider
                    v-model="range"
                    :max="max"
                    :min="min"
                    hide-details
                    class="align-center"
                  >
                    <template v-slot:prepend>
                      <v-text-field
                        v-model="range[0]"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="number"
                        min="1"
                        max="5"
                        style="width: 60px"
                      ></v-text-field>
                    </template>
                    <template v-slot:append>
                      <v-text-field
                        v-model="range[1]"
                        class="mt-0 pt-0"
                        hide-details
                        single-line
                        type="number"
                        min="1"
                        max="5"
                        style="width: 60px"
                      ></v-text-field>
                    </template>
                  </v-range-slider>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>        



        </v-flex>

        <v-flex xs12>
          <v-text-field
            label="No. of options"
            type="number"
            min="1"
            max="5"
            step="1"
            filled
            v-model="noOfOptions"
          ></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-btn @click="findRestos()">
            Pick Restos
          </v-btn>
        </v-flex>
      </v-flex>

      <v-flex pl-5 xs12 md8 lg8>
        <v-card class="mb-4" v-for="resto in selectedRestos">
          <v-list-item three-line>
            <v-list-item-content class="align-self-start">
              <v-list-item-title
                class="headline mb-2"
                v-text="`${resto.name} (${resto.rating})`"
              ></v-list-item-title>
              <v-list-item-subtitle v-text="resto.location.address">
              </v-list-item-subtitle>

            </v-list-item-content>

            <v-list-item-avatar
              size="125"
              tile
            >
              <v-img :src="resto.thumb"></v-img>
            </v-list-item-avatar>
          </v-list-item>
          <v-card-actions>
            <v-btn
              text
              color="red"
              @click="navigate(resto.url)">
              View on Zomato
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>


    </v-layout>
  </v-container>
</template>

<script>
import Vuex from 'vuex'

export default {
  computed: {
    ...Vuex.mapGetters({
      categories: 'getCategories',
      cities: 'getCities',
      restos: 'getRestos',
      selectedRestos: 'getSelectedRestos',
      min: 'getMin',
      max: 'getMax'
    }),
    selectedCategories: {
      get () {
        return this.$store.getters['getSelectedCategories']
      },
      set (val) {
        this.$store.commit('SET_SELECTED_CATEGORIES', val)
      }
    },
    selectedCity: {
      get () {
        return this.$store.getters['getSelectedCity']
      },
      set (val) {
        this.$store.commit('SET_SELECTED_CITY', val)
      }
    },
    isServesAlcohol: {
      get () {
        return this.$store.getters['getIsServesAlcohol']
      },
      set (val) {
        this.$store.commit('SET_IS_SERVES_ALCOHOL', val)
      }
    },
    noOfOptions: {
      get () {
        return this.$store.getters['getNoOfOptions']
      },
      set (val) {
        this.$store.commit('SET_NO_OF_OPTIONS', val)
      }
    },
    range: {
      get () {
        return this.$store.getters['getRange']
      },
      set (val) {
        this.$store.commit('SET_RANGE', val)
      }
    }
  },
  methods: {
    ...Vuex.mapActions([
      'findRestos'
    ]),
    navigate (url) {
      // window.location = url
      window.open(url)
    }
  }
}
</script>
