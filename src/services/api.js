import store from '@/store/index';

export const env = 'symfony';

const baseUrl = {
  symfony: 'https://127.0.0.1:8000/api/',
  node: 'https://besticks-api.herokuapp.com/api/',
};

const parseId = (data) => { // parse id's to make make it work with both symfony and node
  Object.entries(data).forEach(([key, value]) => {
    if (typeof value === 'object') {
      parseId(value);
    } else if (key === '_id') {
      // eslint-disable-next-line
      delete Object.assign(data, {id: data._id })._id;
    }
  });
  return data;
};

export const request = async ({
  endpoint,
  method = 'GET',
  body = null,
  headers = new Headers({ 'Content-Type': 'application/json' }),
}) => {
  let response;
  try {
    // eslint-disable-next-line no-shadow
    const request = await fetch(`${baseUrl[env]}${endpoint}`, {
      method,
      body: body && JSON.stringify(body),
      headers,
    });
    response = await request.json();
  } catch (e) {
    console.log(e);
  }
  return parseId(response);
};

const getTokens = async () => request({
  endpoint: 'auth/generateAt',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    refreshToken: store.getters.getUser.refreshToken,
    id: store.getters.getUser.id,
  }),
});

export const requestWithRetry = async ({
  endpoint,
  method = 'GET',
  body = null,
}) => {
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${store.getters.getUser.accessToken}` };
  const response = await request({
    endpoint,
    method,
    body,
    headers,
  });
  switch (response.error) {
    case 'unauthorized':
      const newToken = await getTokens();
      if (newToken.status !== 200) {
        store.setters.setUser({
          token: null,
          role: null,
        });
        return 'unauthorized';
      }
      store.setters.setUser({
        ...store.getters.getUser,
        auth: {
          ...store.getters.getUser.auth,
          accessToken: newToken,
        },
      });
      const newResponse = await request({
        endpoint,
        method,
        body,
        headers,
      });
      return newResponse;

    default:
      return response;
  }
};

const symfonyEndpoints = {
  customer: {
    auth: {
      login: 'auth/login',
      signup: 'auth/signup/customer',
    },
    events: {
      getEvent: (id) => `events/${id}`,
      getEvents: (page, limit, query) => `events?page=${page}&limit=${limit}${query}`,
      highlightedEvents: 'events/highlighted',
    },
  },
  pro: {
    auth: {
      login: 'auth/login',
      signup: 'auth/signup/customerpro',
    },
    events: {
      createEvent: 'events',
      getEvents: 'events',
      getEvent: id => `events/${id}`,
      getOrganisationEvents: id => `events/organisations/${id}`,
      updateEvent: 'events/',
      deleteEvent: id => `events/${id}`,
    },
    categories: {
      getCategories: 'categories',
    },
    members: {
      getMembers: id => `member/organisation/${id}`,
    },
  },
};

const nodeEndpoints = {
  customer: {
    auth: {
      login: 'auth/login',
      signup: 'auth/signup',
    },
    events: {
      getEvents: () => 'client/events',
      getEvent: id => `client/events/${id}`,
      buyEvent: 'client/events/buy',
      highlightedEvents: 'client/events/highlighted',
    },
  },
  pro: {
    auth: {
      login: 'auth/login',
      signup: 'auth/signup',
    },
    events: {
      getEvents: 'pro/events',
      getEvent: id => `pro/events/${id}`,
      getOrganisationEvents: id => `pro/organisations/${id}/events`,
    },
    categories: {
      getCategories: 'pro/categories',
    },
    organisation: {
      getEvents: id => `pro/organisations/${id}/events`,
    },
  },
};

export const endpoint = env === 'symfony' ? symfonyEndpoints : nodeEndpoints;
