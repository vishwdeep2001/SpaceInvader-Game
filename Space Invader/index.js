const scoreEl=document.querySelector('#scoreEl')
const canvas=document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

class Player {
  constructor() {
    this.position = {
      x: canvas.width /2 -this.width/2,
      y: 200
    }

    this.velocity = {
      x: 0,
      y: 0
    }

    this.rotation=0
    this.opaticity=1
    const image= new Image()
    image.src='./img/spaceship.png'
    image.onload = ()=>{
      const scale=0.15
      this.image=image
      this.width = image.width * scale
      this.height = image.height * scale

      this.position = {
        x: canvas.width /2 -this.width/2,
        y: canvas.height-this.height-20
      }
    }

  }
  draw(){
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.save()
    c.globalAlpha=this.opaticity
    c.translate(
      player.position.x+player.width/2,
      player.position.y+player.height/2
    )
    c.rotate(this.rotation)
    c.translate(
      -player.position.x-player.width/2,
      -player.position.y-player.height/2
    )

    if(this.image)
     c.drawImage(this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
      c.restore()
  }

  update(){
    this.draw()
    this.position.x +=this.velocity.x
  }
}


class Invader {
  constructor({position}) {
    this.position = {
      x: canvas.width /2 -this.width/2,
      y: 200
    }

    this.velocity = {
      x: 0,
      y: 0
    }



    const image= new Image()
    image.src='./img/invader.png'
    image.onload = ()=>{
      const scale=1
      this.image=image
      this.width = image.width * scale
      this.height = image.height * scale

      this.position = {
        x: position.x,
        y: position.y
      }
    }

  }
  draw(){
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)


    if(this.image)
     c.drawImage(this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )

  }

  update({velocity}){
    if(this.image){
    this.draw()
    this.position.x +=velocity.x
    this.position.y +=velocity.y
  }
}
shoot(InvaderProjectiles){
  InvaderProjectiles.push(new InvaderProjectile({
    position:{
      x:this.position.x+this.width/2,
      y:this.position.y+this.height
    },
    velocity:{
      x:0,
      y:1.5
    }
  })
)
}
}
class Grid{
  constructor(){
    this.position ={
      x:0,
      y:0
    }
    this.velocity = {
      x:1.5,
      y:0
    }

    this.invaders=[]
  const cols= Math.floor( Math.random()*10 +5)
  const rows= Math.floor( Math.random()*5 +2)

  this.width=cols *30
for (let i=0;i<cols;i++){
  for(let j=0;j<rows;j++){
  this.invaders.push(new Invader({position:{
    x:i * 30,
    y:j*30
  }}))
}
}
    console.log(this.invaders)
  }
  update(){
  this.position.x+= this.velocity.x
  this.position.y+= this.velocity.y
this.velocity.y=0

  if(this.position.x +this.width >=canvas.width || this.position.x <=0){
    this.velocity.x = -this.velocity.x
    this.velocity.y=30
  }
  }
}


class Projectile{
  constructor({position,velocity}){
    this.position=position
    this.velocity=velocity

    this.radius=3
  }
  draw(){
    c.beginPath()
    c.arc(this.position.x,this.position.y,this.radius,0,
    Math.PI *2)
    c.fillStyle='red'
    c.fill()
    c.closePath()
  }
  update(){
    this.draw()
    this.position.x+=this.velocity.x
    this.position.y+=this.velocity.y
  }
}

class Particle{
  constructor({position,velocity,radius,color,fades}){
    this.position=position
    this.velocity=velocity

    this.radius=radius
    this.color=color
    this.opaticity=1
    this.fades=fades
  }
  draw(){
    c.save()
    c.globalAlpha=this.opaticity
    c.beginPath()
    c.arc(this.position.x,this.position.y,this.radius,0,
    Math.PI *2)
    c.fillStyle=this.color
    c.fill()
    c.closePath()
    c.restore()
  }
  update(){
    this.draw()
    this.position.x+=this.velocity.x
    this.position.y+=this.velocity.y
    if(this.fades)
    this.opaticity-=0.01
  }
}




class InvaderProjectile{
  constructor({position,velocity}){
    this.position=position
    this.velocity=velocity

    this.width=3
    this.height=10
  }
  draw(){
    c.fillStyle='white'
   c.fillRect(this.position.x,this.position.y,this.width,this.height)
  }
  update(){
    this.draw()
    this.position.x+=this.velocity.x
    this.position.y+=this.velocity.y
  }
}






const player = new Player()
const projectiles=[]
const grids=[]
const InvaderProjectiles=[]
const particles=[]
const keys={
  a:{
    pressed:false
  },
  d:{
    pressed:false
  },
  space:{
    pressed:false
  }
}
player.draw()


let frames=0
let randomInterval= Math.floor((Math.random() *500)+500)
let game={
  over:false,
  active:true
}

let score=0

for(let i=0;i<100;i++){
particles.push(new Particle({
position:{
  x:Math.random() * canvas.width,
  y:Math.random() * canvas.height
},
velocity:{
  x:0,
  y:0.5
},
radius:Math.random()*3,
color:'white'
})
)
}


