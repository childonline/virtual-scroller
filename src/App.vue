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

    <v-app-bar app clipped-right color="blue-grey" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer/>
    </v-app-bar>

    <v-content>
      <RecycleScroller v-if="list" v-slot="{ item }" :items="list" key-field="id" :item-size="128" direction="horizontal" style="height: 100%">
        <v-sheet tile style="width: 128px">
          <span class="d-flex body-1 cell">{{ item.id }}</span>
          <span class="d-flex body-1 cell">{{ $moment(item.date, "YYYY-MM-DDTHH:mm:ss.SSS").format("YYYY-MM-DD") }}</span>

          <input v-model="item.available" class="cell"/>

          <v-row no-gutters>
            <v-col cols="4">
              <v-btn v-model="item.booked" color="orange" x-small icon/>
            </v-col>
            <v-col cols="4">
              <v-btn v-model="item.close_out" color="orange" x-small icon/>
            </v-col>
            <v-col cols="4">
              <v-btn v-model="item.close_out" color="red" x-small icon/>
            </v-col>
          </v-row>

          <input v-model="item.available" class="cell"/>
          <input v-model="item.available" class="cell"/>
          <input v-model="item.available" class="cell"/>
          <input v-model="item.available" class="cell"/>
          <input v-model="item.available" class="cell"/>
          <input v-model="item.available" class="cell"/>
          <input v-model="item.available" class="cell"/>
          <input v-model="item.available" class="cell"/>

        </v-sheet>
      </RecycleScroller>
    </v-content>

  </v-app>
</template>


<script>

  export default {

    async created() {
      let list1 = await this.$axios
        .get('http://5dc52f170bbd050014fb8659.mockapi.io/inventory?p=1&l=100')
        .then(response => {
          return response.data
        });

      let list2 = await this.$axios
        .get('http://5dc52f170bbd050014fb8659.mockapi.io/inventory?p=1&l=100')
        .then(response => {
          return response.data
        });

      let list3 = await this.$axios
        .get('http://5dc52f170bbd050014fb8659.mockapi.io/inventory?p=1&l=100')
        .then(response => {
          return response.data
        });

      this.list = [...list1, ...list2, ...list3]
    },

    data: () => ({
      list: [],
      drawer: null
    }),
  };

</script>

<style>
  .cell {
    width: 128px;
    text-align: center;
    outline-color: transparent;
  }

  .hover .cell {

  }
</style>