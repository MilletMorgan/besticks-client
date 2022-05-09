<template>
  <div class="container mx-auto px-10 py-10 content-center">
    <div class="mb-10">
      <h1 class="text-4xl font-semibold">
        Liste des évènements
      </h1>
    </div>

    <div class="grid grid-cols-4 gap-5">
      <div class="col-span-1">
        <form @submit.prevent="searchWithFilter">
          <div>
            <label class="font-bold">
              Ville
              <select
                id="city"
                v-model="search.city"
                class="form-input"
                name="city"
              >
                <option value="paris">Paris</option>
                <option value="lyon">Lyon</option>
                <option value="vienne">Vienne</option>
                <option value="arras">Arras</option>
              </select>
            </label>
          </div>

          <div class="mt-5">
            <label class="font-bold">
              Catégorie
              <select
                id="category"
                v-model="search.category"
                class="form-input"
                name="category"
              >
                <option value="Concert">Concert</option>
                <option value="Festival">Festival</option>
              </select>
            </label>
          </div>

          <div class="mt-5">
            <label class="font-bold">
              Prix minimum
              <input
                v-model="search.minPrice"
                class="form-input"
                type="number"
              >
            </label>
          </div>

          <div class="mt-5">
            <label class="font-bold">
              Prix maximum
              <input
                v-model="search.maxPrice"
                class="form-input"
                type="number"
              >
            </label>
          </div>

          <Tags class="mt-5" @tagSelected="search.tags = $event" />

          <div class="mt-5">
            <label class="font-bold">
              Date la plus tôt
              <input
                v-model="search.minDate"
                class="form-input"
                type="date"
              >
            </label>
          </div>

          <div class="mt-5">
            <label class="font-bold">
              Date la plus tard
              <input
                v-model="search.maxDate"
                class="form-input"
                type="date"
              >
            </label>
          </div>
          <button class="p-2 mt-10 rounded bg-green-500 text-white w-full" type="submit">
            Rechercher
          </button>
        </form>
      </div>
      <div class="col-span-3">
        <div v-if="events.length === 0 && loading === false" class="text-center">
          <span class="font-bold">
            Aucun résultat n'a été trouvé. Veuillez réitérer votre recherche.
          </span>
        </div>
        <div v-else>
          <div v-if="loading" class="grid grid-col-1 gap-y-8 md:grid-cols-3 md:gap-6">
            <div v-for="event in 10" :key="event">
              <EventCardSkeleton />
            </div>
          </div>
          <div v-else class="grid grid-col-1 gap-y-8 md:grid-cols-3 md:gap-6">
            <router-link v-for="event in events" :key="event.id" :to="/evenements/+ event.id">
              <EventCard :event="event" />
            </router-link>
          </div>
          <div class="mt-5 w-full text-center">
            <span class="mr-2 hover:text-blue-500 cursor-pointer" @click="page -= page >= 1 ? 1 : 0">Précédente</span>
            -
            <span>{{ page + 1 }}</span>
            -
            <span
              class="ml-2 hover:text-blue-500 cursor-pointer"
              @click="page += events.length >= 9 ? 1 : 0"
            >Suivante</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { request, endpoint } from '@/services/api';

import EventCard from '@/components/fragments/EventCard';
import EventCardSkeleton from '@/components/fragments/EventCardSkeleton';
import Tags from '@/components/fragments/Tags';

export default {
  name: 'Events',
  components: {
    EventCard,
    EventCardSkeleton,
    Tags,
  },
  data() {
    return {
      events: [],
      page: 0,
      loading: true,
      search: {
        city: null,
        category: null,
        minPrice: null,
        maxPrice: null,
        minDate: null,
        maxDate: null,
        tags: [],
      },
    };
  },
  watch: {
    page() {
      this.searchWithFilter();
    },
  },
  mounted() {
    this.search.category = this.$route.query.category || null;
    this.searchWithFilter();
  },
  methods: {
    async searchWithFilter() {
      let query = '';
      try {
        Object.entries(this.search).forEach(([key, value]) => {
          if (value !== null) {
            if (key !== 'tags') {
              if (key === 'minPrice' || key === 'maxPrice') {
                this.search[key] *= 100;
              }
              query += `&${key}=${value}`;
            } else if (value.length > 0) {
              let queryTags = '&tags=';
              value.forEach((tag, i) => {
                queryTags += tag;
                if (i !== value.length - 1) {
                  queryTags += '-';
                }
              });
              query += queryTags;
            }
          }
        });

        const { events: response } = await request({ endpoint: endpoint.customer.events.getEvents(this.page + 1, 12, query) });
        this.events = response;
        this.loading = false;
        this.search = {
          city: null,
          category: null,
          minPrice: null,
          maxPrice: null,
          minDate: null,
          maxDate: null,
          tags: [],
        };
      } catch (e) {
        console.error(e);
      }
    },
  },
};

</script>
