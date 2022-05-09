<template>
  <nav class="h-screen w-1/5 bg-indigo-600 text-white flex flex-col sticky top-0">
    <router-link to="/" class="text-white logo text-4xl p-5 mx-auto">
      Besticks
    </router-link>
    <div class="mt-8 grid gap-4 px-5">
      <router-link to="/admin" class="flex flex-row rounded hover:bg-indigo-800 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Mes évènement
      </router-link>
      <router-link to="/admin/event/new" class="flex flex-row rounded hover:bg-indigo-800 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Publier un évènement
      </router-link>
      <router-link to="/admin/team" class="flex flex-row rounded hover:bg-indigo-800 p-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-4 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        Collaborateurs
      </router-link>
    </div>
  </nav>
</template>

<script>

export default {
  data() {
    return {
    };
  },
};
</script>
