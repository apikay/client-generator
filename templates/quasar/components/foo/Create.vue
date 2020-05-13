<template>
  <div>
    <Toolbar :handle-submit="onSendForm" :handle-reset="resetForm">
      <Breadcrumb :values="$route.meta.breadcrumb" slot="left" />
    </Toolbar>
    <{{{titleUcFirst}}}Form
      ref="createForm"
      :values="item"
      :errors="violations"
      :handle-submit="onSendForm"
    />
    <Loading :showing="isLoading" />
  </div>
</template>

<script>
import { create } from '@gen/utils/vuexer';
import {{{titleUcFirst}}}Form from './Form';
import { Breadcrumb, Toolbar, Loading } from '@gen/common/components';
import CreateMixin from '@gen/common/mixins/CreateMixin';
const servicePrefix = '{{{titleUcFirst}}}';
const { getters, actions } = create(servicePrefix);

export default {
  name: '{{{titleUcFirst}}}Create',
  servicePrefix,
  mixins: [CreateMixin],
  components: {
    {{{titleUcFirst}}}Form,
    Breadcrumb,
    Toolbar,
    Loading,
  },

  data() {
    return {
      item: {
        {{#each formFields}}
          {{#compare type "==" "time" }}
        {{{name}}}: '',
          {{/compare}}
          {{#compare type "==" "date" }}
        {{{name}}}: new Date().toISOString(),,
          {{/compare}}
          {{#compare type "==" "dateTime" }}
        {{{name}}}: new Date().toISOString(),
          {{/compare}}
        {{/each}}
      },
    };
  },

  computed: getters,
  methods: actions,
};
</script>
