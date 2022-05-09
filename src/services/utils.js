import moment from 'moment';

export const formatDate = (date) => moment(date).format('DD/MM/YYYY');

export const formatPrice = (price) => `${price.toString().substring(0, price.toString().length - 2)}.${price.toString().slice(-2)} €`;
