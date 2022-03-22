<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
    <form @submit.prevent="updateTutorial">
      <profile-image
        @onLoadImage="loadProfileImage"
        :onlyRead="false"
        :image="currentTutorial.image"
        />
      <div class="form-group">
        <label for="title">Name</label>
        <input type="text" class="form-control" id="title"
          v-model="currentTutorial.name"
        />
      </div>
      <div class="form-group">
        <label for="description">email</label>
        <input type="text" class="form-control" id="description"
          v-model="currentTutorial.email"
        />
      </div>
      <div class="form-group">
        <label for="description">password</label>
        <input type="text" class="form-control" id="description"
          v-model="currentTutorial.password"
        />
      </div>

       <div class="form-group">
        <label for="description">phone</label>
        <input type="text" class="form-control" id="description"
          v-model="currentTutorial.phone"
        />
      </div>  
      <button class="badge btn btn-danger"
        @click="deleteTutorial"
      >
        Delete
      </button>

      <button type="submit" class="badge btn btn-success"
      >
        Update
      </button>
    </form>



    
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";
import ProfileImage from "./ProfileImage"
export default {
  name: "tutorial",
  components: {
    "profile-image": ProfileImage,
  },
  data() {
    return {
      currentTutorial: null,
      message: ''
    };
  },
  methods: {
    loadProfileImage(base64) {
      console.log("base64", base64)
      this.currentTutorial.image = base64;
    },
    getTutorial(id) {
      UserDataService.get(id)
        .then(response => {
          this.currentTutorial = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status
      };

      UserDataService.update(this.currentTutorial.id, data)
        .then(response => {
          this.currentTutorial.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateTutorial() {
      UserDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then(response => {
          console.log(response.data);
          this.message = 'The tutorial was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteTutorial() {
      UserDataService.delete(this.currentTutorial.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getTutorial(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
