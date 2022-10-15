<template>
  <button class="btn-lang">
    <div
      class="icon"
      style="background: url(/translate.svg) no-repeat center center"
    />
    <ul class="lang">
      <li>
        <span
          v-for="data in langs"
          :key="data.value"
          :class="{ 'd-none': data.value === lang }"
          v-html="data.name"
          @click="setLang(data.value)"
        />
      </li>
    </ul>
  </button>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'translate',
  data: () => ({
    langs: [
      {
        name: 'Türkçe',
        value: 'tr',
      },
      {
        name: 'English',
        value: 'en',
      },
    ],
  }),
  watch: {
    lang() {
      this.getTranslations()
    },
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
    }),
  },
  methods: {
    ...mapMutations({ setLang: 'lang/setLang' }),
    ...mapActions({ getTranslations: 'lang/getTranslations' }),
  },
}
</script>

<style lang="scss" scoped>
.btn-lang {
  width: 32px;
  height: 45px;
  border-radius: 0;
  border: 0;
  background: #1e2023;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    .lang {
      visibility: visible;
      opacity: 1;
    }
  }
}

.icon {
  height: 24px;
  width: 24px;
  margin-bottom: 15px;
  fill: white;
}

.lang {
  transition: all 0.25s ease;
  position: absolute;
  top: 0;
  left: 15px;
  transform: translateY(-90%);
  padding: 0;
  opacity: 0;
  visibility: visible;
  li {
    text-align: center;
    font-weight: 700;
    padding: 0 !important;
    display: block;
    span {
      padding: 7px 15px;
      font-weight: 700;
      background: #1e2023;
      border-radius: 20px;
      transition: all 0.25s ease;
      margin-bottom: 10px;
      font-size: 0.75rem;
      display: block;
      box-shadow: 0 8px 25px 0 rgb(0 0 0 / 60%);
      color: white;
      text-decoration: none;
    }
  }
}
</style>
