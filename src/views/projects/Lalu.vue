<template>
    <div id="lalu" class="container pt-4">
        <h4>Lalu</h4>
        <p>This is a frontend application similar to Spotify that allows users to listen to music, view artist profiles and listen to playlists. It was originally created as a class project, which used a distributed microservices backend with multiple programming languages and components. Currently, the frontend application uses mock-data to achieve the original behavior.</p>
        <p>🎯 Check the project here <a href="https://saacostam.github.io/lalu" target="_blank">here!</a></p>
        <iframe src="https://saacostam.github.io/lalu" width="100%" height="600" class="mb-2"></iframe>

        <h4>Lessons</h4>
        <p>This project helped me learn about streaming audio on the web. Although I already had experience with using the html audio element, this project required me to manage the playback of multiple songs (as in a playlist) allowing the user to navigate through songs with the next and back buttons, which was a challenging and enriching task.</p>
        <p>Another cool challenge was managing the layout of the application. Some elements, such as the music player and the navigation bar remain static on the screen, while other sections require automatic scrolling. This gave more complexity to the overall development of this project and helped me to think of different ways to write code that would meet this requirements, but at the same time be easy to maintain and modify in the future.</p>
        <p>One thing I would like to improve is the navigation menu on mobile devices. While the current version works well, I don't think it's the most intuitive and comfortable way to handle the navigation on a mobile device.</p>

        <h4>Code 🐱‍💻</h4>
        <p>🎯 The github repo is available <a href="https://github.com/saacostam/lalu" target="_blank">here!</a></p>

        <div class="alert alert-dark text-dark mb-4 alert-dismissible fade show" role="alert" style="font-weight: 400">
            The application was created as a class project for the <span style="color: var(--orange); font-weight: 600;">Software Architecture</span> course at National University of Colombia.
            <button type="button" class="btn close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true" class="text-dark">&times;</span>
            </button>
        </div>
    </div>
</template>

<script></script>

<style scoped></style>