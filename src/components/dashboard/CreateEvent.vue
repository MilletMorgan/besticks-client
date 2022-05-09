<template>
  <div class="mt-10 mx-10">
    <h1 class="text-2xl mb-10">
      {{ !$route.params.eventId ? 'Créer un nouvel évènement' : 'Modifier un événement' }}
    </h1>
    <form @submit.prevent="submitForm">
      <div class="grid grid-cols-2 gap-5">
        <div class="col-span-1">
          <label class="block" for="event_name">
            <span class="text-gray-700"> Titre de l'événement </span>
            <input
              id="event_name"
              v-model.trim="event.title"
              type="text"
              class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3"
              required
            >
            <div v-if="!$v.event.name.requiredUnless" class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900">
              Veuillez renseigner le lieu de l'événement
            </div>
          </label>
        </div>

        <div class="col-span-1">
          <label class="block" for="event_location">
            <span class="text-gray-700">Lieu de l'événement</span>
            <input
              id="event_location"
              v-model.trim="event.location"
              type="text"
              class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3"
              required
            >
            <div
              v-if="!$v.event.location.requiredUnless"
              class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900"
            >
              Veuillez renseigner le lieu de l'événement
            </div>
          </label>
        </div>

        <div class="col-span-1">
          <label class="block" for="event_city">
            <span class="text-gray-700">Ville de l'événement</span>
            <input
              id="event_city"
              v-model.trim="event.city"
              type="text"
              class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3"
              required
            >
            <div v-if="!$v.event.city.requiredUnless" class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900">
              Veuillez renseigner la ville de l'événement
            </div>
          </label>
        </div>

        <div class="col-span-1">
          <label class="block" for="event_ticket">
            <span class="text-gray-700">Nombre de tickets</span>
            <input
              id="event_ticket"
              v-model.trim="event.tickets"
              type="number"
              class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3"
              required
            >
            <div
              v-if="!$v.event.tickets.requiredUnless"
              class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900"
            >
              Veuillez renseigner un nombre de ticket à mettre en vente
            </div>
          </label>
        </div>

        <div class="col-span-1">
          <label class="block" for="event_price">
            <span class="text-gray-700">Prix unitaire (centimes)</span>
            <input
              id="event_price"
              v-model.trim="event.price"
              type="number"
              class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3"
              required
            >
            <div
              v-if="!$v.event.price.requiredUnless"
              class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900"
            >
              Veuillez renseigner un prix unitaire
            </div>
          </label>
          <span class="font-semibold">{{ event.price !== '' ? formatPrice(event.price) : '' }}</span>
        </div>

        <div class="col-span-1">
          <label class="block" for="event_date">
            <span class="text-gray-700">Date de l'évènement</span>
            <input
              id="event_date"
              v-model.trim="event.date"
              type="date"
              class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3"
              required
            >
            <div
              v-if="!$v.event.date.requiredUnless"
              class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900"
            >
              Veuillez renseigner une date
            </div>
          </label>
        </div>

        <div class="col-span-1">
          <label class="block" for="event_category">
            <span class="text-gray-700">Type d'événement</span>
            <select
              id="event_category"
              v-model.trim="event.category"
              class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3"
              name="event_category"
              required
            >
              <template v-for="{id, name } in categories">
                <option :key="id" :value="id">{{ name }}</option>
              </template>
            </select>
          </label>
        </div>

        <div class="col-span-1">
          <label class="block" for="event_cover">
            <span class="text-gray-700">Affiche</span>
            <input
              id="event_cover"
              v-model.trim="event.cover"
              type="text"
              class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3"
              required
            >
            <div
              v-if="!$v.event.cover.requiredUnless"
              class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900"
            >
              Veuillez renseigner une affiche
            </div>
          </label>
        </div>
      </div>
      <div class="col-span-1">
        <label class="block" for="event_desc">
          <span class="text-gray-700">Description</span>
          <textarea
            id="event_desc"
            v-model.trim="event.description"
            class="form-input mt-1 block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 outline-none"
            required
          />
          <div
            v-if="!$v.event.description.requiredUnless"
            class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900"
          >
            Veuillez renseigner une capacité maximale
          </div>
        </label>
      </div>
      <div v-if="env === 'node'">
        <label>
          Rechercher un artiste
          <input v-model="searchArtist" class="form-input" type="text" />
        </label>

        <button type="button" class="mt-3 p-2 m-1 rounded bg-green-500 text-whit" @click="searchArtists">
          Rechercher
        </button>
        <div class="grid grid-cols-3">
          <div v-for="artist in artists" :key="artist.id" class="col-span-1 mx-auto">
            <h4 class="font-bold">
              {{ artist.name }}
            </h4>
            <img class="h-44" :src="artist.images[0].url" alt="artist">
            <button
              class="px-5 bg-blue-500 hover:bg-blue-700 transition text-white w-full"
              type="button"
              @click="addArtistToList(artist.id, artist.images[0].url, artist.name)"
            >
              Ajouter l'artiste
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-center w-1/2 mx-auto mt-4">
        <button class="p-2 m-1 rounded bg-primary text-white uppercase" type="submit">
          Créer l'évènement
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { requiredUnless } from 'vuelidate/lib/validators';

import { requestWithRetry, endpoint, env } from '@/services/api';
import { formatDate, formatPrice } from '@/services/utils';

export default {
  name: 'FormEvent',
  data() {
    return {
      env,
      event: {
        title: '',
        category: 0,
        tickets: 0,
        price: 0,
        location: '',
        city: '',
        date: '' || formatDate(this.date),
        description: '',
        artists: [],
        cover: '',
        highlighted: 0,
        highlightedCover: '',
        organisation: this.$store.state.auth.user.organisation,
        tag: [],
      },
      categories: [],
      artists: [],
      searchArtist: '',
    };
  },
  validations: {
    event: {
      name: {
        requiredUnless,
      },
      tickets: {
        requiredUnless,
      },
      price: {
        requiredUnless,
      },
      location: {
        requiredUnless,
      },
      city: {
        requiredUnless,
      },
      date: {
        requiredUnless,
      },
      description: {
        requiredUnless,
      },
      artists: {
        requiredUnless,
      },
      cover: {
        requiredUnless,
      },
    },
  },
  mounted() {
    this.event.organisation = this.$store.getters.getUser.organisation;
    this.fetchCategories();
  },
  methods: {
    formatPrice,

    async submitForm() {
      /*
       if (this.$v.invalid) {
        const btn = document.querySelector('#btn-signup');
        const span = document.createElement('span');
        span.classList.add('text-sm', 'italic', 'bg-red-300', 'p-2', 'rounded', 'w-1/3', 'text-red-900');
        span.textContent = 'Veuillez remplir le formulaire correctement';
        btn.append(span);
      } else {
      */
      try {
        await this.createEvent();

        await this.$router.push('/admin/evenements');
      } catch (error) {
        console.error(error);
      }
    },

    async createEvent() {
      await requestWithRetry({
        endpoint: endpoint.pro.events.createEvent,
        method: 'POST',
        body: this.event,
      });
    },

    async searchArtists() {
      try {
        const { data: response } = requestWithRetry({ endpoint: `spotify/search-artists/${this.searchArtist}` });
        this.artists = response.artists.items;
      } catch (e) {
        console.error(e);
      }
    },

    addArtistToList(id) {
      this.event.artists.push({
        id,
      });
    },

    async fetchCategories() {
      try {
        const response = await requestWithRetry({ endpoint: endpoint.pro.categories.getCategories });
        response.forEach(el => this.categories.push(el));
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
