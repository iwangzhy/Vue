export const mixin = {
  data() {
    return {
      x: 100,
      y: 100
    }
  },
  methods: {
    showName() {
      alert(this.name);
    }
  },
  beforeCreate() {
    console.log('mixin beforeCreate');
  },
  mounted() {
    console.log('mixin mounted');
  }
}