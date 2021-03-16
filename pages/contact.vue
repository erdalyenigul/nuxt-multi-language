<template>
  <div class="pageWrap">
    <h1 class="title">{{ $t('contact.title') }}</h1>
    <div class="description">{{ $t('contact.description') }}</div>
    <div class="contactDetail">
      <form @submit.prevent="sendForm()" v-if="formVisible">
        <div class="content-inputs">
          <vs-input required type="text" v-model="name" :placeholder="$t('login.username')" />
        </div>
        <div class="content-inputs">
          <vs-input dark :label="$t('login.email')" required type="email" v-model="email" :placeholder="$t('login.email')" />
        </div>
        <div class="content-inputs">
          <vs-input dark :label="$t('login.phone')" required type="number" v-model="phonenumber" :placeholder="$t('login.phone')" />
        </div>
        <div class="content-inputs">
          <div class="dropdown">
            <input v-if="Object.keys(country_code).length === 0" ref="dropdowninput" v-model.trim="inputValue" class="dropdown-input" type="text" :placeholder="$t('contact.findCountry')" />
            <div v-else @click="resetSelection" class="dropdown-selected">
              <img :src="country_code.flag" class="dropdown-item-flag" />
              {{ country_code.name }}
            </div>
            <div v-show="inputValue" class="dropdown-list">
              <div @click="selectItem(item)" v-show="itemVisible(item)" v-for="item in countryList" :key="item.name" class="dropdown-item">
                <img :src="item.flag" class="dropdown-item-flag" />
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="content-inputs">
          <textarea class="msg" required cols="30" rows="10" v-model="text"></textarea>
        </div>
        <vs-button>{{ $t('login.sendBtn') }}</vs-button>
      </form>
      <div class="success" v-if="!formVisible">
        {{ $t('contact.success') }}
      </div>
      {{ getUser }}
    </div>
  </div>
</template>

<script>
  
  export default {
    data() {
      return{
        formVisible: true,
        phonenumber: null,
        name: '',
        email: '',
        country_code: {},
        text: null,
        inputValue: '',
      }
    },
    computed: {
      countryList () { 
        return [
          { id: "TR", flag: "https://restcountries.eu/data/tur.svg", name: this.$i18n.t('countries.tr'), },
          { id: "US", flag: "https://restcountries.eu/data/usa.svg", name: this.$i18n.t('countries.us'), },
          { id: "GB", flag: "https://restcountries.eu/data/gbr.svg", name: this.$i18n.t('countries.gb'), },
          { id: "DE", flag: "https://restcountries.eu/data/deu.svg", name: this.$i18n.t('countries.de'), },
          { id: "SE", flag: "https://restcountries.eu/data/swe.svg", name: this.$i18n.t('countries.se'), },
          { id: "KE", flag: "https://restcountries.eu/data/ken.svg", name: this.$i18n.t('countries.ke'), },
          { id: "BR", flag: "https://restcountries.eu/data/bra.svg", name: this.$i18n.t('countries.br'), },
          { id: "ZW", flag: "https://restcountries.eu/data/zwe.svg", name: this.$i18n.t('countries.zw'), }
        ]
      },
      getUser () {
        this.name = this.$store.state.name;
        this.email = this.$store.state.email;
      }
    },
    methods: {
      resetSelection () {
        this.country_code = {}
        this.$nextTick( () => this.$refs.dropdowninput.focus() );
      },
      selectItem (theItem) {
        this.country_code = theItem 
        this.inputValue = '';
      },
      itemVisible (item) {
        let currentName = item.name.toLowerCase()
        let currentInput = this.inputValue.toLowerCase()
        return currentName.includes(currentInput)
      },
      sendForm() {
        this.formVisible = !this.formVisible;
        let data = {
          "name": this.name,
          "email": this.email,
          "phonenumber": this.phonenumber,
          "country_code": this.country_code.id,
          "text": this.text
        }
        console.log(data);
      }
    },
    mounted() { 
      this.name = this.$store.state.name;
      this.email = this.$store.state.email;
      
      if(localStorage.getItem('name') || localStorage.getItem('email')) {
        this.name = localStorage.getItem('name');
        this.email = localStorage.getItem('email');
      }
    }
  }
</script>