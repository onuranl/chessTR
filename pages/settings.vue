<template>
  <div>
    <div v-if="user" class="settings text-secondary">
      <c-tabs
        :activeTab="activeTab"
        @changeActiveTab="changeActiveTab"
        :key="lang"
      >
        <c-tab :id="1" :title="traslations.Settings.UserInformation">
          <div class="settings-content">
            <div>
              <vs-input
                dark
                type="text"
                v-model="user.username"
                :label="traslations.Settings.Username"
              />
              <vs-input
                disabled
                dark
                class="mt-5"
                type="email"
                v-model="user.email"
                :label="traslations.Settings.Email"
              />
            </div>
            <div class="save-button">
              <vs-button
                icon
                relief
                success
                animation-type="rotate"
                @click="updateUser(user)"
              >
                <save-icon size="1.5x" />

                <template #animate>
                  <save-icon size="1.5x" />
                </template>
              </vs-button>
            </div>
          </div>
        </c-tab>
        <c-tab :id="2" :title="traslations.Settings.Links">
          <div class="settings-content">
            <div>
              <vs-input
                dark
                type="url"
                v-for="index in 3"
                v-model="user.links[index - 1]"
                :key="index"
                :class="{ 'mt-5': index !== 1 }"
                :label="firstLetterUpperCase(medias[index - 1])"
              />
            </div>
            <div class="save-button">
              <vs-button
                icon
                relief
                success
                animation-type="rotate"
                @click="updateUser(user)"
              >
                <save-icon size="1.5x" />

                <template #animate>
                  <save-icon size="1.5x" />
                </template>
              </vs-button>
            </div>
          </div>
        </c-tab>
      </c-tabs>
    </div>
  </div>
</template>

<script>
import CTab from '@/components/common/CTab.vue'
import CTabs from '@/components/common/CTabs.vue'

import { SaveIcon } from 'vue-feather-icons'

import firstLetterUpperCase from '../utilities/firstLetterUpperCase'
import deepClone from '../utilities/deepClone'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'settings',
  components: {
    CTab,
    CTabs,
    SaveIcon,
  },
  data() {
    return {
      activeTab: 1,
      medias: ['twitter', 'linkedin', 'github'],
      user: null,
    }
  },
  fetch() {
    this.user = deepClone(this.stateUser)
  },
  computed: {
    ...mapGetters({
      lang: 'lang/lang',
      traslations: 'lang/traslations',
      stateUser: 'auth/stateUser',
    }),
  },
  methods: {
    firstLetterUpperCase,
    ...mapActions({
      updateUser: 'user/updateUser',
    }),
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

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.save-button {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<style lang="scss">
@media only screen and (max-width: 576px) {
  .settings {
    width: 90% !important;
    margin: 0px 15px !important;
    &-content {
      div {
        .vs-input {
          width: 150px;
        }
      }
    }
    .row {
      .content {
        padding-right: 0px !important;
      }
    }
  }
}
</style>