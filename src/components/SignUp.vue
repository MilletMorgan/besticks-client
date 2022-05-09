<template>
  <div class="container mx-auto">
    <div class="flex flex-col items-center mt-6">
      <h1 class="text-4xl mb-8 font-bold">
        Inscription
      </h1>
      <p class="mt-2 text-center mb-4">
        Grâce à votre compte
        <span class="font-bold text-indigo-600"> Besticks </span>
        vous pourrez réserver des places pour tous nos évènements!
      </p>
    </div>
    <div class="mt-6 mx-auto lg:w-6/12">
      <form @submit.prevent="submitSignUp">
        <div class="grid grid-cols-2 gap-8">
          <div class="items">
            <label class="block w-full" for="email">
              <span class="text-gray-700 font-semibold">Email</span>
              <input
                id="email"
                v-model.trim="$v.user.email.$model"
                type="email"
                class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3"
                required
              >
              <div
                v-if="!$v.user.email.requiredUnless"
                class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900 w-fit"
              > Veuillez renseigner une adresse email </div>
              <div
                v-if="!$v.user.email.email"
                class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900 w-fit"
              >Le format de l'adresse email n'est pas valide</div>
            </label>
          </div>

          <div class="items">
            <label class="block w-full" for="phone">
              <span class="text-gray-700 font-semibold">Téléphone</span>
              <input
                id="phone"
                v-model.trim="$v.user.phone.$model"
                type="tel"
                class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3"
                required
              >
              <div
                v-if="!$v.user.phone.requiredUnless"
                class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900"
              >Veuillez renseigner un numéro de téléphone</div>
              <div
                v-if="!$v.user.phone.minLength"
                class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900"
              >
                Le champ doit faire {{ $v.user.phone.$params.minLength.min }} caractères minimum
              </div>
            </label>
          </div>

          <div class="items">
            <label for="password w-full" class="block">
              <span class="text-gray-700 font-semibold">Mot de passe</span>
              <input
                id="password"
                v-model.trim="$v.user.password.$model"
                type="password"
                class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3"
                required
              >
              <div
                v-if="!$v.user.password.requiredUnless"
                class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900"
              >
                Veuillez renseigner un mot de passe
              </div>
              <div
                v-if="!$v.user.password.minLength"
                class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900"
              >
                Le mot de passe doit faire {{ $v.user.password.$params.minLength.min }} caractères minimum
              </div>
            </label>
          </div>

          <div class="items">
            <label for="repeatPassword w-full" class="block">
              <span class="text-gray-700 font-semibold">Confirmation mot de passe</span>
              <input
                id="repeatPassword"
                v-model.trim="$v.user.repeatPassword.$model"
                type="password"
                class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3"
                required
              >
              <div
                v-if="!$v.user.repeatPassword.sameAsPassword"
                class="text-sm italic bg-red-300 p-2 rounded text-red-900 mt-1"
              >
                Le mot de passe doit être identique
              </div>
            </label>
          </div>

          <div class="items">
            <label class="block w-full" for="firstName">
              <span class="text-gray-700 font-semibold">Prénom</span>
              <input
                id="firstName"
                v-model.trim="$v.user.firstName.$model"
                type="text"
                class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3"
                required
              >
              <div
                v-if="!$v.user.firstName.requiredUnless"
                class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900"
              >Veuillez renseigner un prénom</div>
              <div
                v-if="!$v.user.firstName.minLength"
                class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900"
              >Le champ doit faire {{ $v.user.firstName.$params.minLength.min }} caractères minimum</div>
            </label>
          </div>

          <div class="items">
            <label class="block w-full" for="lastName">
              <span class="text-gray-700 font-semibold">Nom</span>
              <input
                id="lastName"
                v-model.trim="$v.user.lastName.$model"
                type="text"
                class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3"
                required
              >
              <div
                v-if="!$v.user.lastName.requiredUnless"
                class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900"
              >Veuillez renseigner un nom</div>
              <div
                v-if="!$v.user.lastName.minLength"
                class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900"
              > Le champ doit faire {{ $v.user.lastName.$params.minLength.min }} caractères minimum</div>
            </label>
          </div>

          <div class="items">
            <label class="block w-full" for="birthDate">
              <span class="text-gray-700 font-semibold">Date de naissance</span>
              <input
                id="birthDate"
                v-model.trim="user.birthDate"
                type="date"
                class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3"
              >
            </label>
          </div>

          <div v-if="type === 'pro'" class="items">
            <label class="block" for="org_name">
              <span class="text-gray-700 font-semibold">Nom de votre organisation</span>
              <input id="org_name" v-model.trim="$v.organisation.name.$model" type="tel" class="w-full text-gray-700 focus:outline-none border-indigo-600 border-b-4 focus:border-secondary transition duration-500 p-3" required>
              <div v-if="!$v.organisation.name.requiredUnless" class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900">Veuillez renseigner un nom d'organisation</div>
              <div v-if="!$v.organisation.name.minLength" class="text-sm italic bg-red-300 p-2 rounded mt-2 text-red-900">Le champ doit faire {{ $v.user.phone.$params.minLength.min }} caractères minimum</div>
            </label>
          </div>
        </div>
        <div class="flex justify-center w-1/2 mx-auto mt-10">
          <button id="btn-signup" class="w-1/2 bg-indigo-500 hover:bg-indigo-800 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" type="submit">
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  email,
  minLength,
  maxLength,
  sameAs,
  requiredUnless,
} from 'vuelidate/lib/validators';
import { request, endpoint } from '@/services/api';

