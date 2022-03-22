<template>
    <div class="form-group">
    <div style="display: flex;justify-content:center;">
        <input
            id="profile-img"
            style="display: none;"
            type="file"
            accept="image/*"
            @change="onFilePicked"
            ref="image_photo"
        />
        <div 
            v-if="base64 === null && !onlyRead" 
            style="border-radius: 50px;background-color: grey;height: 100px;width: 100px;border: 1px solid;"
        >
            <button 
                @click="loadImage" 
                class="btn" 
                style="width: 100%;height: 100%;border-radius: 50px;color: white;font-weight: bold;"
            >Carregar</button>
        </div>
        <div 
            @mouseover="showUploadButton = true" 
            @mouseleave="showUploadButton = false" 
            v-if="base64 !== null && !onlyRead" 
            style="border-radius: 50px;position: relative;height: 100px;width: 100px;border: 1px solid;"
        >
            <img :src="base64" alt="Profile image" width="100" height="100" style="border-radius: 50px;border: 1px solid;">
            <div style="width: 100%;height: 100%;border-radius: 50px;position: relative;top: -100px;justify-content: center;align-items: center;" :style="{'display': showUploadButton ? 'flex' : 'none'}">
                <button 
                    @click="loadImage" 
                    class="btn" 
                    style="height: 50px;border-radius: 50px;background-color: white;border: 1px solid;color: red;font-weight: bold;"
                >Carregar</button>
            </div>
        </div>
        <div 
            v-if="onlyRead" 
            style="border-radius: 50px;position: relative;height: 100px;width: 100px;border: 1px solid;"
        >
            <img :src="base64" alt="Profile image" width="100" height="100" style="border-radius: 50px;border: 1px solid;"/>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    props: {
        onlyRead: {
            type: Boolean,
            default: true,
        },
        image: {
            type: String,
            default: null,
        },
    },
  data() {
    return {
        base64: null,
        showUploadButton: false,
    };
  },
  created() {
    if (this.image) {
        this.base64 = this.image
    }
  },
  methods: {
    loadImage() {
        console.log("teste......")
        document.querySelector("#profile-img").click();
    },
    onFilePicked(e) {
      const files = e.target.files;
      console.log(e)
      console.log(files)
      if (files.length <= 0) return;
      const fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.addEventListener("load", () => {
        this.base64 = fr.result;
        this.$emit('onLoadImage', this.base64)
      });
    },
  },
  watch: {
      image(newValue, oldValue) {
          if (newValue && newValue !== oldValue) {
              this.base64 = newValue
          }
      },
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
