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
      <div class="sheet-wrapper">
        <div class="sheet">

          <table>
            <thead>
            <tr>
              <th></th>
              <th v-for="(day, index) in list.days" :key="index">{{day}}</th>
            </tr>
            </thead>
            <tbody>

            <template v-for="(room, index) in list.room_types">

              <tr :key="index">
                <th>{{room.name}}</th>
                <td v-for="(inventory, index) in list.sheet.inventory[room.id]" :key="index">
                  <input v-model.lazy="inventory.count"/>
                  <input v-model.lazy="inventory.booked"/>
                </td>
              </tr>
              <template v-for="(rate, index) in room.rate_plans">
                <tr :key="index">
                  <th>{{rate.name}}</th>
                  <td v-for="(price, index) in list.sheet.pricing[room.id][rate.id]" :key="index">
                    <input v-model.lazy="price.price"/>
                    <input v-model.lazy="price.min_stay"/>
                    <input v-model.lazy="price.max_stay"/>
                  </td>
                </tr>
              </template>
            </template>


            </tbody>
          </table>
        </div>
      </div>
    </v-content>

  </v-app>
</template>

<script>

  export default {

    async created() {
      this.list = {
        "period": {"start": "2019-12-01", "stop": "2019-12-31", "walk": {"prev": {"date_start": "2019-10-31", "date_stop": "2019-11-30", "_date_start": "31\\/10\\/2019", "_date_stop": "30\\/11\\/2019"}, "next": {"date_start": "2020-01-01", "date_stop": "2020-01-31", "_date_start": "01\\/01\\/2020", "_date_stop": "31\\/01\\/2020"}}},
        "days": ["2019-12-01", "2019-12-02", "2019-12-03", "2019-12-04", "2019-12-05", "2019-12-06", "2019-12-07", "2019-12-08", "2019-12-09", "2019-12-10", "2019-12-11", "2019-12-12", "2019-12-13", "2019-12-14", "2019-12-15", "2019-12-16", "2019-12-17", "2019-12-18", "2019-12-19", "2019-12-20", "2019-12-21", "2019-12-22", "2019-12-23", "2019-12-24", "2019-12-25", "2019-12-26", "2019-12-27", "2019-12-28", "2019-12-29", "2019-12-30", "2019-12-31"],
        "room_types": [{
          "id": 3878,
          "hotel_id": 1327,
          "room_type_standard_id": 0,
          "name": "Camera Dubla Standard",
          "description": "Camera are 1 pat de cel pu\u021bin 160 cm l\u0103\u021bime pentru dou\u0103 persoane",
          "standard": "double",
          "slug": "standard-double",
          "close_out": false,
          "price": null,
          "count": null,
          "config": {"area": null, "occupancy": 2, "extra_beds": 1, "facilities": {"15": {"id": 15, "price": null}, "24": {"id": 24, "price": null}, "62": {"id": 62, "price": null}, "65": {"id": 65, "price": null}, "69": {"id": 69, "price": null}, "70": {"id": 70, "price": null}, "89": {"id": 89, "price": null}, "110": {"id": 110, "price": null}}, "single_stay": 0, "small_child_in_bed": 0},
          "created_at": "2019-10-29 11:27:40",
          "updated_at": "2019-10-30 10:03:45",
          "deleted_at": null,
          "rate_plans": [{
            "id": 2097,
            "name": "mic dejun rambursabil",
            "description": null,
            "component_based": false,
            "hotel_id": 1327,
            "parent_id": null,
            "meal_type_id": 0,
            "meal_type": "breakfast",
            "cancellation_policy_id": 2563,
            "stop_sell": false,
            "sort": null,
            "net_prices": false,
            "pos": null,
            "currency": null,
            "config": {"date": {"stop": null, "start": null}, "rule": {"type": 0, "value": null, "operation": 0}, "formula": {"type": "percent", "value": 0, "operation": "add"}, "max_stay": null, "min_stay": null, "weekdays": [], "book_before": null, "cancellation_allowed": false},
            "created_at": "2019-10-29 11:27:40",
            "updated_at": "2019-10-30 09:59:35",
            "deleted_at": null,
            "pivot": {"room_type_id": 3878, "rate_plan_id": 2097, "modified": 0, "price": null}
          }, {
            "id": 2098,
            "name": "Pachet Craciun\\/demipensiune+Cina Festiva",
            "description": null,
            "component_based": false,
            "hotel_id": 1327,
            "parent_id": null,
            "meal_type_id": 0,
            "meal_type": "breakfast_dinner",
            "cancellation_policy_id": 2564,
            "stop_sell": false,
            "sort": null,
            "net_prices": false,
            "pos": null,
            "currency": null,
            "config": {"date": {"stop": null, "start": null}, "rule": {"type": 0, "value": null, "operation": 0}, "formula": {"type": "percent", "value": 0, "operation": "add"}, "max_stay": null, "min_stay": null, "weekdays": [], "book_before": null, "cancellation_allowed": false},
            "created_at": "2019-11-01 07:48:04",
            "updated_at": "2019-11-01 08:08:55",
            "deleted_at": null,
            "pivot": {"room_type_id": 3878, "rate_plan_id": 2098, "modified": 0, "price": null}
          }, {
            "id": 2099,
            "name": "Pachet Revelion 2020\\/ demipensiune+Cina Revelion",
            "description": null,
            "component_based": false,
            "hotel_id": 1327,
            "parent_id": null,
            "meal_type_id": 0,
            "meal_type": "breakfast_dinner",
            "cancellation_policy_id": 2564,
            "stop_sell": false,
            "sort": null,
            "net_prices": false,
            "pos": null,
            "currency": null,
            "config": {"date": {"stop": null, "start": null}, "rule": {"type": 0, "value": null, "operation": 0}, "formula": {"type": "percent", "value": 0, "operation": "add"}, "max_stay": null, "min_stay": null, "weekdays": [], "book_before": null, "cancellation_allowed": false},
            "created_at": "2019-11-01 07:48:50",
            "updated_at": "2019-11-01 07:48:50",
            "deleted_at": null,
            "pivot": {"room_type_id": 3878, "rate_plan_id": 2099, "modified": 0, "price": null}
          }, {
            "id": 2100,
            "name": "Pachet 1 Decembrie\\/ demipensiune",
            "description": null,
            "component_based": false,
            "hotel_id": 1327,
            "parent_id": null,
            "meal_type_id": 0,
            "meal_type": "breakfast_dinner",
            "cancellation_policy_id": 2564,
            "stop_sell": false,
            "sort": null,
            "net_prices": false,
            "pos": null,
            "currency": null,
            "config": {"date": {"stop": null, "start": null}, "rule": {"type": 0, "value": null, "operation": 0}, "formula": {"type": "percent", "value": 0, "operation": "add"}, "max_stay": null, "min_stay": null, "weekdays": [], "book_before": null, "cancellation_allowed": false},
            "created_at": "2019-11-01 08:03:20",
            "updated_at": "2019-11-01 08:03:20",
            "deleted_at": null,
            "pivot": {"room_type_id": 3878, "rate_plan_id": 2100, "modified": 0, "price": null}
          }]
        }, {
          "id": 3879,
          "hotel_id": 1327,
          "room_type_standard_id": 0,
          "name": "Camera Dubla Deluxe",
          "description": "Camera are 1 pat de cel pu\u021bin 160 cm l\u0103\u021bime pentru dou\u0103 persoane",
          "standard": "double",
          "slug": "deluxe-double",
          "close_out": false,
          "price": null,
          "count": null,
          "config": {"area": null, "occupancy": 2, "extra_beds": 1, "facilities": {"15": {"id": 15, "price": null}, "24": {"id": 24, "price": null}, "62": {"id": 62, "price": null}, "65": {"id": 65, "price": null}, "69": {"id": 69, "price": null}, "70": {"id": 70, "price": null}, "71": {"id": 71, "price": null}, "89": {"id": 89, "price": null}, "110": {"id": 110, "price": null}}, "single_stay": 0, "small_child_in_bed": 0},
          "created_at": "2019-10-29 14:55:17",
          "updated_at": "2019-10-30 10:03:57",
          "deleted_at": null,
          "rate_plans": [{
            "id": 2097,
            "name": "mic dejun rambursabil",
            "description": null,
            "component_based": false,
            "hotel_id": 1327,
            "parent_id": null,
            "meal_type_id": 0,
            "meal_type": "breakfast",
            "cancellation_policy_id": 2563,
            "stop_sell": false,
            "sort": null,
            "net_prices": false,
            "pos": null,
            "currency": null,
            "config": {"date": {"stop": null, "start": null}, "rule": {"type": 0, "value": null, "operation": 0}, "formula": {"type": "percent", "value": 0, "operation": "add"}, "max_stay": null, "min_stay": null, "weekdays": [], "book_before": null, "cancellation_allowed": false},
            "created_at": "2019-10-29 11:27:40",
            "updated_at": "2019-10-30 09:59:35",
            "deleted_at": null,
            "pivot": {"room_type_id": 3879, "rate_plan_id": 2097, "modified": 0, "price": null}
          }, {
            "id": 2098,
            "name": "Pachet Craciun\\/demipensiune+Cina Festiva",
            "description": null,
            "component_based": false,
            "hotel_id": 1327,
            "parent_id": null,
            "meal_type_id": 0,
            "meal_type": "breakfast_dinner",
            "cancellation_policy_id": 2564,
            "stop_sell": false,
            "sort": null,
            "net_prices": false,
            "pos": null,
            "currency": null,
            "config": {"date": {"stop": null, "start": null}, "rule": {"type": 0, "value": null, "operation": 0}, "formula": {"type": "percent", "value": 0, "operation": "add"}, "max_stay": null, "min_stay": null, "weekdays": [], "book_before": null, "cancellation_allowed": false},
            "created_at": "2019-11-01 07:48:04",
            "updated_at": "2019-11-01 08:08:55",
            "deleted_at": null,
            "pivot": {"room_type_id": 3879, "rate_plan_id": 2098, "modified": 0, "price": null}
          }, {
            "id": 2099,
            "name": "Pachet Revelion 2020\\/ demipensiune+Cina Revelion",
            "description": null,
            "component_based": false,
            "hotel_id": 1327,
            "parent_id": null,
            "meal_type_id": 0,
            "meal_type": "breakfast_dinner",
            "cancellation_policy_id": 2564,
            "stop_sell": false,
            "sort": null,
            "net_prices": false,
            "pos": null,
            "currency": null,
            "config": {"date": {"stop": null, "start": null}, "rule": {"type": 0, "value": null, "operation": 0}, "formula": {"type": "percent", "value": 0, "operation": "add"}, "max_stay": null, "min_stay": null, "weekdays": [], "book_before": null, "cancellation_allowed": false},
            "created_at": "2019-11-01 07:48:50",
            "updated_at": "2019-11-01 07:48:50",
            "deleted_at": null,
            "pivot": {"room_type_id": 3879, "rate_plan_id": 2099, "modified": 0, "price": null}
          }, {
            "id": 2100,
            "name": "Pachet 1 Decembrie\\/ demipensiune",
            "description": null,
            "component_based": false,
            "hotel_id": 1327,
            "parent_id": null,
            "meal_type_id": 0,
            "meal_type": "breakfast_dinner",
            "cancellation_policy_id": 2564,
            "stop_sell": false,
            "sort": null,
            "net_prices": false,
            "pos": null,
            "currency": null,
            "config": {"date": {"stop": null, "start": null}, "rule": {"type": 0, "value": null, "operation": 0}, "formula": {"type": "percent", "value": 0, "operation": "add"}, "max_stay": null, "min_stay": null, "weekdays": [], "book_before": null, "cancellation_allowed": false},
            "created_at": "2019-11-01 08:03:20",
            "updated_at": "2019-11-01 08:03:20",
            "deleted_at": null,
            "pivot": {"room_type_id": 3879, "rate_plan_id": 2100, "modified": 0, "price": null}
          }]
        }, {
          "id": 3880,
          "hotel_id": 1327,
          "room_type_standard_id": 0,
          "name": "Apartament Deluxe",
          "description": "Are un dormitor, un living \u0219i o buc\u0103t\u0103rie",
          "standard": "apartment",
          "slug": "deluxe-apartment",
          "close_out": false,
          "price": null,
          "count": null,
          "config": {
            "area": null,
            "occupancy": "4",
            "extra_beds": 0,
            "facilities": {"15": {"id": 15, "price": null}, "24": {"id": 24, "price": null}, "25": {"id": 25, "price": null}, "60": {"id": 60, "price": null}, "62": {"id": 62, "price": null}, "63": {"id": 63, "price": null}, "65": {"id": 65, "price": null}, "70": {"id": 70, "price": null}, "71": {"id": 71, "price": null}, "89": {"id": 89, "price": null}, "110": {"id": 110, "price": null}},
            "single_stay": 0,
            "small_child_in_bed": 0
          },
          "created_at": "2019-10-29 14:56:15",
          "updated_at": "2019-10-30 12:08:40",
          "deleted_at": null,
          "rate_plans": [{
            "id": 2097,
            "name": "mic dejun rambursabil",
            "description": null,
            "component_based": false,
            "hotel_id": 1327,
            "parent_id": null,
            "meal_type_id": 0,
            "meal_type": "breakfast",
            "cancellation_policy_id": 2563,
            "stop_sell": false,
            "sort": null,
            "net_prices": false,
            "pos": null,
            "currency": null,
            "config": {"date": {"stop": null, "start": null}, "rule": {"type": 0, "value": null, "operation": 0}, "formula": {"type": "percent", "value": 0, "operation": "add"}, "max_stay": null, "min_stay": null, "weekdays": [], "book_before": null, "cancellation_allowed": false},
            "created_at": "2019-10-29 11:27:40",
            "updated_at": "2019-10-30 09:59:35",
            "deleted_at": null,
            "pivot": {"room_type_id": 3880, "rate_plan_id": 2097, "modified": 0, "price": null}
          }, {
            "id": 2098,
            "name": "Pachet Craciun\\/demipensiune+Cina Festiva",
            "description": null,
            "component_based": false,
            "hotel_id": 1327,
            "parent_id": null,
            "meal_type_id": 0,
            "meal_type": "breakfast_dinner",
            "cancellation_policy_id": 2564,
            "stop_sell": false,
            "sort": null,
            "net_prices": false,
            "pos": null,
            "currency": null,
            "config": {"date": {"stop": null, "start": null}, "rule": {"type": 0, "value": null, "operation": 0}, "formula": {"type": "percent", "value": 0, "operation": "add"}, "max_stay": null, "min_stay": null, "weekdays": [], "book_before": null, "cancellation_allowed": false},
            "created_at": "2019-11-01 07:48:04",
            "updated_at": "2019-11-01 08:08:55",
            "deleted_at": null,
            "pivot": {"room_type_id": 3880, "rate_plan_id": 2098, "modified": 0, "price": null}
          }, {
            "id": 2099,
            "name": "Pachet Revelion 2020\\/ demipensiune+Cina Revelion",
            "description": null,
            "component_based": false,
            "hotel_id": 1327,
            "parent_id": null,
            "meal_type_id": 0,
            "meal_type": "breakfast_dinner",
            "cancellation_policy_id": 2564,
            "stop_sell": false,
            "sort": null,
            "net_prices": false,
            "pos": null,
            "currency": null,
            "config": {"date": {"stop": null, "start": null}, "rule": {"type": 0, "value": null, "operation": 0}, "formula": {"type": "percent", "value": 0, "operation": "add"}, "max_stay": null, "min_stay": null, "weekdays": [], "book_before": null, "cancellation_allowed": false},
            "created_at": "2019-11-01 07:48:50",
            "updated_at": "2019-11-01 07:48:50",
            "deleted_at": null,
            "pivot": {"room_type_id": 3880, "rate_plan_id": 2099, "modified": 0, "price": null}
          }, {
            "id": 2100,
            "name": "Pachet 1 Decembrie\\/ demipensiune",
            "description": null,
            "component_based": false,
            "hotel_id": 1327,
            "parent_id": null,
            "meal_type_id": 0,
            "meal_type": "breakfast_dinner",
            "cancellation_policy_id": 2564,
            "stop_sell": false,
            "sort": null,
            "net_prices": false,
            "pos": null,
            "currency": null,
            "config": {"date": {"stop": null, "start": null}, "rule": {"type": 0, "value": null, "operation": 0}, "formula": {"type": "percent", "value": 0, "operation": "add"}, "max_stay": null, "min_stay": null, "weekdays": [], "book_before": null, "cancellation_allowed": false},
            "created_at": "2019-11-01 08:03:20",
            "updated_at": "2019-11-01 08:03:20",
            "deleted_at": null,
            "pivot": {"room_type_id": 3880, "rate_plan_id": 2100, "modified": 0, "price": null}
          }]
        }],
        "sheet": {
          "inventory": {
            "3878": {
              "2019-12-01": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-01", "close_out": false},
              "2019-12-02": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-02", "close_out": false},
              "2019-12-03": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-03", "close_out": false},
              "2019-12-04": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-04", "close_out": false},
              "2019-12-05": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-05", "close_out": false},
              "2019-12-06": {"hotel_id": 1327, "room_type_id": 3878, "count": 3, "booked": 1, "date": "2019-12-06", "close_out": false},
              "2019-12-07": {"hotel_id": 1327, "room_type_id": 3878, "count": 3, "booked": 1, "date": "2019-12-07", "close_out": false},
              "2019-12-08": {"hotel_id": 1327, "room_type_id": 3878, "count": 3, "booked": 1, "date": "2019-12-08", "close_out": false},
              "2019-12-09": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-09", "close_out": false},
              "2019-12-10": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-10", "close_out": false},
              "2019-12-11": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-11", "close_out": false},
              "2019-12-12": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-12", "close_out": false},
              "2019-12-13": {"hotel_id": 1327, "room_type_id": 3878, "count": 0, "booked": 4, "date": "2019-12-13", "close_out": false},
              "2019-12-14": {"hotel_id": 1327, "room_type_id": 3878, "count": 0, "booked": 4, "date": "2019-12-14", "close_out": false},
              "2019-12-15": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-15", "close_out": false},
              "2019-12-16": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-16", "close_out": false},
              "2019-12-17": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-17", "close_out": false},
              "2019-12-18": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-18", "close_out": false},
              "2019-12-19": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-19", "close_out": false},
              "2019-12-20": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-20", "close_out": false},
              "2019-12-21": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-21", "close_out": false},
              "2019-12-22": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-22", "close_out": false},
              "2019-12-23": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-23", "close_out": false},
              "2019-12-24": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-24", "close_out": false},
              "2019-12-25": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-25", "close_out": false},
              "2019-12-26": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-26", "close_out": false},
              "2019-12-27": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-27", "close_out": false},
              "2019-12-28": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-28", "close_out": false},
              "2019-12-29": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-29", "close_out": false},
              "2019-12-30": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-30", "close_out": false},
              "2019-12-31": {"hotel_id": 1327, "room_type_id": 3878, "count": 4, "booked": 0, "date": "2019-12-31", "close_out": false}
            }, "3879": {
              "2019-12-01": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-01", "close_out": false},
              "2019-12-02": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-02", "close_out": false},
              "2019-12-03": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-03", "close_out": false},
              "2019-12-04": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-04", "close_out": false},
              "2019-12-05": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-05", "close_out": false},
              "2019-12-06": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-06", "close_out": false},
              "2019-12-07": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-07", "close_out": false},
              "2019-12-08": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-08", "close_out": false},
              "2019-12-09": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-09", "close_out": false},
              "2019-12-10": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-10", "close_out": false},
              "2019-12-11": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-11", "close_out": false},
              "2019-12-12": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-12", "close_out": false},
              "2019-12-13": {"hotel_id": 1327, "room_type_id": 3879, "count": 3, "booked": 1, "date": "2019-12-13", "close_out": false},
              "2019-12-14": {"hotel_id": 1327, "room_type_id": 3879, "count": 3, "booked": 1, "date": "2019-12-14", "close_out": false},
              "2019-12-15": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-15", "close_out": false},
              "2019-12-16": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-16", "close_out": false},
              "2019-12-17": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-17", "close_out": false},
              "2019-12-18": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-18", "close_out": false},
              "2019-12-19": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-19", "close_out": false},
              "2019-12-20": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-20", "close_out": false},
              "2019-12-21": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-21", "close_out": false},
              "2019-12-22": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-22", "close_out": false},
              "2019-12-23": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-23", "close_out": false},
              "2019-12-24": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-24", "close_out": false},
              "2019-12-25": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-25", "close_out": false},
              "2019-12-26": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-26", "close_out": false},
              "2019-12-27": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-27", "close_out": false},
              "2019-12-28": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-28", "close_out": false},
              "2019-12-29": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-29", "close_out": false},
              "2019-12-30": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-30", "close_out": false},
              "2019-12-31": {"hotel_id": 1327, "room_type_id": 3879, "count": 4, "booked": 0, "date": "2019-12-31", "close_out": false}
            }
          }, "pricing": {
            "3878": {
              "2097": {
                "2019-12-02": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-02", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-03": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-03", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-04": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-04", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-05": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-05", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-06": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-06", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-07": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-07", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-08": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-08", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-09": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-09", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-10": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-10", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-11": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-11", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-12": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-12", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-13": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-13", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-14": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-14", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-15": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-15", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-16": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-16", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-17": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-17", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-18": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-18", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-19": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-19", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-20": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-20", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-21": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-21", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-22": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-22", "stop_sell": false, "price": "330.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-27": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-27", "stop_sell": null, "price": "0.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-28": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2097, "date": "2019-12-28", "stop_sell": null, "price": "0.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null}
              }, "2098": {
                "2019-12-23": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2098, "date": "2019-12-23", "stop_sell": false, "price": "995.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-24": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2098, "date": "2019-12-24", "stop_sell": false, "price": "995.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-25": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2098, "date": "2019-12-25", "stop_sell": false, "price": "995.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-26": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2098, "date": "2019-12-26", "stop_sell": false, "price": "995.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null}
              }, "2099": {
                "2019-12-29": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2099, "date": "2019-12-29", "stop_sell": false, "price": "1520.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-30": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2099, "date": "2019-12-30", "stop_sell": false, "price": "1520.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-31": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2099, "date": "2019-12-31", "stop_sell": false, "price": "1520.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null}
              }, "2100": {"2019-12-01": {"hotel_id": 1327, "room_type_id": 3878, "rate_plan_id": 2100, "date": "2019-12-01", "stop_sell": false, "price": "630.00", "price_single": "0.00", "min_stay": 3, "max_stay": 3, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null}}
            }, "3879": {
              "2097": {
                "2019-12-02": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-02", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-03": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-03", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-04": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-04", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-05": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-05", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-06": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-06", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-07": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-07", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-08": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-08", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-09": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-09", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-10": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-10", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-11": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-11", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-12": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-12", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-13": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-13", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-14": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-14", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-15": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-15", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-16": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-16", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-17": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-17", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-18": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-18", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-19": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-19", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-20": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-20", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-21": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-21", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-22": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-22", "stop_sell": false, "price": "360.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-27": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-27", "stop_sell": null, "price": "0.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-28": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2097, "date": "2019-12-28", "stop_sell": null, "price": "0.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null}
              }, "2098": {
                "2019-12-23": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2098, "date": "2019-12-23", "stop_sell": false, "price": "1066.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-24": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2098, "date": "2019-12-24", "stop_sell": false, "price": "1066.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-25": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2098, "date": "2019-12-25", "stop_sell": false, "price": "1066.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-26": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2098, "date": "2019-12-26", "stop_sell": false, "price": "1066.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null}
              }, "2099": {
                "2019-12-29": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2099, "date": "2019-12-29", "stop_sell": false, "price": "1639.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-30": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2099, "date": "2019-12-30", "stop_sell": false, "price": "1639.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-31": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2099, "date": "2019-12-31", "stop_sell": false, "price": "1639.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null}
              }, "2100": {"2019-12-01": {"hotel_id": 1327, "room_type_id": 3879, "rate_plan_id": 2100, "date": "2019-12-01", "stop_sell": false, "price": "694.00", "price_single": "0.00", "min_stay": 3, "max_stay": 3, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null}}
            }, "3880": {
              "2097": {
                "2019-12-02": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-02", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-03": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-03", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-04": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-04", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-05": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-05", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-06": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-06", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-07": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-07", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-08": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-08", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-09": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-09", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-10": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-10", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-11": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-11", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-12": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-12", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-13": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-13", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-14": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-14", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-15": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-15", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-16": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-16", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-17": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-17", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-18": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-18", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-19": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-19", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-20": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-20", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-21": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-21", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-22": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-22", "stop_sell": false, "price": "600.00", "price_single": "0.00", "min_stay": null, "max_stay": null, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-27": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-27", "stop_sell": null, "price": "0.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-28": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2097, "date": "2019-12-28", "stop_sell": null, "price": "0.00", "price_single": "0.00", "min_stay": 2, "max_stay": null, "closed_arrival": 0, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null}
              }, "2098": {
                "2019-12-23": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2098, "date": "2019-12-23", "stop_sell": false, "price": "1304.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-24": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2098, "date": "2019-12-24", "stop_sell": false, "price": "1304.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-25": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2098, "date": "2019-12-25", "stop_sell": false, "price": "1304.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-26": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2098, "date": "2019-12-26", "stop_sell": false, "price": "1304.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null}
              }, "2099": {
                "2019-12-29": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2099, "date": "2019-12-29", "stop_sell": false, "price": "1876.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-30": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2099, "date": "2019-12-30", "stop_sell": false, "price": "1876.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null},
                "2019-12-31": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2099, "date": "2019-12-31", "stop_sell": false, "price": "1876.00", "price_single": "0.00", "min_stay": 4, "max_stay": 4, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null}
              }, "2100": {"2019-12-01": {"hotel_id": 1327, "room_type_id": 3880, "rate_plan_id": 2100, "date": "2019-12-01", "stop_sell": false, "price": "947.00", "price_single": "0.00", "min_stay": 3, "max_stay": 3, "closed_arrival": null, "closed_departure": null, "min_stay_through": null, "max_stay_through": null, "min_days_advance": null, "max_days_advance": null, "min_inventory": null, "max_inventory": null}}
            }
          }
        }
      }
    },

    data: () => ({
      list: [],
      drawer: null,
      show: false
    }),
  };

</script>

<style scoped>

  .sheet-wrapper {
    overflow: auto;
    height: calc(100vh - 64px);
  }

  .sheet table {
    position: relative;
    border-collapse: collapse;
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
</style>