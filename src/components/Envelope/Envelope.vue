<script setup>
import { ref,watch,nextTick } from 'vue'
import confetti from "canvas-confetti"

import { list } from "./content.json"

// const props =defineProps<{ msg: string }>()

const sorryList = ref([])

const open = ref(false)
const btnEnd = ref(false)
const content = ref("")
const fire = ref(false)
const end = ref(true)
const fontSize = ref(22);
const canvas = ref(null)
const sorry = ref(null)
const bgm = ref(null)
const success = ref(null)
const word = ref("")
const wordShow = ref(false)

let bomm = confetti.create(canvas.value, { resize: true });
//    nextTick().then(()=>{
//         myConfetti 
//    })

function addSorry(){
    if(fire.value || btnEnd.value) return;
    wordShow.value = false;
    setTimeout(()=>{
        word.value = [
            "听，这是心碎的声音~",
            "乖~别闹~~",
            "？拒收好人卡？！",
            "心碎了鸭~~",
            "555...心碎+1",
            "emmm...什么东西碎了？"
        ][~~(Math.random()*6)]
        wordShow.value = true;
    })
    sorryList.value.push({
        x:300*Math.random()-300,
        y:400*Math.random()-500,
        w:200 + Math.random()*150
    })
    sorry.value.currentTime = 0;
    sorry.value.play()
}

function contentLog(msg) {
    // let charIndex = 0 , timer;
    // timer = setInterval(()=>{
    //     if(msg.length < charIndex){
    //         clearInterval(timer)
    //         end.value = true;
    //     }
    //     content.value = content.value + msg.charAt(charIndex++)
    // },60)
    content.value = msg;
    end.value = true;
}

function handleOpen(){
    if(!end.value) return;
    // end.value && open.value = false
    wordShow.value = false;
    if(end.value && !open.value) {
        bgm.value.currentTime = 0;
        bgm.value.play()
        open.value = true
    }
    else if(end.value && open.value && btnEnd.value) {
        end.value = true
        open.value = false
        btnEnd.value = false
        content.value = ""
    }
}

function talk(msg,dur = 0) {
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            wordShow.value = false;
        },dur)
        setTimeout(()=>{
            word.value = msg
            wordShow.value = true;
            resolve()
        },dur+200)
    })
}

 async function handleSucces(params) {
    if(fire.value || btnEnd.value) return;
    success.value.currentTime = 0;
    success.value.play()
    end.value = false;
    btnEnd.value = true;
    sorryList.value.length = 0;
    const endTime = Date.now() + (10 * 1000);
    const colors = ['#bb0000', '#ffffff'];
    (function frame() {
        confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });
        if (Date.now() < endTime) {
            requestAnimationFrame(frame);
            fire.value = true
        }else{
            fire.value = false
        }
    }());
    await talk("我没听错吧？！",0)
    await talk("那么...",1500)
    await talk("还不快送我点小礼物，提升下好感度！！！",1500)
    await talk("微信，支付宝也行！我不介意~",2000)
    await talk("蟹蟹~~",2000)
    end.value = true
}

watch(open, v => {
	if(!v) return;
    end.value = false;
    let msg = list[~~(Math.random()*list.length)];
    fontSize.value = msg.fontSize;
    setTimeout(()=>bomm(),1000)
    setTimeout(()=>contentLog(msg.text),2222)
});

watch(end,v=>{
    if(v) return;
})

</script>

<template>

<div class="envelope" :class="{'active':open}">
  <div class="top"></div>
  <div class="heart" @click="handleOpen"></div>
  <div class="card"><p :style="{'font-size':fontSize+'px'}">{{ content }}</p></div>
  <canvas ref="canvas"></canvas>
</div>

<div class="word" :class="{'active':wordShow}">{{word}}</div>

<img v-for="(item,index) in sorryList" 
:style="{'margin-left':item.x+'px','margin-top':item.y+'px','width':item.w +'px'}" 
        :key="item" 
        src="../../assets/sorry.png" 
        class="sorry" />

<div class="btns" :class="{'active':end&&open&&!btnEnd}">
  <div @click="handleSucces">太开心，太感动了！！！</div>
  <div @click="addSorry">谢谢，你是个好人~</div>
</div>

<audio ref="sorry" preload="auto">
    <source src="../../assets/sorry.mp3" type="audio/mpeg">
</audio>

<audio ref="bgm" loop preload="auto">
    <source src="../../assets/bgm.mp3" type="audio/mpeg">
</audio>

<audio ref="success" preload="auto">
    <source src="../../assets/success.mp3" type="audio/mpeg">
</audio>
</template>

<style lang="scss" scoped>
@import "./style.scss"
</style>
