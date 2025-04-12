(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();class g{constructor(){this.reset()}reset(){return this.board=Array(9).fill(null),this.currentPlayer="X",this.gameStatus="in progress",this.winner=null,this.winningCells=null,this}makeMove(t){return this.gameStatus!=="in progress"||this.board[t]!==null?!1:(this.board[t]=this.currentPlayer,this.checkWin()?(this.gameStatus="win",this.winner=this.currentPlayer):this.checkTie()?this.gameStatus="tie":this.currentPlayer=this.currentPlayer==="X"?"O":"X",!0)}checkWin(){const t=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];for(const n of t){const[i,e,s]=n;if(this.board[i]!==null&&this.board[i]===this.board[e]&&this.board[i]===this.board[s])return this.winningCells=n,!0}return!1}checkTie(){return this.board.every(t=>t!==null)}getCurrentPlayer(){return this.currentPlayer}getGameStatus(){return this.gameStatus}getWinner(){return this.winner}getWinningCells(){return this.winningCells?[...this.winningCells]:null}getBoard(){return[...this.board]}}const o=new g;class f{constructor(){this.boardElement=document.getElementById("game-board"),this.statusElement=document.getElementById("game-status"),this.resetButton=document.getElementById("reset-button"),this.winningLine=document.getElementById("winning-line"),this.cells=Array.from(document.querySelectorAll(".cell")),this.bindEvents(),this.render()}bindEvents(){this.cells.forEach(t=>{t.addEventListener("click",()=>{const n=parseInt(t.getAttribute("data-index"));this.handleCellClick(n)})}),this.resetButton.addEventListener("click",()=>{this.resetGame()})}handleCellClick(t){o.makeMove(t)&&this.render()}resetGame(){o.reset(),this.render()}drawWinningLine(t){if(!t){this.winningLine.classList.add("hidden");return}const n=this.cells[t[0]].getBoundingClientRect(),i=this.cells[t[2]].getBoundingClientRect(),e=this.boardElement.getBoundingClientRect(),s=n.left-e.left+n.width/2,r=n.top-e.top+n.height/2,a=i.left-e.left+i.width/2,c=i.top-e.top+i.height/2,l=Math.sqrt(Math.pow(a-s,2)+Math.pow(c-r,2)),d=Math.atan2(c-r,a-s)*(180/Math.PI);this.winningLine.style.left=`${s}px`,this.winningLine.style.top=`${r}px`,this.winningLine.style.width=`${l}px`,this.winningLine.style.transform=`rotate(${d}deg)`;const u=o.getWinner();this.winningLine.style.backgroundColor=u==="X"?"#e74c3c":"#3498db",this.winningLine.classList.remove("hidden")}render(){const t=o.getBoard(),n=o.getGameStatus(),i=o.getWinningCells();this.cells.forEach((s,r)=>{const a=t[r];s.textContent=a||"",s.classList.remove("x","o","winner"),a&&(s.classList.add(a.toLowerCase()),i&&i.includes(r)&&s.classList.add("winner"))});let e="";n==="in progress"?e=`Player ${o.getCurrentPlayer()}'s turn`:n==="win"?e=`Player ${o.getWinner()} wins!`:n==="tie"&&(e="Game ended in a tie!"),this.statusElement.textContent=e,n==="win"?setTimeout(()=>this.drawWinningLine(i),50):this.winningLine.classList.add("hidden")}}document.addEventListener("DOMContentLoaded",()=>{new f});class m{constructor(){this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.particles=[],this.particleCount=50,this.mouseX=0,this.mouseY=0,this.colors=["#ffffff","#f5f5f5","#e0e0e0","#d5d5d5"],this.init()}init(){this.canvas.id="particles-canvas",this.canvas.style.position="absolute",this.canvas.style.top="0",this.canvas.style.left="0",this.canvas.style.zIndex="1",this.canvas.style.pointerEvents="none",document.getElementById("particles-js").appendChild(this.canvas),this.resizeCanvas(),window.addEventListener("resize",()=>this.resizeCanvas()),document.addEventListener("mousemove",n=>{this.mouseX=n.clientX,this.mouseY=n.clientY}),this.createParticles(),this.animate()}resizeCanvas(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight,this.createParticles()}createParticles(){this.particles=[];for(let t=0;t<this.particleCount;t++)this.particles.push({x:Math.random()*this.canvas.width,y:Math.random()*this.canvas.height,size:Math.random()*3+1,speedX:Math.random()*1-.5,speedY:Math.random()*1-.5,color:this.colors[Math.floor(Math.random()*this.colors.length)]})}drawParticles(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.particles.forEach(t=>{this.ctx.fillStyle=t.color,this.ctx.beginPath(),this.ctx.arc(t.x,t.y,t.size,0,Math.PI*2),this.ctx.fill(),t.x+=t.speedX,t.y+=t.speedY,(t.x>this.canvas.width||t.x<0)&&(t.speedX*=-1),(t.y>this.canvas.height||t.y<0)&&(t.speedY*=-1),this.particles.forEach(s=>{const r=t.x-s.x,a=t.y-s.y,c=Math.sqrt(r*r+a*a);c<100&&(this.ctx.beginPath(),this.ctx.strokeStyle=`rgba(255, 255, 255, ${.5-c/200})`,this.ctx.lineWidth=.5,this.ctx.moveTo(t.x,t.y),this.ctx.lineTo(s.x,s.y),this.ctx.stroke())});const n=t.x-this.mouseX,i=t.y-this.mouseY,e=Math.sqrt(n*n+i*i);if(e<100){const s=n/e,r=i/e,a=(100-e)/100;t.x+=s*a,t.y+=r*a}})}animate(){this.drawParticles(),requestAnimationFrame(()=>this.animate())}}document.addEventListener("DOMContentLoaded",()=>{new m});
