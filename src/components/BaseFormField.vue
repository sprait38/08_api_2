<!-- eslint-disable max-len -->
<!-- eslint-disable linebreak-style -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <label class="form__label">
    <slot />
    <span class="form__value">{{ title }}</span>
    <span class="form__error" v-if="error">{{ error }}</span>
  </label>
</template>
<script>
export default {
  props: ['title', 'error'],
};
</script>
