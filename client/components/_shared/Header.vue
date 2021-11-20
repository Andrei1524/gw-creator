<template>
  <div class="header custom-header">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Giveaway Creator</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown class="custom-dropdown" right no-caret no-flip>
            <template #button-content>
              <b-avatar src="https://placekitten.com/300/300"></b-avatar>
            </template>
            <b-dropdown-item href="#"><b-icon icon="person-fill" aria-hidden="true"></b-icon> Profile</b-dropdown-item>
            <b-dropdown-item href="#"><b-icon icon="gear-fill" aria-hidden="true"></b-icon> Settings</b-dropdown-item>
            <hr class="white-hr">
            <b-dropdown-item-button><b-icon icon="arrow-bar-left" aria-hidden="true"></b-icon> Logout</b-dropdown-item-button >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
