<!-- eslint-disable import/no-extraneous-dependencies -->
<!-- eslint-disable import/no-extraneous-dependencies -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'main' }">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'cart' }">
            Корзина
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{ name: 'order' }">
            Оформление заказа
          </router-link>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{$store.state.cartProducts.length}} товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order">
        <div class="cart__field">
          <div class="cart__data">
            <BaseFormTextVue v-model="formData.name" :error="formError.name" title="ФИО"
              placeholder="Введите ваше полное имя" />
            <BaseFormTextVue v-model="formData.address" :error="formError.address" title="address"
              placeholder="Введите ваш адрес" />
            <BaseFormTextVue v-model="formData.phone" :error="formError.phone" title="phone"
              placeholder="Введите ваш телефон" />
            <BaseFormTextVue v-model="formData.email" :error="formError.email" title="email"
              placeholder="Введи ваш Email" />
            <BaseFormTextareaVue title="Комментарий к заказу" v-model="formData.comment" :error="formError.comment"
              placeholder="Ваши пожелания" />
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order"  :value="product.id" v-for="product in products" :key="product.id">
              <h3>{{product.product.title }}</h3>
              <b>{{product.product.price | numberFormat }}₽</b>
              <span>Артикул: {{product.amount}}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{$store.state.cartProducts.length}}</b> товара на сумму <b>{{totalPrace | numberFormat}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>
<script>

import BaseFormTextVue from '@/components/BaseFormText.vue';
import BaseFormTextareaVue from '@/components/BaseFormTextarea.vue';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapGetters } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import { API_BASE_URL } from '../config';

export default {
  filters: { numberFormat },
  components: { BaseFormTextVue, BaseFormTextareaVue },

  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
    };
  },
  computed: {
    ...mapGetters({ products: 'cartDetailProducts', totalPrace: 'cartTotalPrice' }),
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = {};
      axios
        .post(`${API_BASE_URL}/api/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    },
  },
};
</script>
