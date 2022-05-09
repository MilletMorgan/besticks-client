<template>
  <div class="header bg-white z-10 shadow-sm sticky top-0">
    <nav class="py-2 md:py-4">
      <div class="container px-4 mx-auto md:flex md:items-center">
        <div class="flex justify-between items-center">
          <router-link to="/" class="font-bold text-3xl px-10 text-indigo-600 logo">
            Besticks
          </router-link>
          <button id="navbar-toggle" class="px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden select-none focus:outline-none">
            <svg
              class="w-6 h-6 text-gray-500 select-none"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div id="navbar-collapse" class="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0">
          <router-link
            to="/"
            class="mr-5 rounded p-2 hover:bg-indigo-200 hover:text-white"
          >
            Accueil
          </router-link>
          <router-link
            to="/evenements"
            :class="menu==='home' && 'text-indigo-600'"
            class="mr-5 rounded p-2 hover:bg-indigo-200 hover:text-white"
          >
            Événements
          </router-link>
          <router-link
            v-if="!isAuthenticated()"
            to="/connexion"
            class="mr-5 rounded p-2 hover:bg-indigo-200 hover:text-white"
          >
            Connexion
          </router-link>
          <router-link
            v-if="!isAuthenticated()"
            to="/inscription/customer"
            class="mr-5 rounded p-2 hover:bg-indigo-200 hover:text-white"
          >
            Inscription
          </router-link>
          <router-link
            v-if="isAuthenticated() && isAdmin()"
            to="/admin"
            class="mr-5 rounded p-2 hover:bg-indigo-200 hover:text-white"
          >
            Mon dashboard
          </router-link>
          <router-link
            v-if="isAuthenticated() && !isAdmin()"
            to="/myEvents"
            class="mr-5 rounded p-2 hover:bg-indigo-200 hover:text-white"
          >
            Mes réservations
          </router-link>
          <button
            v-if="isAuthenticated()"
            class="rounded p-2"
            @click="logoutClick"
          >
            Se deconnecter
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Header',
  data() {
    return {
      menu: null,
    };
  },
  mounted() {
    const toggleBtn = document.querySelector('#navbar-toggle');
    const collapse = document.querySelector('#navbar-collapse');
    toggleBtn.onclick = () => {
      collapse.classList.toggle('hidden');
      collapse.classList.toggle('flex');
    };
  },
  methods: {
    ...mapGetters(['isAuthenticated', 'isAdmin']),
    ...mapActions(['logout']),
    logoutClick() {
      this.logout();
      this.$router.push('/');
    },
  },
};

</script>
