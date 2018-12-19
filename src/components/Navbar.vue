<template>
<div class="navbar">
  <el-menu
    :default-active="activeIndex"
    class="el-menu"
    mode="horizontal"
    menu-trigger="click"
    :unique-opened="true"
    background-color="#545c64"
    text-color="#fff" 
    ref="mainMenu"
    :router="true"
    active-text-color="#ffd04b">

    <el-menu-item index="1" :route="{ name: 'home' }" class="menu-item--brand">
      Brand
    </el-menu-item>

    <el-submenu index="2">
      <template slot="title">Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
    </el-submenu>
    <el-menu-item index="3" :route="{ name: 'add-course' }" class="menu-item--info">
      Add Course
    </el-menu-item>

    <el-submenu index="4" popper-class="profile-menu">
      <template slot="title"><i class="profile-icon fas fa-user-circle"/></template>
      <el-menu-item index="4-1">Settings</el-menu-item>
      <el-menu-item index="4-2" @click="logout">Logout</el-menu-item>
    </el-submenu>

  </el-menu>
</div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Navbar',
  data() { 
    return {
      activeIndex: "4"
    }
  },
  methods: {
    ...mapMutations({
      LOGOUT: 'LOGOUT',
    }),
    closeAllDropMenus() {
        this.$refs.mainMenu.close("2")
        this.$refs.mainMenu.close("4")
    },
    logout() {
        this.LOGOUT()
        this.$router.push({ name: 'login'})
    }
  },
  created () {
    // document.addEventListener('click', this.closeAllDropMenus, true)
  },
  destroyed() {
    // document.removeEventListener('click', this.closeAllDropMenus)
  }
}
</script>

<style lang="scss">
.navbar {
  .el-menu {
    display: flex;
    justify-content: flex-end;

    &-item.menu-item--brand {
      margin-right: auto;
      color: red;
    }
    &-item.menu-item--info{
      margin-right: 5vw;
    }

    .profile-icon {
      font-size: 2rem;
    }

    .profile-menu {
      margin: 0;
    }
  }
}
</style>