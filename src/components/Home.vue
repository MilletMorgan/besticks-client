<template>
  <div>
    <div class="mb-4">
      <Carroussel />
    </div>

    <div class="container mx-auto px-10 pb-10">
      <h2 class=" mb-6 mt-12 text-xl font-medium">
        Les prochains événements
      </h2>
      <div v-if="loading" class="grid grid-col-1 gap-y-8 md:grid-cols-3 md:gap-6">
        <EventCardSkeleton />
        <EventCardSkeleton />
        <EventCardSkeleton />
      </div>
      <div v-else class="grid grid-col-1 gap-y-8 md:grid-cols-3 md:gap-6">
        <router-link v-for="event in nextEvents" :key="event.id" :to="/evenements/+ event.id">
          <EventCard :event="event" />
        </router-link>
      </div>

      <h2 class="mt-12 mb-6 text-xl font-medium">
        Catégories populaires
      </h2>
      <div class="grid grid-cols-2 gap-4 ">
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="{ path: '/evenements', query: { category: category.id }}"
        >
          <div class="rounded overflow-hidden h-40 w-full relative">
            <div class="flex bg-gray-900 bg-opacity-60 h-full w-full absolute hover:bg-opacity-90">
              <h4 class="text-white font-bold m-auto">
                {{ `${ category.name }s` }}
              </h4>
            </div>
            <img class="object-cover w-full h-40" :src="category.cover">
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import { request, endpoint } from '@/services/api.js';
import EventCard from '@/components/fragments/EventCard';
import EventCardSkeleton from '@/components/fragments/EventCardSkeleton';
import Carroussel from '@/components/fragments/Carroussel';

export default {
  name: 'Home',
  components: {
    EventCard,
    EventCardSkeleton,
    Carroussel,
  },
  data() {
    return {
      nextEvents: [],
      categories: [
        {
          name: 'Concert',
          id: '1',
          cover: 'https://img.huffingtonpost.com/asset/5f1a00b8270000b10fe674d7.jpeg?cache=vM&ops=1200_630',
        },
        {
          name: 'Festival',
          id: '11',
          cover: 'https://www.visit.alsace/wp-content/uploads/2018/11/festival-decibulles-2017-laurent-khram-longvixay-1-1600x900.jpg',
        },
        {
          name: 'Spectacle',
          id: '21',
          cover: 'https://cdn.futura-sciences.com/buildsv6/images/wide1920/8/1/5/8157dc18ce_50172322_salle-spectacle-dassault-simulation-covid.jpg',
        },
        {
          name: 'Conférence',
          id: '31',
          cover: 'https://www.afd.fr/sites/afd/files/styles/visuel_principal/public/2018-12-06-00-52/conf-inegalites-goulard-home.jpg?itok=qzDq4oef',
        },
      ],
      myEvents: [],
      loading: true,
    };
  },

  async mounted() {
    await request({ endpoint: `${endpoint.customer.events.getEvents('1', '3', '')}` })
      .then(response => {
        this.nextEvents = response.events;
        this.loading = false;
      });
  },
};
</script>