function createParticles({object,color,fades}){
  for(let i=0;i<15;i++){
particles.push(new Particle({
  position:{
    x:object.position.x+object.width/2,
    y:object.position.y +object.height/2
  },
  velocity:{
    x:(Math.random()-0.5)*2,
    y:(Math.random()-0.5)*2
  },
  radius:Math.random()*3,
  color:color ||'#BAA0DE',
  fades
})
)
}
}

function animate(){
  if(!game.active)return
  requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0,0,canvas.width,canvas.height)

  player.update()
  particles.forEach((particle,i) =>{
 if(particle.position.y - particle.radius >=canvas.height){
   particle.position.x=Math.random() *canvas.width,
   particle.position.y=-particle.radius
 }

    if(particle.opaticity<=0){
      setTimeout(()=>{
          particle.splice(i,1)
      },0)

    }
    else
    particle.update()
  })
  InvaderProjectiles.forEach((InvaderProjectile,index)=>{
    if(InvaderProjectile.position.y+InvaderProjectile.height>=canvas.height){
      setTimeout(()=>{
        InvaderProjectiles.splice(index,1)
      },0)
    }
    else{

    InvaderProjectile.update()}
    //projectile hits player
    if(InvaderProjectile.position.y+InvaderProjectile.height >= player.position.y && InvaderProjectile.position.x +InvaderProjectile.width>=player.position.x
    && InvaderProjectile.position.x <= player.position.x+player.width ){
      setTimeout(()=>{
        InvaderProjectiles.splice(index,1)
        player.opaticity=0
        game.over=true
      },0)

      setTimeout(()=>{

        game.active=false
      },2000)

      createParticles({
          object:player,
          color: 'white',
          fades:true
      })
    }
  })
  projectiles.forEach((projectile,index) =>{
    if(projectile.position.y+projectile.position.radius<=0){
      setTimeout(()=>{
        projectiles.splice(index,1)
      },0)
      projectiles.splice(index,1)
    }
    else{
        projectile.update()
    }

  })

grids.forEach((grid,gridIndex)=>{
  grid.update()
  //spawn projectile
  if(frames %100 === 0 && grid.invaders.length>0){
    grid.invaders[Math.floor(Math.random()*grid.invaders.length)].shoot(InvaderProjectiles)
  }
  grid.invaders.forEach((invader,i) =>{
    invader.update({ velocity:grid.velocity })
    //projectile hit
    projectiles.forEach((projectile,j)=>{
      if (projectile.position.y - projectile.radius <= invader.position.y+invader.height
      && projectile.position.x+projectile.radius >= invader.position.x &&
    projectile.position.x - projectile.radius <= invader.position.x +
    invader.width &&
  projectile.position.y+ projectile.radius >= invader.position.y){

        setTimeout(()=>{
          const invaderFound=grid.invaders.find(invader2 =>{
            return invader2 === invader
          })
          const projectileFound=projectiles.find(projectile2=>{
            return projectile2 ===  projectile
          })

//remove invader and projectile
          if(invaderFound && projectileFound){
            score+=100
            scoreEl.innerHTML=score
            createParticles({
                object:invader,
                fades:true
            })
          grid.invaders.splice(i,1)
          projectiles.splice(j,1)
          if(grid.invaders.length>0){
            const firstInvader=grid.invaders[0]
            const lastInvader=grid.invaders[grid.invaders.length-1]
            grid.width=
            lastInvader.position.x - firstInvader.position.x+lastInvader.width
            grid.position.x=firstInvader.position.x
          }
          else{
            grid.splice(gridIndex,1)
          }
        }
        },0)
      }
    })
  })
})

  if(keys.a.pressed && player.position.x>=0){
      player.velocity.x =-7
      player.rotation = -.15
  }
  else if(keys.d.pressed && player.position.x + player.width<=canvas.width){
    player.velocity.x=7
    player.rotation = 0.15
  }
  else{
    player.velocity.x=0
    player.rotation=0
  }
  if(frames % randomInterval === 0){
    grids.push(new Grid())
     randomInterval= Math.floor((Math.random() *500)+500)
     frames=0;
  }

//spawn projectile


  frames++
}



animate()
addEventListener('keydown', ({key})=>{
  if(game.over)return
console.log(key)
  switch(key){
    case 'a':
    // console.log('left')

    keys.a.pressed=true
    break
    case 'd':
    // console.log('right')
    keys.d.pressed=true
    break
    case ' ':
    // console.log('space')
    projectiles.push(new Projectile({
      position:{
        x:player.position.x+player.width/2,
        y:player.position.y
      },
      velocity:{
        x:0,
        y:-10
      }
    }))
    break

  }
})

addEventListener('keyup', ({key})=>{
console.log(key)
  switch(key){
    case 'a':
    // console.log('left')

    keys.a.pressed=false
    break
    case 'd':
    // console.log('right')
    keys.d.pressed=false
    break
    case ' ':
    // console.log(projectiles)
    break

  }
})
