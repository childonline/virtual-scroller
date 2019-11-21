<template>
  <v-app>

    <v-navigation-drawer app clipped expand-on-hover>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Hoteluri</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="mx-4"/>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-format-list-checks</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inventar</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-format-list-checks</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Camere</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-format-list-checks</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Tarife</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-format-list-checks</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Politici de anulare</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

    </v-navigation-drawer>

    <v-app-bar app clipped-left dense color="blue-grey">
      <v-toolbar-title class="white--text">Untitled B2B Project</v-toolbar-title>
      <v-spacer/>
      <v-text-field hide-details dense label="Hotel" value="Hotelul lu' Peste" flat solo-inverted dark style="max-width: 300px"/>
    </v-app-bar>

    <v-content>

      <v-container fluid>

        <v-card outlined class="ma-2">
          <v-card-text>
            <v-text-field outlined hide-details dense label="Interval"></v-text-field>
          </v-card-text>
        </v-card>

        <v-card v-for="(room, index) in list.room_types" :key="index" outlined class="ma-2">

          <v-card-title>
            <span class="mr-2">{{room.name}}</span>
            <span class="font-weight-light text--disabled">(Camera: {{room.id}})</span>
          </v-card-title>

          <v-divider class="mx-4"/>

          <v-card-text class="sheet-wrapper" ref="sheet-wrapper" @scroll="scroll">

            <table class="sheet">

              <colgroup>
                <col/>
                <col v-for="(day, index) in list.days" :key="index" :class="{weekday: true, weekend: ($moment(day).locale('en').format('dddd') === 'Saturday' || $moment(day).locale('en').format('dddd') === 'Sunday'), closed: true}"/>
              </colgroup>

              <thead>
                <tr style="background-color: white;">
                  <th></th>
                  <th class="sheet-date text-capitalize py-1" :style="{ backgroundColor: (month.name !== '') ? 'white' : 'transparent'}" v-for="(month, index) in sheetMonths" :key="index">{{ month.name }}</th>
                </tr>
                <tr>
                  <th class="sheet-header text-center" style="border-top: 1px solid white; border-left: 1px solid white;"><v-btn color="blue-grey" tile block outlined>bulk update</v-btn></th>
                  <th class="sheet-cell" style="border-top: 2px solid rgba(96, 125, 139, .1);" v-for="(day, index) in list.days" :key="index">{{ $moment(day).format('ddd') }} {{ $moment(day).format('D') }}</th>
                </tr>
              </thead>

              <tbody>

              <tr>
                <th class="sheet-header text-truncate text-capitalize">
                  <span class="font-weight-regular">Closed Out</span>
                </th>
                <td class="sheet-cell" v-for="(inventory, index) in list.sheet.inventory[room.id]" :key="index">
                  <v-btn text block tile @click="drawer=!drawer" height="24">
                    <v-icon v-if="!drawer" color="green" x-large style="line-height: 0;">mdi-toggle-switch</v-icon>
                    <v-icon v-if="drawer" color="red" x-large style="line-height: 0;">mdi-toggle-switch-off</v-icon>
                  </v-btn>
                </td>
              </tr>

                <tr>
                  <th class="sheet-header text-truncate text-capitalize font-weight-regular">Available</th>
                  <td class="sheet-cell text-center" v-for="(inventory, index) in list.sheet.inventory[room.id]" :key="index">
                    <input v-model.lazy="inventory.count" class="sheet-input"/>
                  </td>
                </tr>

                <tr>
                  <th class="sheet-header text-truncate text-capitalize font-weight-regular">Booked</th>
                  <td class="sheet-cell text-center" v-for="(inventory, index) in list.sheet.inventory[room.id]" :key="index">
                    <input v-model.lazy="inventory.booked" class="sheet-input" readonly/>
                  </td>
                </tr>


                <template v-for="(rate, index) in room.rate_plans">

                  <tr :key="index">
                    <th class="sheet-header text-truncate text-capitalize">
                      <span><v-btn icon x-small class="ml-n1 mr-1" @click="expand(rate)"><v-icon small>mdi-chevron-down</v-icon></v-btn>{{rate.name}}</span>
                    </th>
                    <td class="sheet-cell text-center" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                      <input v-model.lazy="price.price" class="sheet-input"/>
                    </td>
                  </tr>

                  <template v-if="rate.show">

                    <tr :key="'stop-sell' + index">
                      <th class="sheet-header text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Stop Sell</span>
                      </th>
                      <td class="sheet-cell" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                        <v-btn text block tile @click="drawer=!drawer" height="24">
                          <v-icon v-if="!drawer" color="red" x-large style="line-height: 0;">mdi-toggle-switch</v-icon>
                          <v-icon v-if="drawer" color="green" x-large style="line-height: 0;">mdi-toggle-switch-off</v-icon>
                        </v-btn>
                      </td>
                    </tr>

                    <tr :key="'closed-arrival-departure' + index">
                      <th class="sheet-header text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Closed Arrival/Departure</span>
                      </th>
                      <td class="sheet-cell" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                        <v-btn text tile @click="drawer=!drawer" height="24" class="sheet-switch-left">
                          <v-icon v-if="!drawer" color="green" large style="line-height: 0;">mdi-toggle-switch</v-icon>
                          <v-icon v-if="drawer" color="red" large style="line-height: 0;">mdi-toggle-switch-off</v-icon>
                        </v-btn>
                        <v-btn text tile @click="drawer=!drawer" height="24" class="sheet-switch-right">
                          <v-icon v-if="!drawer" color="green" large style="line-height: 0;">mdi-toggle-switch</v-icon>
                          <v-icon v-if="drawer" color="red" large style="line-height: 0;">mdi-toggle-switch-off</v-icon>
                        </v-btn>
                      </td>
                    </tr>

                    <tr :key="'inventory' + index">
                      <th class="sheet-header text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Min/Max Inventory</span>
                      </th>
                      <td class="sheet-cell" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                          <input v-model.lazy="price.min_inventory" class="sheet-input-left"/>
                          <input v-model.lazy="price.max_inventory" class="sheet-input-right"/>
                      </td>
                    </tr>

                    <tr :key="'stay-through' + index">
                      <th class="sheet-header text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Min/Max Stay Through</span>
                      </th>
                      <td class="sheet-cell" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                        <input v-model.lazy="price.min_stay_through" class="sheet-input-left"/>
                        <input v-model.lazy="price.max_stay_through" class="sheet-input-right"/>
                      </td>
                    </tr>

                    <tr :key="'stay' + index">
                      <th class="sheet-header text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Min/Max Stay</span>
                      </th>
                      <td class="sheet-cell" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                        <input v-model.lazy="price.min_stay" class="sheet-input-left"/>
                        <input v-model.lazy="price.max_stay" class="sheet-input-right"/>
                      </td>
                    </tr>

                    <tr :key="'min-days-advance' + index">
                      <th class="sheet-header text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Min/Max Advance Reservation</span>
                      </th>
                      <td class="sheet-cell" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                        <input v-model.lazy="price.min_days_advance" class="sheet-input-left"/>
                        <input v-model.lazy="price.max_days_advance" class="sheet-input-right"/>
                      </td>
                    </tr>

                  </template>


                </template>

              </tbody>
            </table>

          </v-card-text>

        </v-card>

      </v-container>

    </v-content>

  </v-app>
