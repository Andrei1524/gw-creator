<template>
  <div class="header">
    <b-navbar toggleable type="dark" variant="dark">
      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <template>
          <b-avatar variant="info" src="https://placekitten.com/300/300"></b-avatar>
        </template>
      </b-navbar-toggle>

      <b-nav-item-dropdown text="User" right>
        <b-dropdown-item href="#">Account</b-dropdown-item>
        <b-dropdown-item href="#">Settings</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar>
  </div>
</template>
