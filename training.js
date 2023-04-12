
window.onload = function (e){
    new Vue({
        el: '#training',
    
        template:
            `
            <div> 
                <h1 class='title'>Reach the top of the boxing world!</h1>
                <div >
                    <h2 id='Day'>Day {{day}}, {{time}}</h2>
                </div>
                <div class='level'> Level {{level}}</div>
                <div class = 'data'>
                    <div class = 'statistics'>
                        <div class='tables'>
                            <table>
                                <tr class='stats'>
                                    <td>💪Power: </td>
                                    <td><b>{{power}}</b>💪</td>
                                </tr>
                                <tr class='stats'>
                                    <td>⚡Energy: </td>
                                    <td><b>{{energy}}</b>⚡</td>
                                </tr>
                                <tr class='stats'>
                                    <td>💲Money: </td>
                                    <td><b>\${{money}}</b>💲</td>
                                </tr>
                                <tr class='stats' v-if='fight == true'>
                                    <td>🏆WINS: </td>
                                    <td><b>{{wins}}</b>🏆</td>
                                </tr>
                            </table>
                        </div>
                        <div class='tables'>
                            <table>
                                <tr class='stats'>
                                    <td>Power Increase: </td>
                                    <td><b>{{powerIncrease}}</b></td>
                                </tr>
                                <tr class='stats'>
                                    <td>Energy Increase: </td>
                                    <td><b>{{energyIncrease}}</b></td>
                                </tr>
                                <tr class='stats' v-if="wins >= 1">
                                    <td>Coach's Influence: </td>
                                    <td><b>{{coachInfluence}}</b></td>
                                </tr>
                                
                            </table>
                        </div>
                        
                    </div>
                    <div id="eventLog" class= "events" style="margin-top:10px; display:inline-block">
                        <div v-for="event in eventsToDisplay">
                            {{event}}
                        </div>
                    </div>
                </div>
                <div>
                    <div style='padding:10px'>
                        <button class='buttons' @click='train'> TRAIN </button>
                        <button class='buttons' @click='buyPower'> Buy Equipment </button>
                        <button class='buttons' @click='buyEnergy'> Buy Energy </button>
                        <button class='buttons' @click='buyCoach' v-if="wins >= 1"> Hire a Coach </button>
                    </div>
                    <div style='padding:5px'>
                        <button class='buttons' id='fight'v-if="fight==true" @click='fights'> 🥊FIGHT!!!💥 </button>
                    </div>
                </div>
                
            </div>
            
            </div>
            `,
        
    
        data: {
            level: 1,
            day: 0,
            power: 0, 
            energy: 100,
            money: 0,
            wins: 0,
            timeOfDay: 0,
            powerIncrease: 5,
            energyDecrease: 10,
            energyIncrease: 5,
            MAX_ENERGY: 100,
            fight: false,
            pause: false,
            events: ["Begin your Boxing Journey! START TRAINING"],
            coachInfluence: 0,

            
        },

        methods: {
            train(){
                if (this.energy >= this.energyDecrease){
                    this.power += this.powerIncrease
                    this.energy -= this.energyDecrease
                    this.energy = Math.max(this.energy, 0)
                } else {
                    this.events.push("Not enough energy! 💤")
                }
                
            },

            buyPower(){
                //Pick a number between 1 and 10
                let cost = this.level*Math.floor((Math.random()*10)+1)
                if (this.money >= cost){
                    this.money -= cost
                    let choose = Math.floor(Math.random()*2)
                    let increase = this.level*Math.floor((Math.random()*10)+1)
                    this.events.push(`You bought gym equipment for $${cost}, increasing your powerup rate by ${increase} 💪`)
                    //Increase Power
                    this.powerIncrease += increase
                
                } else {
                    this.events.push("Not enough money 💸")
                }
            },

            buyEnergy(){
                let cost = this.level*Math.floor((Math.random()*10)+1)
                if (this.money >= cost){
                    this.money -= cost
                    let choose = Math.floor(Math.random()*2)
                    let increase = this.level*Math.floor((Math.random()*10)+1)
                    
                    this.events.push(`You bought relaxation materials for $${cost}, increasing your energy rate by ${increase} 🛌`)

                    // Increase Energy
                    this.energyIncrease += increase
                    
                }else {
                    this.events.push("Not enough money 💸")
                }
            },

            buyCoach(){
                let cost = this.level*Math.floor((Math.random()*10)+10)
                if (this.money >= cost){
                    this.money -= cost
                    let choose = Math.floor(Math.random()*2)
                    let increase = this.level*Math.floor((Math.random()*10)+1)

                    // Increase Energy
                    this.coachInfluence += increase

                    this.events.push(`You hired a coach for $${cost}, whose influences your power by ${this.coachInfluence} daily `)
                    
                }else {
                    this.events.push("Not enough money 💸")
                }
            },

            fights(){
                if (this.energy > 0.75*this.MAX_ENERGY){
                    let fightMoney = this.level*Math.floor((Math.random()*20)+1)
                    let winLose = Math.floor(Math.random()*2)
                    //Energy goes to 0
                    this.energy = 0
                    this.pausetime(winLose, fightMoney)
                }else{
                    this.events.push("Not enough energy! 💤")
                }
                
            },

            pausetime(value, fightMoney){
                this.pause = true
                setTimeout(() => {
                    this.events.push("START THE FIGHT! 🔔 ")
                }, 0);
                setTimeout(() => {
                    this.events.push("💥BAM💥 ")
                }, 1000);
                setTimeout(() => {
                    this.events.push("🥊POW🥊")
                }, 2000);
                setTimeout(() => {
                    this.events.push("💥BOOM💥")
                }, 3000);
                setTimeout(() => {
                    this.events.push("...")
                }, 4000);
                setTimeout(() => {
                    if (value == 0){
                        this.events.push("YOU LOST!😫")
                    } else {
                        this.events.push("YOU WON!🏆")
                        this.wins +=1
                    }
                    this.pause = false
                }, 5000);
                setTimeout(() => {
                    if (value == 0){
                        newmoney = this.money - fightMoney
                        this.money = Math.max(newmoney, 0)
                        this.events.push(`You lost $${fightMoney} 💸`)
                    } else {
                        newmoney = this.money + fightMoney
                        this.money = newmoney
                        this.events.push(`You won $${fightMoney} 💲💲`)
                    }
                }, 6000);
                
                
            }
        },
        

        watch: {
            power(){
                this.level = Math.floor(this.power/100) + 1
            },

            level(){
                
                //Training is harder
                this.energyDecrease = this.level*10
                //Total energy increases by 50
                this.MAX_ENERGY += 50
                this.energy = this.MAX_ENERGY
                this.events.push(`You are now Level ${this.level}, with maximum energy ${this.MAX_ENERGY}!`)
                if (this.level == 2){
                    this.fight = true
                    this.events.push(`Now you can fight other people!🥊🥊`)
                }
            }

        },

        computed: {
            time(){
                let value = this.timeOfDay % 3
                if (value==0){
                    return "Morning"
                }
                else if(value==1){
                    return "Afternoon"
                } else if (value==2){
                    return "Evening"
                }
                
            },
            eventsToDisplay() {
                return this.events.slice().reverse()
            }
        },

        mounted(){
            
            setInterval(() => {
                //console.log("STARTED")
                if (!this.pause){
                    this.day+=1
                    this.power += this.coachInfluence
                }
                
                
                
            }, 1500);
            setInterval(() => {
                //console.log("Tripletime")
                if(!this.pause){
                    this.timeOfDay+=1
                    this.energy += this.energyIncrease
                    this.energy = Math.min(this.energy, this.MAX_ENERGY)
                }
                
            }, 500);
        }
    
    
    })
}
