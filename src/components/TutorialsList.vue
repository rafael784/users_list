<template>
  <div class="list row">
    
    <div class="col-md-6">
      <h4>User list</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.name }}
        </li>
      </ul>

    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Users</h4>
        <profile-image
          :onlyRead="true"
          :image="this.currentTutorial === null ? null : this.currentTutorial.image"
          />
        <div>
          <label><strong>name:</strong></label> {{ currentTutorial.name }}
        </div>
        <br>
        <div>
          <label><strong>phone:</strong></label> {{ currentTutorial.phone }}
        </div>
        <br>

         <div>
          <label><strong>email:</strong></label> {{ currentTutorial.email }}
        </div>
        <br>

         <div>
          <label><strong>password:</strong></label> {{ currentTutorial.password }}
        </div>
        


    

        <br>
        <div>

        <router-link class="m-3 btn btn-success" :to="'/tutorials/' + currentTutorial.id" >Edit</router-link>
       
        </div>
        
      </div>
      <div v-else>
        <br />
        <p>Please click on a Tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script src="https://unpkg.com/vue"></script>


<script>
import UserDataService from "../services/UserDataService";
import VueBase64FileUpload from 'vue-base64-file-upload';
import ProfileImage from "./ProfileImage"

export default {
  name: "tutorials-list",
  components: {
    "profile-image": ProfileImage,
  },
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
     
    };
  },
  methods: {
    retrieveTutorials() {
      UserDataService.getAll()
        .then(response => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    hadleImage(e){
      const selectedImage = e.target.files[0];
      this.createBase64Image(selectedImage);
    },

    createBase64Image(fileObject){
      const reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
        
      };
      
      reader.readAsBinaryString(fileObject);
    },
    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveTutorial(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = index;
    },

   
  },
  mounted() {
    this.retrieveTutorials();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.img {
  width: 17rem;
}

</style>
