<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable import/no-extraneous-dependencies -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable import/no-extraneous-dependencies -->
<!-- eslint-disable import/no-extraneous-dependencies -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="item.product.image" width="120" height="120" alt="item.product.title">
    </div>
    <h3 class="product__title">
      {{ item.product.title }}
    </h3>
    <span class="product__code">
      Артикул: {{ item.product.id }}
    </span>
    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click="decrement()">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>
      <input type="text" v-model.number="amount" name="count">
      <button type="button" aria-label="Добавить один товар" @click="increment()">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
    <b class="product__price">
      {{ (item.amount * item.product.price) | numberFormat }} ₽
    </b>
    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click=" deleteFromCart(item.product.id)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
   </li>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mapActions } from 'vuex';

export default {
  filters: { numberFormat },
  props: ['item'],
  computed: {
    // eslint-disable-next-line vue/no-dupe-keys
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    // eslint-disable-next-line no-undef
    ...mapActions(['deleteCartProduct']),
    deleteFromCart() {
      this.productDeleting = true;
      this.deleteCartProduct(this.item.product.id)
        .then(() => {
          this.productDeleting = false;
        });
    },
    increment() {
      // eslint-disable-next-line no-plusplus
      this.amount++;
    },
    decrement() {
      // eslint-disable-next-line no-plusplus
      this.amount--;
    },
  },
};
</script>
