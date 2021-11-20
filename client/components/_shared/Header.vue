<template>
  <div class="header custom-header">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown class="custom-dropdown" right no-caret no-flip>
            <template #button-content>
              <b-avatar variant="info" src="https://placekitten.com/300/300"></b-avatar>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Settings</b-dropdown-item>
            <hr class="white-hr">
            <b-dropdown-item href="#">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
