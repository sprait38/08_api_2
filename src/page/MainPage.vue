<!-- eslint-disable no-return-assign -->
<!-- eslint-disable no-return-assign -->
<!-- eslint-disable quotes -->
<!-- eslint-disable no-return-assign -->
<!-- eslint-disable no-template-curly-in-string -->
<!-- eslint-disable no-template-curly-in-string -->
<!-- eslint-disable no-return-assign -->
<!-- eslint-disable max-len -->
<!-- eslint-disable no-return-assign -->
<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>
    <div class="content__catalog">
      <ProductFilterVue :price-from.sync="filterPriceFrom" :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId" :colors-id.sync="filtercolors" />
      <section class="catalog">
        <div v-if="productsLoading">Загрузка товаров...
          <loader object="#ff9633" color1="#ffffff" color2="#17fd3d" size="5" speed="2" bg="#343a40" objectbg="#999793" opacity="80" disableScrolling="false" name="dots"></loader>
        </div>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрзке товара
          <button @click.prevent="loadProductes">Попробуте еще раз</button>
        </div>
        <ProductList :products="products" />
        <BasePaginationVue v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>
<script>

import ProductList from '@/components/ProductList.vue';
import BasePaginationVue from '@/components/BasePagination.vue';
import ProductFilterVue from '@/components/ProductFilter.vue';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  components: {
    ProductList, BasePaginationVue, ProductFilterVue,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filtercolors: 0,
      page: 1,
      productsPerPage: 3,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {

    products() {
      return this.productsData ? this.productsData.items.map((product) => ({
        ...product,
        image: product.image.file.url,
      }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProductes() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.LoadProductesTimer);
      this.LoadProductesTimer = setTimeout(() => {
        axios
          // eslint-disable-next-line quotes
          .get(`${API_BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              colorId: this.filtercolors,
              minPrice: this.filterPriceFrom,
              maxPrice: this.filterPriceTo,
            },
          })
          // eslint-disable-next-line no-return-assign
          .then((response) => this.productsData = response.data)
          // eslint-disable-next-line no-return-assign
          .catch(() => this.productsLoadingFailed = true)
          // eslint-disable-next-line no-return-assign
          .then(() => this.productsLoading = false);
      }, 5000);
    },
  },
  watch: {
    page() {
      this.loadProductes();
    },
    filterPriceFrom() {
      this.loadProductes();
    },
    filterPriceTo() {
      this.loadProductes();
    },
    filterCategoryId() {
      this.loadProductes();
    },
    filtercolors() {
      this.loadProductes();
    },
  },
  created() {
    this.loadProductes();
  },
};
</script>
