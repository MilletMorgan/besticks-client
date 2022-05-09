<template>
  <div>
    <h1 class="mt-6 font-bold text-2xl mx-4">
      Mes évènements
    </h1>
    <div class="mt-10">
      <div class="-my-2">
        <div class="align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Informations
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Places
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="event in events" :key="event.id">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" :src="event.cover" alt="">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ event.name }}
                        </div>
                        <div class="text-sm text-gray-500">
                          {{ event.description.substring(0,25) + '...' }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ `${event.city} ${event.location}` }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ formatDate(event.date) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="'px-2 inline-flex text-xs leading-5 font-semibold rounded-full' + getBadge(event.category.name) "> {{ event.category.name.toUpperCase() }} </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ event.tickets }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <router-link :to="`/admin/event/edition/${event.id}`" href="#" class="text-indigo-600 hover:text-indigo-900 mr-2">
                      Modifier
                    </router-link>
                    <span @click="deleteEvent(event.id)" class="text-red-600 cursor-pointer hover:text-red-900">
                      Supprimer
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { requestWithRetry, endpoint } from '@/services/api';
import { formatDate, formatPrice } from '@/services/utils';

export default {
  data() {
    return {
      isLoading: true,
      events: null,
    };
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    ...mapGetters(['getUser']),
    formatPrice,
    formatDate,
    getBadge: category => {
      switch (category) {
        case 'concert':
          return ' bg-pink-200 text-pink-800';
        case 'Conférence':
          return ' bg-blue-200 text-blue-800';
        case 'festival':
          return ' bg-yellow-200 text-yellow-800';
        default:
          return ' bg-green-200 text-green-800';
      }
    },
    async getEvents() {
      try {
        const events = await requestWithRetry({
          endpoint: endpoint.pro.events.getOrganisationEvents(this.getUser().organisation),
        });
        this.events = events;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteEvent(event) {
      await requestWithRetry({
        endpoint: endpoint.pro.events.deleteEvent(event),
        method: 'DELETE',
      });

      const myEvent = this.events.find(e => e.id === event);
      const index = this.events.indexOf(myEvent);

      this.events.splice(index, 1);
    },
  },

};
</script>