</template>

<script>
  import list from './data.js'

  export default {

    async created() {
      this.$moment.locale('ro');
      this.list = list;
      this.sheetMonths = Object.assign({}, this.getMonths(this.list.period));
    },

    methods: {
      getMonths: function (period) {
        let start = this.$moment(period.start);
        let stop = this.$moment(period.stop);

        let months = [{
          name: start.format('MMM YYYY')
        }];

        for (start.add(1, 'days'); start.diff(stop, 'days') <= 0; start.add(1, 'days')) {
          months.push({
            name: (start.format('YYYY-MM-DD') === start.clone().startOf('month').format('YYYY-MM-DD')) ? start.format('MMM YYYY') : ''
          });
        }

        return months;
      },

      scroll: function (event) {
        this.$refs['sheet-wrapper'].forEach(item => {
          if (event.target !== item) {
            item.scrollLeft = event.target.scrollLeft;
          }
        });
      },

      expand: function (rate) {
        this.$set(rate, 'show', !rate.show);
      }
    },

    data: () => ({
      list: [],
      drawer: true,
      show: false
    })
  }

</script>

<style scoped>

  .sheet-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0 !important;
  }

  .sheet {
    border-spacing: 0;
  }

  .sheet thead th {
    top: 0;
    position: -webkit-sticky;
    position: sticky;
  }

  .sheet thead th:first-child {
    left: 0;
    z-index: 1;
  }

  .sheet tbody th {
    left: 0;
    position: -webkit-sticky;
    position: sticky;
  }

  .sheet tbody th {
    left: 0;
    position: -webkit-sticky;
    position: sticky;
  }

  .sheet-date {
    position: -webkit-sticky;
    position: sticky;
    font-size: 12px;
    left: 250px;
  }

  .sheet-header {
    font-size: 12px;
    text-align: left;
    width: 250px;
    min-width: 250px;
    max-width: 250px;
    background-color: white;
    z-index: 1;
    border: 1px solid rgba(96, 125, 139, .1);
    padding-left: 8px;
  }

  .sheet-cell {
    width: 100px;
    min-width: 100px;
    max-width: 100px;
    padding: 4px;
    border: 1px solid rgba(96, 125, 139, .1);
  }

  .sheet-input {
    width: 100%;
    height: 24px;
    background-color: white;
    font-size: 12px;
    text-align: center;

    outline: 1px solid rgba(96, 125, 139, .1);
  }

  .sheet-input-left {
    width: calc(50% - 2px);
    margin-right: 2px;
    height: 24px;
    background-color: white;
    font-size: 12px;
    text-align: center;
    outline: 1px solid rgba(96, 125, 139, .1);
  }

  .sheet-input-right {
    width: calc(50% - 2px);
    margin-left: 2px;
    height: 24px;
    background-color: white;
    font-size: 12px;
    text-align: center;
    outline: 1px solid rgba(96, 125, 139, .1);
  }

  .sheet-switch-left {
    padding: 0 !important;
    margin: 0 2px 0 0 !important;
    min-width: 0 !important;
    width: calc(50% - 2px);
  }

  .sheet-switch-right {
    padding: 0 !important;
    margin: 0 0 0 2px !important;
    min-width: 0 !important;
    width: calc(50% - 2px);
  }

  .weekday {
    background-color: rgba(96, 125, 139, .05)
  }

  .weekend {
    background-color: rgba(96, 125, 139, .15)
  }

</style>