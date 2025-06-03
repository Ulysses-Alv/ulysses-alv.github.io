<template>
  <div>
    <h1>Resume</h1>

    <div class="paragraph">
      Hi! I'm <strong>Ulises</strong> I'm 20 Years Old. 
      <br>I'm a Self-Taught Game Developer with experience in Unity but I'm open to other technologies.
      <br>I started my journey when I was 12 years old with programming block codes. Since then, I've been learning new techs, good practices and of course developing some projects.
    
    <div style="margin-top:20px; margin-bottom:20px;">
      <a class="download-link" href="https://drive.google.com/file/d/11Vp4T1JZD4qVXn0KDvbypGlwhJlm_Y_4/view?usp=sharing" target="_blank">
        <i class="fa fa-download fa-lg fa-fw"></i> Download as PDF</a>
      <div style="clear:both"></div>
    </div>
  </div>
    <div class="photo">
      <img :src="`img/1694482121256.jpeg`" alt="Here's should be my photo" class="avatar" /> 
    </div>
  </div>
    
    <div style="clear:both"></div>

    <div class="full-content">
      <h2>Work experience</h2>

      <h3>Studio Soup,  VR Game Developer</h3>
      <h4>01/2024 - PRESENT</h4>

      <div>Game Developer on XR/VR/MR games.</div>

      <div class="tech-stack">VR, MR, XR, Unity, C#, Git</div>
      

      <h3>F.a.R Team, Game Developer</h3>
      <h4>11/2022 - 01/2024</h4>

      <div>Game Programmer at F.a.R Team.</div>

      <div class="tech-stack">Unity, C#, Trello, Git</div>

      <h2>Skills</h2>

      <div class="skill-set">
        <ul>
          <li>Unity</li>
          <li>C#</li>
          <li>Python</li>
          <li>OpenXR</li>
        </ul>
      </div>

      <div style="clear:both" />

      <h2>Education</h2>

      <h3>Universidad Nacional de Quilmes</h3>
      <h4>Bachelor's degree <em>(in progress)</em></h4>

      <h2>Languages</h2>

      <h3>Spanish</h3>
      <div>Native.</div>

      <h3>English</h3>
      <div>Professional Proficiency.</div>
     
      </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import SkillRate from "@/components/SkillRate.vue";


export default defineComponent({
  name: "Resume",
  components: {
    SkillRate,
  },
});
</script>

<style scoped>
  .avatar {
    width: 150px; /* Puedes ajustar el tamaño según lo necesites */
    height: 150px; /* Asegúrate de que el alto sea igual al ancho para mantenerla circular */
    border-radius: 50%; /* Esto hace que la imagen sea redonda */
    object-fit: cover; /* Asegura que la imagen se recorte de manera adecuada dentro del contenedor redondo */
  }
h2 {
  font-weight: 100;
  font-size: 2em;
  margin: 0px;
  padding: 0px;
  padding-top: 50px;
  font-weight: bold;
}
h3 {
  font-weight: 100;
  font-size: 1.6em;
  margin: 0px;
  padding: 0px;
  padding-top: 30px;
}
h4 {
  font-weight: 100;
  font-size: 1.3em;
  margin: 0px;
  padding: 0px;
  padding-top: 15px;
  font-style: italic;
}

.paragraph {
  max-width: 700px;
}

.download-link {
  float:left;
  margin-right: 50px;
}

.full-content div {
  max-width: 800px;
}

.skill-set h3 {
  padding-bottom: 10px;
}

.photo img {
  height: 300px;
  width: 300px;
}

.tech-stack {
  font-style: italic;
}

.photo {
  margin-top: 50px;
  text-align: center;
}

@media only screen and (min-width: 620px){
  .paragraph {
    float: left;
  }

  .photo {
    float: left;
    padding: 30px;
    padding-left: 80px;
  }

  .skill-set {
    float: left;
    padding-right: 60px; 
  }
}
</style>