<template>
  <div class="container mx-auto px-10 py-10 content-center">
    <h1 class="text-4xl font-semibold mb-4">
      Mes réservations
    </h1>
    <div v-if="loading" class="grid grid-col-1 gap-y-8 md:grid-cols-3 md:gap-6">
      <div v-for="event in 10" :key="event">
        <EventCardSkeleton />
      </div>
    </div>
    <div v-else class="grid grid-col-1 gap-y-8 md:grid-cols-3 md:gap-6">
      <router-link v-for="event in events" :key="event.id" :to="/evenements/+ event.id">
        <EventCard :myEvent="true" :event="event" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import { requestWithRetry } from '@/services/api';
import EventCard from '@/components/fragments/EventCard';
import EventCardSkeleton from '@/components/fragments/EventCardSkeleton';

export default {
  name: 'MyEvents',
  components: {
    EventCard,
    EventCardSkeleton,
  },
  data() {
    return {
      events: [],
      loading: true,
    };
  },
  async mounted() {
    await requestWithRetry({ endpoint: `client/users/events/${this.getUser().user?.id}` }) // inexistant endpoint
      .then(events => { this.events = events; this.loading = false; });
  },
  methods: {
    ...mapGetters(['getUser']),
  },
};
</script>
