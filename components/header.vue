<template>
  <header>
    <div class="center examplex">
      <vs-navbar center-collapsed v-model="active">
        <template #left>
          <div class="logo"><nuxtLink to="/"><font-awesome-icon icon="globe" /> LOGO </nuxtLink></div>
        </template>
        <template #right>
          <vs-navbar-item>
            <nuxtLink to="/">{{ $t('links.home') }}</nuxtLink>
          </vs-navbar-item>
          <vs-navbar-item>
            <nuxtLink to="about">{{ $t('links.about') }}</nuxtLink>
          </vs-navbar-item>
          <vs-navbar-item>
            <nuxtLink to="contact">{{ $t('links.contact') }}</nuxtLink>
          </vs-navbar-item>
          
          <vs-button flat v-if="!user" @click="loginModal()">
            {{ $t('login.login') }}
          </vs-button>
          <div @click="userMenuOpen()" class="username" v-if="user">
            <font-awesome-icon icon="user-check" /> <div class="name">{{ name }}</div>
            <div class="userMenu" v-if="userMenu">
              <span>{{ name }}</span>
              <span>{{ email }}</span>
              <vs-button @click="logOut()">{{ $t('login.logout') }}</vs-button>
            </div>
          </div>

          <vs-dialog v-model="login" v-if="loginModalVisible">
            <template #header>{{ $t('login.signIn') }}</template>
            <form @submit.prevent="userLogin()">
              <div class="signIn">
                <vs-input required type="text" v-model="name" :placeholder="$t('login.username')" />
                <vs-input required type="email" v-model="email" :placeholder="$t('login.email')" />
                <vs-input required type="password" v-model="password" :placeholder="$t('login.password')" />
              </div>
              <vs-button block>{{ $t('login.loginBtn') }}</vs-button>
            </form>
            <div class="selectLanguageModalWrap">
              <select class="selectLanguage" v-model="language" @change="setLang()">
                <option label="TR" value="tr">TR</option>
                <option label="EN" value="en">EN</option>
              </select>
            </div>
          </vs-dialog>

          <select class="selectLanguage" v-model="language" @change="setLang()">
            <option label="TR" value="tr">TR</option>
            <option label="EN" value="en">EN</option>
          </select>
          
          <a @click="mobileMenuOpen()" class="mobileMenuBtn" href="javascript:;"><font-awesome-icon icon="bars" /></a>
          <ul class="mobileMenu" v-if="mobileMenuVisible">
            <li><nuxtLink @click.native="mobileMenuVisible = !mobileMenuVisible" to="/"><font-awesome-icon icon="angle-right" />  {{ $t('links.home') }}</nuxtLink></li>
            <li><nuxtLink @click.native="mobileMenuVisible = !mobileMenuVisible" to="about"><font-awesome-icon icon="angle-right" /> {{ $t('links.about') }}</nuxtLink></li>
            <li><nuxtLink @click.native="mobileMenuVisible = !mobileMenuVisible" to="contact"><font-awesome-icon icon="angle-right" /> {{ $t('links.contact') }}</nuxtLink></li>
            <li><vs-button @click="logOut()">{{ $t('login.logout') }}</vs-button></li>
          </ul>
        </template>
      </vs-navbar>
    </div>
  </header>
</template>

<script>
  export default {
    data() {
      return{
        pageHeadline: '',
        active: false,
        language: 'tr',
        login: false,
        name: '',
        email: '',
        password: '',
        user: false,
        userMenu: false,
        loginModalVisible: false,
        mobileMenuVisible: false,
      }
    },
    methods: {
      userMenuOpen() {
        this.userMenu = !this.userMenu;
        this.mobileMenuVisible = false;
      },
      mobileMenuOpen() {
        this.mobileMenuVisible = !this.mobileMenuVisible;
        this.userMenu = false;
      },
      setLang() {
        this.$i18n.locale = this.language;
        localStorage.setItem('lang', this.language);
      },
      loginModal() {
        this.login = true;
        this.loginModalVisible = true;
      },
      userLogin() {
        this.user = true;
        this.loginModalVisible = false;

        localStorage.setItem('name', this.name);
        localStorage.setItem('email', this.email);

        this.$store.state.name = this.name;
        this.$store.state.email = this.email;
      },
      logOut() {
        localStorage.clear();
        localStorage.setItem('lang', this.language);
        this.user = false;
        this.loginModalVisible = false;
        this.name = '';
        this.email = '';
        this.password = '';
      }
    },
    mounted() {
      this.pageHeadline = this.$t('links.home');
      if(localStorage.getItem('name') || localStorage.getItem('email')) {
        this.name = localStorage.getItem('name');
        this.email = localStorage.getItem('email');
        this.user = true;
      }
      if(localStorage.getItem('lang')){
        this.currentLang = localStorage.getItem('lang');
        this.$i18n.locale = this.currentLang;
        this.language = this.currentLang;
      }
    }
  }
</script>