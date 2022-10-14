<template >
  <v-card>
    <v-card-title>
      <v-select
        :items="roles"
        label="filter by role"
        @change="filterForUser"
        v-model="roleFilter"
      ></v-select>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="getWizkids"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:item.picture="{ item }">
        <v-img
          id="image_round"
          :src="imageUrl + item.picture"
          max-width="50px"
          max-height="70px"
        ></v-img>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>List of Wizkids</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                New Wizkid
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.name"
                        label="Wizkid name"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.email"
                        label="Wizkid email"
                      ></v-text-field>
                      <v-text-field
                        v-model="editedItem.phone_number"
                        label="Wizkid phone"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        :items="roles"
                        label="Standard"
                        v-model="editedItem.role"
                      ></v-select>
                      <input
                        class="image-special"
                        @change="selectFile($event)"
                        placeholder="image"
                        type="file"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        <v-icon
          small
          v-if="getIsAuth && item.is_fired == 0 && getUser.id !== item.id"
          @click="fire(item)"
        >
          fire
        </v-icon>
        <v-icon
          small
          v-if="getIsAuth && item.is_fired == 1 && getUser.id !== item.id"
          @click="unfire(item)"
        >
          unfire
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { envirement } from "../../envirement";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    roleFilter: "",
    headers: [
      { text: "Picture", value: "picture" },
      {
        text: "ID",
        align: "start",
        sortable: true,
        value: "id",
      },
      { text: "Name", value: "name" },
      { text: "Role", value: "role" },
      { text: "Email", value: "email" },
      { text: "phone_number", value: "phone_number" },

      { text: "Actions", value: "actions", sortable: false },
    ],
    roles: ["developer", "designer", "boss", "intern"],
    imageUrl: envirement.imageUrl,
    wizkids: [],
    editedIndex: -1,
    itemToDelete: {},
    search: "",
    editedItem: {
      name: "",
      role: "",
      email: "",
      picture: "",
      phone_number: "",
    },
    defaultItem: {
      name: "",
      role: "",
    },
  }),

  computed: {
    ...mapGetters(["getWizkids", "getIsAuth","getUser"]),
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },
  mounted() {
    if (!this.getIsAuth) {
      this.$router.push({ path: "/" });
    }
    this.fetchWizkidsForUser();
    this.wizkids = this.getWizkids;
  },

  methods: {
    ...mapActions([
      "fire",
      "unfire",
      "fetchWizkidsForUser",
      "addWizkid",
      "editWizkid",
      "deleteWizkid",
      "filterForUser"
    ]),
    initialize() {
      this.wizkids = [];
    },
    selectFile(event) {
      this.editedItem["picture"] = event.target.files[0];
      console.log(this.editedItem[name]);
    },

    editItem(item) {
      this.editedIndex = this.getWizkids.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.wizkids.indexOf(item);
      this.itemToDelete = item;
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteWizkid(this.itemToDelete);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex < 0) this.addWizkid(this.editedItem);
      else {
        this.editWizkid(this.editedItem);
        Object.assign(this.getWizkids[this.editedIndex], this.editedItem);
      }
      this.close();
    },
  },
};
</script>

<style>
v-img {
  border-radius: 50%;
}
.image-special {
  position: relative;
  top: 12px;
}
</style>