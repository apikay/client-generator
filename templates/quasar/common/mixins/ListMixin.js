import { error, success } from '@gen/utils/notify';
import { extractDate } from '@gen/utils/dates';

export default {
  created() {
    this.onCreated();
  },

  data() {
    return {
      pagination: {
        sortBy: null,
        descending: false,
        page: 1, // page to be displayed
        rowsPerPage: 10, // maximum displayed rows
        rowsNumber: 10 // max number of rows
      },
      nextPage: null,
      filters: {},
      filtration: this.getInitialFiltration(),
      expandedFilter: false
    };
  },

  watch: {
    error(message) {
      this.onListError(message);
    },

    deleteError(message) {
      message && error(message, this.$t('Close'));
    },

    items() {
      this.pagination.page = this.nextPage;
      this.pagination.rowsNumber = this.totalItems;
      this.nextPage = null;
    },

    deletedItem(val) {
      this.onDeletedItem(val);
    },
  },

  methods: {
    getInitialFiltration() {
      return {};
    },

    onCreated() {
      this.onRequest({
        pagination: this.pagination
      });
    },

    onListError(message) {
      message && error(message, this.$t('{{{labels.close}}}'));
    },

    onDeletedItem(val) {
      success(`${val['@id']} ${this.$t('{{{labels.deleted}}}')}.`, this.$t('{{{labels.close}}}'));
    },

    onRequest(props, init) {
      const {
        pagination: { page, rowsPerPage: itemsPerPage, sortBy, descending },
      } = props;
      this.nextPage = page;
      let params = {
        ...this.filtration,
      };
      if (itemsPerPage > 0) {
        params = { ...params, itemsPerPage, page };
      }
      if (sortBy) {
        params[`order[${sortBy}]`] = descending ? 'DESC' : 'ASC';
      }
      this.getPage({ params }).then(() => {
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;
        this.pagination.rowsPerPage = itemsPerPage;
        if (!init) {
          this.filters = { ...this.filtration };
        }
      });
    },

    formatDateTime(val, format) {
      return val ? this.$d(extractDate(val), format) : '';
    },

    onSendFilter() {
      this.onRequest({
        pagination: this.pagination,
      });
    },

    resetFilter() {
      this.filtration = this.getInitialFiltration();
      this.onRequest({
        pagination: this.pagination
      });
    },

    addHandler() {
      this.$router.push({ name: `${this.$options.servicePrefix}Create` });
    },

    showHandler(item) {
      this.$router.push({
        name: `${this.$options.servicePrefix}Show`,
        params: { id: item['@id'] }
      });
    },

    editHandler(item) {
      this.$router.push({
        name: `${this.$options.servicePrefix}Update`,
        params: { id: item['@id'] }
      });
    },

    deleteHandler(item) {
      this.deleteItem(item).then(() =>
        this.onRequest({
          pagination: this.pagination,
        }),
      );
    },
  },
};
