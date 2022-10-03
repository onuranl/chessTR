<template>
  <div>
    <div class="settings text-secondary">
      <c-tabs :activeTab="activeTab" @changeActiveTab="changeActiveTab">
        <c-tab :id="1" title="Kullanıcı Ayarları"> social medias </c-tab>
        <c-tab :id="2" title="Araç Tercihlerim"> email </c-tab>
        <c-tab :id="3" title="Harita Tercihlerim"> genel bilgiler </c-tab>
      </c-tabs>
    </div>
  </div>
</template>

<script>
import CTab from '@/components/common/CTab.vue'
import CTabs from '@/components/common/CTabs.vue'

export default {
  name: 'settings',
  components: {
    CTab,
    CTabs,
  },
  data() {
    return {
      activeTab: 1,
    }
  },
  methods: {
    changeActiveTab(id) {
      this.activeTab = id
    },
  },
}
</script>

<style lang="scss" scoped>
.settings {
  background: #262421;
  box-shadow: 0 2px 2px 0rgba (0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 3px;
  padding: 36px;
  margin: 0px 30px;
  width: 550px;
}
</style>
