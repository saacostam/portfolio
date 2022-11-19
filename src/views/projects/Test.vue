<template>
    <div id="test" class="p-3">
        <h3 class="text-center">Test</h3>
        <div v-if="testStage === 'not-started'" class="workspace">
            <p class="text-center">Bienvenido...</p>
            <button class="btn btn-success d-block mx-auto m-4" @click="startTest">Start</button>
        </div>
        <div v-else-if="testStage === 'started'" class="workspace">
            <p class="text-center">{{ this.questions[this.currQuestion].question }}</p>

            <div class="options">
                <div class="option" v-for="answer, key in this.questions[this.currQuestion].answers">
                    <button class="btn btn-light w-100" @click="pickAnswer(answer)" :class="{'bg-primary text-white': answer == this.questions[this.currQuestion].picked}">{{ answer }}</button>
                </div>
            </div>
            
            <div id="nav" class="m-4">
                <div class="nav-option m-1" v-for="index in this.questions.length">
                    <button class="btn btn-light" :class="{'bg-primary text-white': this.questions[index-1].picked != null}" @click="changeQuestion(index)">{{ index }}</button>
                </div>
                <button class="btn btn-success m-1" :disabled="!(fullAns())" @click="submit">Submit</button>
            </div>
        </div>
        <div v-if="testStage === 'finished'" class="workspace">
            <h1 class="text-center">🎉</h1>
            <h2 class="text-center">{{this.correctAnswers}}/{{this.questions.length}}</h2>
            <button class="btn btn-warning d-block mx-auto m-4" @click="restartTest">Retake</button>
        </div>
    </div>
</template>

<script>
import questions from '@/db/test'
export default {
    name: 'test',
    data(){
        return{
            questions: this.cloneObject(questions),
            currQuestion: 0,
            testStage: 'not-started',
            correctAnswers : 0,
        }
    },
    methods:{
        startTest(){
            this.testStage = 'started';
            this.currQuestion = 0;
        },
        changeQuestion(index){
            this.currQuestion = index-1;
        },
        pickAnswer(answer){
            this.questions[this.currQuestion].picked = answer;
        },
        fullAns(){
            for (let i=0; i < this.questions.length; i++){
                if (this.questions[i].picked === null){
                    return false;
                }
            }
            return true;
        },
        cloneObject(object){
            return JSON.parse(JSON.stringify(object))
        },
        submit(){
            this.correctAnswers = 0;
            for (let i = 0; i < this.questions.length; i++){
                const {picked, answers, correct} = this.questions[i]
                if (picked == answers[correct]){
                    this.correctAnswers += 1;
                }
            }

            this.testStage = 'finished';
        },
        restartTest(){
            this.questions = this.cloneObject(questions);
            this.currQuestion = 0;
            this.testStage ='not-started';
            this.correctAnswers = 0;
        }
    }    
}
</script>

<style scoped>
.workspace{
    max-width: 30rem;
    margin: auto;
    padding: 1.5rem;
}
#nav{
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>