<template>
    <h1>Holaa!</h1>
    <div class="about-container">

        <div class="paragraph">
            <div>
                I'm <strong>Ulises Alvarenga</strong>, a <strong>VR and Unity</strong> Game Developer focused on
                crafting
                immersive experiences and innovative gameplay.<br><br>
                <strong>Let’s build something together!</strong>
            </div>
        </div>

        <div class="photo">
            <img :src='`img/1694482121256.jpeg`' alt="Here's should be my photo" class="avatar" />
        </div>

        <div style="clear:both"></div>

    </div>
</template>

<style scoped>
.about-container {
    margin-bottom: 80px;
    display: flex;
    justify-content: space-between; /* Separa los divs */
    align-items: flex-start; /* Alinea los elementos arriba */
}

.paragraph {
    max-width: 70%;
    margin-bottom: 20px;
}

.photo {
    margin-top: 50px;
    text-align: center;
}


.avatar {
    width: 80%;
    /* Puedes ajustar el tamaño según lo necesites */
    height: 80%;
    /* Asegúrate de que el alto sea igual al ancho para mantenerla circular */
    border-radius: 50%;
    /* Esto hace que la imagen sea redonda */
    object-fit: cover;
    /* Asegura que la imagen se recorte de manera adecuada dentro del contenedor redondo */
}

@media only screen and (min-width: 620px) {
    .paragraph {
        float: left;
    }

    .photo {
        float: left;
        padding: 10px;
       padding-left: 80px;  
    }
}
</style>