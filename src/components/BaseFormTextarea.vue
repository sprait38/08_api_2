<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable max-len -->
<template>
  <BaseFormFieldVue :title="title" :error="error">
    <textarea class="form__input form__input--area" v-model="dataValue" name="comments" :placeholder="placeholder"></textarea>
  </BaseFormFieldVue>
</template>
<script>
// eslint-disable-next-line import/extensions, import/no-unresolved
import formFildMixin from '@/mixins/formFildMixin';

export default {
  mixins: [formFildMixin],
};
</script>