export default {
  name: 'SignUp',
  data() {
    return {
      type: 'customer',
      user: {
        email: '',
        password: '',
        repeatPassword: '',
        firstName: null,
        lastName: null,
        birthDate: null,
        phone: null,
      },
      organisation: {
        name: null,
      },
    };
  },
  watch: {
    // eslint-disable-next-line
    '$route.params.type'() {
      console.log(this.$route.params.type);
      this.type = this.$route.params.type;
    },
  },
  mounted() {
    this.type = this.$route.params.type;
  },
  validations: {
    user: {
      email: {
        requiredUnless,
        email,
      },
      password: {
        requiredUnless,
        minLength: minLength(8),
      },
      repeatPassword: {
        sameAsPassword: sameAs('password'),
      },
      firstName: {
        requiredUnless,
        minLength: minLength(2),
      },
      lastName: {
        requiredUnless,
        minLength: minLength(2),
      },
      phone: {
        requiredUnless,
        minLength: minLength(10),
      },
    },
    organisation: {
      name: {
        requiredUnless,
        minLength: minLength(2),
      },
      type: {
        requiredUnless,
      },
      address: {
        requiredUnless,
        minLength: minLength(5),
      },
      cp: {
        requiredUnless,
        minLength: minLength(5),
        maxLength: maxLength(5),
      },
      city: {
        requiredUnless,
        minLength: minLength(4),
      },
    },
  },
  methods: {
    async submitSignUp() {
      if (this.$v.$invalid) {
        const btn = document.querySelector('#btn-signup');
        const span = document.createElement('span');
        span.classList.add('text-sm', 'italic', 'bg-red-300', 'p-2', 'rounded', 'w-1/3', 'text-red-900');
        btn.insertAdjacentElement('afterend', span);
        span.textContent = 'Veuillez remplir le formulaire correctement';
      } else {
        const User = new FormData();
        const Organisation = new FormData();
        User.append('email', this.user.email);
        User.append('password', this.user.password);
        User.append('firstName', this.user.firstName);
        User.append('lastName', this.user.lastName);
        User.append('birthDate', this.user.birthDate);
        User.append('phone', this.user.phone);
        Organisation.append('name', this.organisation.name);
        try {
          console.log('try');
          if (this.type === 'pro') {
            await request({
              endpoint: endpoint.pro.auth.signup,
              body: {
                email: User.get('email'),
                password: User.get('password'),
                firstName: User.get('firstName'),
                lastName: User.get('lastName'),
                birthDate: User.get('birthDate'),
                phone: User.get('phone'),
                organisation: Organisation.get('name'),
              },
              method: 'POST',
            });
            this.$router.push('/connexion');
          } else {
            await request({
              endpoint: endpoint.customer.auth.signup,
              method: 'POST',
              body: {
                email: User.get('email'),
                password: User.get('password'),
                firstName: User.get('firstName'),
                lastName: User.get('lastName'),
                birthDate: User.get('birthDate'),
                phone: User.get('phone'),
              },
            });
            await this.$router.push('/connexion');
          }
        } catch (error) {
          console.error(error);
        }
      }
    },
  },
};
</script>

<style>
.w-fit {
  max-width: fit-content;
}
</style>
