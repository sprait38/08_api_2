<!-- eslint-disable indent -->
<!-- eslint-disable key-spacing -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable max-len -->
<template>
  <BaseFormFieldVue :title="title" :error="error">
    <input class="form__input" v-model="dataValue" :type="type" name="name" :placeholder="placeholder">
  </BaseFormFieldVue>
</template>

<script>
// eslint-disable-next-line import/extensions, import/no-unresolved
import formFildMixin from '@/mixins/formFildMixin';

export default {
  props: {
    type: {
      default: 'text',
    },
  },
  mixins: [formFildMixin],
};
</script>
