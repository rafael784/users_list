<template>
  <div class="submit-form">
    <div v-if="!submitted">

      <profile-image
        @onLoadImage="loadProfileImage"
        :onlyRead="false"
        :image="this.user.base64"
        />

      <!-- <div class="form-group">
        <div style="display: flex;justify-content:center;">
          <input
              id="profile-img"
              style="display: none;"
              type="file"
              accept="image/*"
              @change="onFilePicked"
              ref="image_photo"
            />
          <div v-if="tutorial.base64 === null" style="border-radius: 50px;background-color: grey;height: 100px;width: 100px;border: 1px solid;">
            <button @click="loadImage" class="btn" style="width: 100%;height: 100%;border-radius: 50px;color: white;font-weight: bold;">Carregar</button>
          </div>
          <div @mouseover="showUploadButton = true" @mouseleave="showUploadButton = false" v-if="tutorial.base64 !== null" style="border-radius: 50px;position: relative;height: 100px;width: 100px;border: 1px solid;">
            <img :src="tutorial.base64" alt="Profile image" width="100" height="100" style="border-radius: 50px;border: 1px solid;">
            <div style="width: 100%;height: 100%;border-radius: 50px;position: relative;top: -100px;justify-content: center;align-items: center;" :style="{'display': showUploadButton ? 'flex' : 'none'}">
              <button @click="loadImage" class="btn" style="height: 50px;border-radius: 50px;background-color: white;border: 1px solid;color: red;font-weight: bold;">Carregar</button>
            </div>
          </div>
        </div>
      </div> -->

      <div class="form-group">
        <label for="title">name</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="user.name"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="title">email</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="user.email"
          name="title"
        />
      </div>

       <div class="form-group">
        <label for="title">password</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="user.password"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">phone</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="user.phone"
          name="description"
        />
      </div>

      <button @click="saveUser" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newUser">Add</button>
    </div>
  </div>
</template>

<script>
import UserDataService from "../services/UserDataService";
import ProfileImage from "./ProfileImage"

export default {
  name: "add-tutorial",
  components: {
    "profile-image": ProfileImage,
  },
  data() {
    return {
      user: {
        id: null,
        name: "",
        phone: "",
        image: "",
        email:"",
        base64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA5AAAALwCAIAAABurQ2dAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAfiSURBVHhe7cExAQAAAMKg9U9tDQ8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACO1QBpwQABUuT8igAAAABJRU5ErkJggg==",
      },
      submitted: false,
      showUploadButton: false,
    };
  },
  methods: {
    loadProfileImage(base64) {
      console.log("base64", base64)
      this.user.base64 = base64;
    },
    saveUser() {
      var data = {
        name: this.user.name,
        phone: this.user.phone,
        image: this.user.base64,
        email: this.user.email,
        password : this.user.password,
      };

      UserDataService.create(data)
        .then(response => {
          this.user.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newUser() {
      this.submitted = false;
      this.tutorial = {
        id: null,
        name: "",
        phone: "",
        image: "",
        email:"",
        base64: null,
      };
    },

    // loadImage() {
    //   document.querySelector("#profile-img").click();
    // },
    // onFilePicked(e) {
    //   const files = e.target.files;
    //   console.log(e)
    //   console.log(files)
    //   if (files.length <= 0) return;
    //   const fr = new FileReader();
    //   fr.readAsDataURL(files[0]);
    //   fr.addEventListener("load", () => {
    //     this.tutorial.base64 = fr.result;
    //   });
    // },
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
