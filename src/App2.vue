<template>
  <v-app>

    <v-app-bar app color="blue-grey" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Toolbar</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" clipped temporary>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-contact-mail</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-content>
      <div style="display: flex; overflow-x: auto; height: 100%;">
        <div v-for="(item, index) in list" :key="index">
          <div v-for="i in 5" :key="i" class="sheetColumn">
            <input v-model.lazy="item.available" class="full-cell"/>
            <input v-model.lazy="item.booked" class="full-cell"/>
            <v-btn text x-small tile style="width: 100%">
              <v-icon small color="red">mdi-close</v-icon>
            </v-btn>
            <v-btn text x-small tile style="width: 50%">
              <v-icon small color="green">mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn text x-small tile style="width: 50%">
              <v-icon small color="red">mdi-arrow-down</v-icon>
            </v-btn>
            <input v-model.lazy="item.min_stay" class="half-cell"/>
            <input v-model.lazy="item.max_stay" class="half-cell"/>
            <input v-model.lazy="item.min_stay_through" class="half-cell"/>
            <input v-model.lazy="item.max_stay_through" class="half-cell"/>
            <input v-model.lazy="item.min_days_advance" class="half-cell"/>
            <input v-model.lazy="item.max_days_advance" class="half-cell"/>
            <input v-model.lazy="item.min_inventory" class="half-cell"/>
            <input v-model.lazy="item.max_inventory" class="half-cell"/>
          </div>
        </div>
      </div>
    </v-content>

  </v-app>
</template>


<script>

  export default {

    async created() {
      this.list = await this.$axios
        .get('https://5dc52f170bbd050014fb8659.mockapi.io/inventory?p=1&l=31')
        .then(response => {
          return response.data
        });
    },

    data: () => ({
      list: [],
      drawer: null,
      show: false
    }),
  };

</script>

<style>
  .sheetColumn {
    width: 125px;
    border-bottom: rgba(0, 0, 0, .1) solid 4px;
  }

  .full-cell {
    font-size: 16px;
    width: 100%;
    text-align: center;
    outline: none;
  }

  .half-cell {
    font-size: 16px;
    width: 50%;
    text-align: center;
    outline: none;
  }

  .full-cell:hover {
    outline: rgba(0, 0, 0, .5) solid 1px;
  }

  .half-cell:hover {
    outline: rgba(0, 0, 0, .5) solid 1px;
  }

</style>