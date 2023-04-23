<template>
    <div class="alert alert-dark text-dark mb-4 alert-dismissible fade show" role="alert" style="font-weight: 400">
        ⚪ A working demo is not available
        <button type="button" class="btn close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true" class="text-dark">&times;</span>
        </button>
    </div>
    <div id="medirec" class="container my-3" style="max-width: 700px">
        <h4 class="text-center my-4 mb-3">Medirec 🩺</h4>
        <p class="mb-4">MediRec is a web-based application that enables users to keep track of medical files and share them with doctors. It was built as a project for the Software Engineering II class (2021-II).</p>

        <div class="d-flex justify-content-center">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/AFpzOihtsvs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <h5 class="text-center my-4">Features</h5>
        <p>Some of the features of this software product are the following:</p>
        <ul>
            <li>
                User Sign Up and Log In
                <ul>
                    <li>Patient Role</li>
                    <li>Doctor Role</li>
                </ul>
            </li>
            <li>Password Recovery</li>
            <li>User Profile (CRUD)</li>
            <li>Medical Files (CRUD)</li>
            <li>
                Dashboard
                <ul>
                    <li>Calendar</li>
                    <li>Symptoms</li>
                </ul>
            </li>
            <li>Chat between patient and doctor</li>
            <li>Doctor rating and feedback feed</li>
            <li>Donations</li>
            <li>Tutorial</li>
        </ul>

        <h5 class="text-center my-4">Technologies Used ⌨</h5>
        <div class="row justify-content-center p-3">
            <div class="card bg-transparent mr-4">
                <div class="card-body">
                    <h6 class="card-title">Backend</h6>
                    <ul>
                        <li>Java (Sprint Boot)</li>
                        <li>MySQL</li>
                        <li>Postman and Swagger</li>
                    </ul>
                </div>
            </div>

            <div class="card bg-transparent ml-4" >
                <div class="card-body">
                    <h6 class="card-title">Frontend</h6>
                    <ul>
                        <li>Adobe XD</li>
                        <li>HTML, CSS, JavaScript</li>
                        <li>Vue.js</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>