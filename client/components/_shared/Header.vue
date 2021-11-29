<template>
  <div class="header custom-header">
    <b-navbar
      toggleable="lg"
      type="dark"
      variant="info"
      :class="{ 'pr-3': !$auth.loggedIn }"
    >
      <b-navbar-brand to="/">Giveaway Creator</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <!--  AUTH NAV  -->
        <b-navbar-nav
          v-if="$auth.loggedIn"
          class="ml-auto d-flex align-items-center"
        >
          <b-nav-item href="#" class="special-nav-item">
            <b-icon icon="gift" aria-hidden="true"></b-icon>
            Create
          </b-nav-item>
          <b-nav-item to='/dashboard'>
            <b-icon icon="menu-button-wide" aria-hidden="true"></b-icon>
            Dashboard
          </b-nav-item>
          <b-nav-item-dropdown class="custom-dropdown" right no-caret no-flip>
            <template #button-content>
              <b-avatar src="https://placekitten.com/300/300"></b-avatar>
            </template>
            <b-dropdown-item href="#">
              <b-icon icon="person-fill" aria-hidden="true"></b-icon>
              Profile
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <b-icon icon="gear-fill" aria-hidden="true"></b-icon>
              Settings
            </b-dropdown-item>
            <hr class="white-hr" />
            <b-dropdown-item-button>
              <b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon>
              Logout
            </b-dropdown-item-button>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!--  NON AUTH NAV  -->
        <b-navbar-nav v-else class="ml-auto d-flex align-items-center">
          <b-nav-item to="/register" class="special-nav-item">
            <b-icon icon="gift" aria-hidden="true"></b-icon>
            Register
          </b-nav-item>
          <b-nav-item to="/login">
            <b-icon icon="menu-button-wide" aria-hidden="true"></b-icon>
            Login
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  mounted() {
  },
}
</script>

<style lang="scss" scoped>
@import './assets/css/variables';

.nav-item {
  margin: 0 0.25em;

  .nav-link .b-icon.bi {
    color: $light-blue;
  }
}

.custom-dropdown {
  margin: 0;
}
</style>
