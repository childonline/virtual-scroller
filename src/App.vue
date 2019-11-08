<template>
  <v-app>

    <v-navigation-drawer v-model="drawer" app>
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

    <v-app-bar app color="blue-grey" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer/>
      <v-toolbar-items>
        <v-switch v-model="show" dense/>
      </v-toolbar-items>

    </v-app-bar>

    <v-content>
      <RecycleScroller v-if="list" :items="list" v-slot="{ item }" :item-size="100" direction="horizontal" style="height: 100%;">


        <div class="full-cell">
          {{ $moment(item.date, "YYYY-MM-DDTHH:mm:ss.SSS").format('MMM Do YY') }}
        </div>

        <div class="sheetColumn">
          <v-row class="pa-0 ma-0">
            <input v-model="item.available" class="full-cell"/>
          </v-row>
          <v-row class="pa-0 ma-0">
            <input v-model="item.booked" class="full-cell" readonly/>
          </v-row>
          <v-row class="pa-0 ma-0 text-center">
            <v-btn text x-small tile style="width: 100%">
              <v-icon v-if="item.close_out" color="red" small>mdi-close</v-icon>
              <v-icon v-else small color="green">mdi-check</v-icon>
            </v-btn>
          </v-row>
          <v-row class="pa-0 ma-0 text-center">
            <v-btn text x-small tile style="width: 50%">
              <v-icon small color="green">mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn text x-small tile style="width: 50%">
              <v-icon small color="red">mdi-arrow-down</v-icon>
            </v-btn>
          </v-row>
          <div v-show="show">
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_stay" class="half-cell min_stay"/>
              <input v-model="item.max_stay" class="half-cell min_stay"/>
            </v-row>
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_stay_through" class="half-cell"/>
              <input v-model="item.max_stay_through" class="half-cell"/>
            </v-row>
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_days_advance" class="half-cell"/>
              <input v-model="item.max_days_advance" class="half-cell"/>
            </v-row>
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_inventory" class="half-cell"/>
              <input v-model="item.max_inventory" class="half-cell"/>
            </v-row>
          </div>
        </div>

        <v-divider/>

        <div class="sheetColumn">
          <v-row class="pa-0 ma-0">
            <input v-model="item.available" class="full-cell"/>
          </v-row>
          <v-row class="pa-0 ma-0">
            <input v-model="item.booked" class="full-cell" readonly/>
          </v-row>
          <v-row class="pa-0 ma-0 text-center">
            <v-btn text x-small tile style="width: 100%">
              <v-icon v-if="item.close_out" color="red" small>mdi-close</v-icon>
              <v-icon v-else small color="green">mdi-check</v-icon>
            </v-btn>
          </v-row>
          <v-row class="pa-0 ma-0 text-center">
            <v-btn text x-small tile style="width: 50%">
              <v-icon small color="green">mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn text x-small tile style="width: 50%">
              <v-icon small color="red">mdi-arrow-down</v-icon>
            </v-btn>
          </v-row>
          <div v-show="show">
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_stay" class="half-cell min_stay"/>
              <input v-model="item.max_stay" class="half-cell min_stay"/>
            </v-row>
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_stay_through" class="half-cell"/>
              <input v-model="item.max_stay_through" class="half-cell"/>
            </v-row>
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_days_advance" class="half-cell"/>
              <input v-model="item.max_days_advance" class="half-cell"/>
            </v-row>
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_inventory" class="half-cell"/>
              <input v-model="item.max_inventory" class="half-cell"/>
            </v-row>
          </div>
        </div>

        <v-divider/>

        <div class="sheetColumn">
          <v-row class="pa-0 ma-0">
            <input v-model="item.available" class="full-cell"/>
          </v-row>
          <v-row class="pa-0 ma-0">
            <input v-model="item.booked" class="full-cell" readonly/>
          </v-row>
          <v-row class="pa-0 ma-0 text-center">
            <v-btn text x-small tile style="width: 100%">
              <v-icon v-if="item.close_out" color="red" small>mdi-close</v-icon>
              <v-icon v-else small color="green">mdi-check</v-icon>
            </v-btn>
          </v-row>
          <v-row class="pa-0 ma-0 text-center">
            <v-btn text x-small tile style="width: 50%">
              <v-icon small color="green">mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn text x-small tile style="width: 50%">
              <v-icon small color="red">mdi-arrow-down</v-icon>
            </v-btn>
          </v-row>
          <div v-show="show">
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_stay" class="half-cell min_stay"/>
              <input v-model="item.max_stay" class="half-cell min_stay"/>
            </v-row>
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_stay_through" class="half-cell"/>
              <input v-model="item.max_stay_through" class="half-cell"/>
            </v-row>
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_days_advance" class="half-cell"/>
              <input v-model="item.max_days_advance" class="half-cell"/>
            </v-row>
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_inventory" class="half-cell"/>
              <input v-model="item.max_inventory" class="half-cell"/>
            </v-row>
          </div>
        </div>

        <v-divider/>

        <div class="sheetColumn">
          <v-row class="pa-0 ma-0">
            <input v-model="item.available" class="full-cell"/>
          </v-row>
          <v-row class="pa-0 ma-0">
            <input v-model="item.booked" class="full-cell" readonly/>
          </v-row>
          <v-row class="pa-0 ma-0 text-center">
            <v-btn text x-small tile style="width: 100%">
              <v-icon v-if="item.close_out" color="red" small>mdi-close</v-icon>
              <v-icon v-else small color="green">mdi-check</v-icon>
            </v-btn>
          </v-row>
          <v-row class="pa-0 ma-0 text-center">
            <v-btn text x-small tile style="width: 50%">
              <v-icon small color="green">mdi-arrow-up</v-icon>
            </v-btn>
            <v-btn text x-small tile style="width: 50%">
              <v-icon small color="red">mdi-arrow-down</v-icon>
            </v-btn>
          </v-row>
          <div v-show="show">
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_stay" class="half-cell min_stay"/>
              <input v-model="item.max_stay" class="half-cell min_stay"/>
            </v-row>
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_stay_through" class="half-cell"/>
              <input v-model="item.max_stay_through" class="half-cell"/>
            </v-row>
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_days_advance" class="half-cell"/>
              <input v-model="item.max_days_advance" class="half-cell"/>
            </v-row>
            <v-row class="pa-0 ma-0">
              <input v-model="item.min_inventory" class="half-cell"/>
              <input v-model="item.max_inventory" class="half-cell"/>
            </v-row>
          </div>
        </div>

      </RecycleScroller>
    </v-content>

  </v-app>
</template>


<script>

  export default {

    async created() {
      this.list = await this.$axios
        .get('https://5dc52f170bbd050014fb8659.mockapi.io/inventory?p=1&l=100')
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
    width: 100px;
  }

  .inactive {
    background-color: rgba(220, 20, 60, 0.1);
  }

  .full-cell {
    font-size: 14px;
    width: 100%;
    text-align: center;
    outline: none;
  }

  .half-cell {
    font-size: 12px;
    width: 50%;
    text-align: center;
    outline: none;
  }

  .half-cell:hover {
    background-color: rgba(0, 0, 0, .1);
  }

</style>