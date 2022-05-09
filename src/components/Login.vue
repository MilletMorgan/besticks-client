<template>
  <div>
    <main class="w-4/5 md:max-w-md p-8 md:p-12 rounded-lg mx-auto">
      <section class="text-center">
        <div class="text-indigo-600 text-6xl font-bold logo mb-5">
          B
        </div>
        <p class="text-gray-600 pt-2">
          Connectez-vous pour accéder à votre interface
        </p>
      </section>

      <section class="mt-mt15">
        <form class="flex flex-col" @submit.prevent="submitLogin">
          <div class="mb-6 pt-3 rounded">
            <label class="block text-gray-700 text-sm font-bold mb-3" for="email">Email</label>
            <input
              id="email"
              v-model="user.email"
              type="text"
              class="w-full text-gray-700 focus:outline-none  border-indigo-600 border-b-4 focus:border-secondary transition duration-500 px-3 pb-3"
              required
            >
          </div>
          <div class="mb-6 pt-3 rounded">
            <label class="block text-gray-700 text-sm font-bold mb-3" for="password">Mot de passe</label>
            <input
              id="password"
              v-model="user.password"
              type="password"
              class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 px-3 pb-3"
              required
            >
          </div>

          <button class="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 mt-8" type="submit">
            Se connecter
          </button>
        </form>
        <!--<p v-if="showError" class="mt-3 font-bold text-red-500">Email ou mot de passe incorrect</p>-->
        <a class="block mt-4 italic text-gray-500 text-sm" href="#">Mot de passe oublié ?</a>
      </section>
    </main>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    ...mapActions(['login']),
    ...mapGetters(['isAdmin', 'isAuthenticated']),
    async submitLogin() {
      const User = new FormData();
      User.append('email', this.user.email);
      User.append('password', this.user.password);
      try {
        await this.login(User);
        if (this.isAdmin) {
          this.$router.push('/admin');
        } else if (this.isAuthenticated) {
          this.$router.push('/');
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
