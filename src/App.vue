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
                <col v-for="(day, index) in list.days" :key="index" :class="{weekday: true, weekend: ($moment(day).format('dddd') === 'Saturday' || $moment(day).format('dddd') === 'Sunday'), closed: true}"/>
              </colgroup>

              <thead>
                <tr style="background-color: white;">
                  <th></th>
                  <th class="sheet-date font-weight-medium py-1" :style="{ backgroundColor: (month.name !== '') ? 'white' : 'transparent'}" v-for="(month, index) in sheetMonths" :key="index">{{ month.name }}</th>
                </tr>
                <tr>
                  <th class="sheet-header" style="border-top: 1px solid white; border-left: 1px solid white;"/>
                  <th class="sheet-cell" v-for="(day, index) in list.days" :key="index">{{ $moment(day).format('ddd') }}<br>{{ $moment(day).format('D') }}</th>
                </tr>
              </thead>

              <tbody>

              <tr>
                <th class="sheet-header text-truncate text-capitalize">
                  <span class="font-weight-regular">Closed Out</span>
                </th>
                <td class="sheet-cell" v-for="(inventory, index) in list.sheet.inventory[room.id]" :key="index">
                  <v-btn text block tile height="30" :ripple="false" @click="drawer=!drawer" color="blue-grey">
                    <v-icon v-if="!drawer" color="green" style="font-size: 40px; line-height: 0;">mdi-toggle-switch</v-icon>
                    <v-icon v-if="drawer" color="red" style="font-size: 40px; line-height: 0;">mdi-toggle-switch-off</v-icon>
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
<!--                      <v-spacer/>-->
<!--                      <span class="font-weight-light">(Tarif: {{rate.id}})</span>-->
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
                        <v-btn text block tile @click="drawer = !drawer">
                          <v-icon>mdi-toggle-switch</v-icon>
                        </v-btn>
                      </td>
                    </tr>

                    <tr :key="'closed-arrival' + index">
                      <th class="sheet-header-top text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Closed Arrival</span>
                      </th>
                      <td class="sheet-cell-top" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                        <v-btn text block tile>
                          <v-icon>mdi-toggle-switch</v-icon>
                        </v-btn>
                      </td>
                    </tr>
                    <tr :key="'closed-departure' + index">
                      <th class="sheet-header-bottom text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Closed Departure</span>
                      </th>
                      <td class="sheet-cell-bottom" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                        <v-btn text block tile>
                          <v-icon>mdi-toggle-switch</v-icon>
                        </v-btn>
                      </td>
                    </tr>

                    <tr :key="'min-inventory' + index">
                      <th class="sheet-header-top text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Min. Inventory</span>
                      </th>
                      <td class="sheet-cell-top text-center" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                        <input v-model.lazy="price.min_inventory" class="sheet-input"/>
                      </td>
                    </tr>
                    <tr :key="'max-inventory' + index">
                      <th class="sheet-header-bottom text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Max. Inventory</span>
                      </th>
                      <td class="sheet-cell-bottom text-center" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                        <input v-model.lazy="price.max_inventory" class="sheet-input"/>
                      </td>
                    </tr>

                    <tr :key="'min-stay-through' + index">
                      <th class="sheet-header-top text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Min. Length of Stay</span>
                      </th>
                      <td class="sheet-cell-top text-center" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                        <input v-model.lazy="price.min_stay_through" class="sheet-input"/>
                      </td>
                    </tr>
                    <tr :key="'max-stay-through' + index">
                      <th class="sheet-header-bottom text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Max. Length of Stay</span>
                      </th>
                      <td class="sheet-cell-bottom text-center" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                        <input v-model.lazy="price.max_stay_through" class="sheet-input"/>
                      </td>
                    </tr>

                    <tr :key="'min-stay' + index">
                      <th class="sheet-header-top text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Min. Length of Stay from Arrival</span>
                      </th>
                      <td class="sheet-cell-top text-center" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                        <input v-model.lazy="price.min_stay" class="sheet-input"/>
                      </td>
                    </tr>
                    <tr :key="'max-stay' + index">
                      <th class="sheet-header-bottom text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Max. Length of Stay from Arrival</span>
                      </th>
                      <td class="sheet-cell-bottom text-center" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                        <input v-model.lazy="price.max_stay" class="sheet-input"/>
                      </td>
                    </tr>

                    <tr :key="'min-days-advance' + index">
                      <th class="sheet-header-top text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Min. Advance Reservation</span>
                      </th>
                      <td class="sheet-cell-top text-center" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                        <input v-model.lazy="price.min_days_advance" class="sheet-input"/>
                      </td>
                    </tr>
                    <tr :key="'max-days-advance' + index">
                      <th class="sheet-header-bottom text-truncate text-capitalize">
                        <span class="font-weight-regular"><v-icon x-small class="mr-1">mdi-help-circle-outline</v-icon> Max. Advance Reservation</span>
                      </th>
                      <td class="sheet-cell-bottom text-center" v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                        <input v-model.lazy="price.max_days_advance" class="sheet-input"/>
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

    width: 74px;
    min-width: 74px;
    max-width: 74px;
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

    border: 1px solid rgba(0, 0, 0, .075);

    padding: 4px 8px;
  }

  .sheet-header-top {
    width: 250px;
    min-width: 250px;
    max-width: 250px;
    background-color: white;
    font-size: 12px;
    text-align: left;

    z-index: 1;

    border-top: 1px solid rgba(0, 0, 0, .075);
    border-left: 1px solid rgba(0, 0, 0, .075);
    border-right: 1px solid rgba(0, 0, 0, .075);

    padding-right: 8px;
    padding-left: 8px;
    padding-top: 8px;
  }

  .sheet-header-bottom {
    width: 250px;
    min-width: 250px;
    max-width: 250px;
    background-color: white;
    font-size: 12px;
    text-align: left;

    z-index: 1;

    border-left: 1px solid rgba(0, 0, 0, .075);
    border-right: 1px solid rgba(0, 0, 0, .075);
    border-bottom: 1px solid rgba(0, 0, 0, .075);

    padding-right: 8px;
    padding-left: 8px;
    padding-bottom: 8px;
  }

  .sheet-cell {
    border: 1px solid rgba(0, 0, 0, .075);
  }

  .sheet-cell-top {
    border-top: 1px solid rgba(0, 0, 0, .075);
    border-right: 1px solid rgba(0, 0, 0, .075);
    border-left: 1px solid rgba(0, 0, 0, .075);
  }

  .sheet-cell-bottom {
    border-right: 1px solid rgba(0, 0, 0, .075);
    border-left: 1px solid rgba(0, 0, 0, .075);
    border-bottom: 1px solid rgba(0, 0, 0, .075);
  }

  .sheet-input {
    width: 66px;
    height: 24px;
    background-color: white;
    font-size: 12px;
    text-align: center;
    outline: 1px solid rgba(0, 0, 0, .075);
  }

  .sheet-switch {
    padding: 0;
    margin: 2px 0 0 16px;
  }

  .weekday {
    background-color: rgba(0, 0, 0, .075)
  }

  .weekend {
    background-color: rgba(0, 0, 0, .125)
  }

  .closed {

  }

</style>