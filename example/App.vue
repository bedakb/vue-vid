<template>
    <div id="app">
        <div class="AppWrap">
             <div class="AppWrap__intro">
                 <h1>VueVid - Just another VueJS Component</h1>
                 <p>Lightweight VueJS 2 Component that makes your HTML5 Video prettier.</p>
             </div>
            <vue-vid
                sources="https://player.vimeo.com/external/194837908.sd.mp4?s=c350076905b78c67f74d7ee39fdb4fef01d12420&profile_id=164"
                poster="http://i.vimeocdn.com/video/461783385_1280x720.jpg"
                :skip-backward="-20"
                :skip-forward="55"
                :auto-play="false"
            >
            </vue-vid>
            <div class="AppWrap__footer text-center">
                <small>Inspired by <a href="https://github.com/wesbos">@wesbos</a> | Component made by <a href="https://github.com/bedakb">@bedakb</a></small>
            </div>
        </div>
    </div>
</template>

<script>

import VueVid from './components/VueVid'

export default {
    name: 'app',
    components: {
        VueVid
    }
}
</script>

<style>
    body {
        margin: 0;
        padding: 0;
        display:flex;
        background:#41B883;
        min-height:100vh;
        background: linear-gradient(135deg, #41B883 0%,#354953 100%);
        background-size:cover;
        align-items: center;
        justify-content: center;
        font-family: 'Roboto', sans-serif;
        color: #fff;
    }  
    a { 
        color: #41b883;
    }
    .text-center {
        text-align: center;
    }
    .AppWrap__intro {
        text-align: center;
    }
    .AppWrap__intro h2 {
        font-weight: bold;
    }
</style>
