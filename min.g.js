var DEBUG=0,TO_RADIANS=Math.PI/180,canvas,canvasW,canvasH,ctx,activeTask,level,particles=[],gridOffsetX=100,gridOffsetY=500,mousex=-100,mousey=-100,dragging=!1;canvas=document.getElementById("g");ctx=canvas.getContext("2d");canvasW=canvas.width=1080;canvasH=canvas.height=1920;
var tileSize=100,possibleValues=[0,1,2,3],possibleColors=["#C00","#777","#F60","#6C0","#CF0"],progresses=[0,0,0,0],grid=[[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}],[{},{},{},{},{},{},{},{},{},{}]];covid=new Image;covid.src="pic/covid.png";toilet=new Image;
toilet.src="pic/toilet.png";mask=new Image;mask.src="pic/mask.png";sanitizer=new Image;sanitizer.src="pic/sanitizer.png";var possiblePictures=[covid,toilet,mask,sanitizer];toilet1=new Image;toilet1.src="pic/toilet1.png";toilet2=new Image;toilet2.src="pic/toilet2.png";toilet3=new Image;toilet3.src="pic/toilet3.png";toilet4=new Image;toilet4.src="pic/toilet4.png";mask1=new Image;mask1.src="pic/mask1.png";mask2=new Image;mask2.src="pic/mask2.png";mask3=new Image;mask3.src="pic/mask3.png";mask4=new Image;
mask4.src="pic/mask4.png";sanitizer4=new Image;sanitizer4.src="pic/sanitizer4.png";covid4=new Image;covid4.src="pic/covid4.png";var barPictures=[[covid4,covid4,covid4,covid4],[toilet1,toilet2,toilet3,toilet4],[mask1,mask2,mask3,mask4],[sanitizer4,sanitizer4,sanitizer4,sanitizer4]];canvas.addEventListener("mousemove",mossoMouse);canvas.addEventListener("mousedown",cliccatoMouse);canvas.addEventListener("mouseup",rilasciatoMouse);canvas.addEventListener("touchstart",cliccatoTap);
canvas.addEventListener("touchmove",mossoTap);canvas.addEventListener("touchend",rilasciatoTap);level=-1;var tutorial=" Tap on a group of 4to rotate. Form an  identical  set of 4 to collect          Defeat the CoVid-19! ";generateLevel();activeTask=setInterval(run,33);
function generateLevel(){if(-1==level){tileSize=80;gridOffsetX=190;gridOffsetY=500;for(var b=0;10>b;b++)for(var a=0;10>a;a++)grid[a][b].val=tutorial[10*b+a],grid[a][b].animationX=rand(-4E3,4E3),grid[a][b].animationY=rand(-4E3,4E3)}else if(0==level)for(gridOffsetX=tileSize=100,gridOffsetY=500,b=0;10>b;b++)for(a=0;10>a;a++)grid[b][a].val=possibleValues[rand(0,possibleValues.length-1)],grid[b][a].animationX=0,grid[b][a].animationY=-2E3}
function run(){ctx.clearRect(0,0,canvasW,canvasH);ctx.fillStyle="#000";ctx.fillRect(0,0,canvasW,canvasH);ctx.fillStyle="#FFF";ctx.fillRect(0,0,canvasW,1);ctx.fillRect(0,canvasH-1,canvasW,1);ctx.fillRect(0,0,1,canvasH);ctx.fillRect(canvasW-1,0,1,canvasH);if(-1==level){ctx.fillStyle="#EEE";ctx.font="120px Monospace";four="";four=rand(0,3)?four+"F":four+"f";four=rand(0,3)?four+"O":four+"o";four=rand(0,3)?four+"U":four+"u";four=rand(0,3)?four+"R":four+"r";text="Four or "+four;ctx.textAlign="center";ctx.fillText(text,
550,120);ctx.textAlign="left";for(var b=0,a=[],c=0;10>c;c++)for(var d=0;10>d;d++){if(distanceFrom(mousex,mousey,c*tileSize+gridOffsetX,d*tileSize+gridOffsetY)<tileSize){var e={};e.r=c;e.c=d;a.push(e);selectedOffsetX=rand(-1,1);selectedOffsetY=rand(-1,1)}else selectedOffsetY=selectedOffsetX=0;ctx.font="80px Monospace";ctx.fillStyle="#666";ctx.fillText(grid[c][d].val,gridOffsetX+c*tileSize+grid[c][d].animationX+selectedOffsetX-tileSize/2,gridOffsetY+d*tileSize+grid[c][d].animationY+selectedOffsetY);
ctx.strokeStyle="#FFF";ctx.lineWidth="1";ctx.beginPath();ctx.rect(gridOffsetX+c*tileSize+grid[c][d].animationX+selectedOffsetX-tileSize/2,gridOffsetY+d*tileSize+grid[c][d].animationY+selectedOffsetY-tileSize+10,tileSize,tileSize);ctx.stroke();1<Math.abs(grid[c][d].animationX)?(grid[c][d].animationX*=.8,b++):grid[c][d].animationX=0;1<Math.abs(grid[c][d].animationY)?(grid[c][d].animationY*=.8,b++):grid[c][d].animationY=0}dragging&&3<=a.length&&(dragging=!1,rotateTiles(a));ctx.font="180px Monospace";
ctx.fillStyle="#6C0";ctx.fillText("PL",canvasW/2-100,canvasH-300);ctx.fillText("AY",canvasW/2-100,canvasH-150);dragging&&150>distanceFrom(mousex,mousey,canvasW/2,canvasH-300)&&(level=0,generateLevel());ctx.fillStyle="#FFF";ctx.font="12px Arial";ctx.fillText("By Infernet89",canvasW-75,canvasH-5);ctx.fillText("Made for JS13k Competition",5,canvasH-5)}else if(0==level){b=0;a=[];ctx.fillStyle="#FFF";ctx.font="80px Arial";for(c=0;10>c;c++)for(d=0;10>d;d++)distanceFrom(mousex,mousey,c*tileSize+gridOffsetX,
d*tileSize+gridOffsetY)<tileSize?(e={},e.r=c,e.c=d,a.push(e),selectedOffsetX=rand(-1,1),selectedOffsetY=rand(-1,1)):selectedOffsetY=selectedOffsetX=0,ctx.fillStyle=possibleColors[grid[c][d].val],ctx.drawImage(possiblePictures[grid[c][d].val],0,0,tileSize,tileSize,gridOffsetX+c*tileSize+grid[c][d].animationX+selectedOffsetX-tileSize/2,gridOffsetY+d*tileSize+grid[c][d].animationY+selectedOffsetY-tileSize/2,tileSize,tileSize),1<Math.abs(grid[c][d].animationX)?(grid[c][d].animationX*=.8,b++):grid[c][d].animationX=
0,1<Math.abs(grid[c][d].animationY)?(grid[c][d].animationY*=.8,b++):grid[c][d].animationY=0;dragging&&3<=a.length?(dragging=!1,rotateTiles(a)):0==b&&checkForFour();drawParticles();drawBars()}}function gameOver(){for(var b=0;10>b;b++)for(var a=0;10>a;a++)grid[b][a].val=0;possibleValues=[0]}
function drawBars(){if(1==possibleValues.length)ctx.font="120px Arial",ctx.fillStyle=possibleColors[0],ctx.fillText("YOU LOST.",500,1700);else{var b=0;ctx.strokeStyle="#FFF";ctx.font="30px Arial";ctx.lineWidth="3";for(var a=1;a<possibleValues.length;a++){var c=Math.floor(progresses[a]/800);3<c&&(c=3);ctx.save();ctx.translate(50,1880-90*a);ctx.drawImage(barPictures[a][c],0,-25);ctx.restore();ctx.beginPath();ctx.rect(150,1870-90*a,800,20);ctx.stroke();ctx.fillStyle=possibleColors[a];3200<progresses[a]?
(ctx.fillRect(150,1870-90*a,800,20),ctx.fillStyle="#FFF",ctx.fillText("Lv. \u221e",1E3,1890-90*a),b++):(ctx.fillRect(150,1870-90*a,progresses[a]%800,20),ctx.fillStyle="#FFF",ctx.fillText("Lv. "+(c+1),1E3,1890-90*a));1<progresses[a]&&3200>=progresses[a]&&(progresses[a]-=.2)}3<=b?(possiblePictures[0]=sanitizer,ctx.font="120px Arial",ctx.fillStyle=possibleColors[3],ctx.fillText("YOU WON.",600,300)):(ctx.drawImage(covid4,0,0,150,150,450,100,150,150),ctx.beginPath(),ctx.rect(100,250,802,50),ctx.stroke(),
ctx.fillStyle=possibleColors[0],ctx.fillRect(102,252,progresses[0]%800,46),ctx.fillStyle="#FFF",ctx.font="45px Arial",ctx.fillText("Lv. "+(Math.floor(progresses[0]/800)+1),1010,290),progresses[0]+=.2,3200<progresses[0]&&gameOver())}}
function checkForFour(){for(var b=0;9>b;b++)for(var a=0;9>a;a++)if(grid[b][a].val==grid[b+1][a].val&&grid[b][a].val==grid[b][a+1].val&&grid[b][a].val==grid[b+1][a+1].val){explosionParticles(gridOffsetX+(b+.5)*tileSize,gridOffsetY+(a+.5)*tileSize,possibleColors[grid[b][a].val],grid[b][a].val);for(var c=a+1;1<c;c--)grid[b][c].val=grid[b][c-2].val,grid[b][c].animationY=-200,grid[b+1][c].val=grid[b+1][c-2].val,grid[b+1][c].animationY=-200;grid[b][0].val=possibleValues[rand(0,possibleValues.length-1)];
grid[b+1][0].val=possibleValues[rand(0,possibleValues.length-1)];grid[b][1].val=possibleValues[rand(0,possibleValues.length-1)];grid[b+1][1].val=possibleValues[rand(0,possibleValues.length-1)];grid[b][0].animationY=-800;grid[b+1][0].animationY=-800;grid[b][1].animationY=-800;grid[b+1][1].animationY=-800}}
function rotateTiles(b){for(var a=99,c=99,d=0;d<b.length;d++)b[d].r<a&&(a=b[d].r),b[d].c<c&&(c=b[d].c);b=grid[a][c];grid[a][c]=grid[a][c+1];grid[a][c+1]=grid[a+1][c+1];grid[a+1][c+1]=grid[a+1][c];grid[a+1][c]=b;grid[a][c].animationY=tileSize;grid[a][c+1].animationX=tileSize;grid[a+1][c+1].animationY=-tileSize;grid[a+1][c].animationX=-tileSize}
function explosionParticles(b,a,c,d){var e=rand(30,50);for(ip=0;ip<e;ip++)t={},t.px=b+rand(-5,5),t.py=a+rand(-5,5),t.dx=rand(-6,6),t.dy=rand(-9,6),t.color=c,t.value=d,t.ttl=rand(5,90),particles.push(t)}
function drawParticles(){ctx.save();for(ipd=0;ipd<particles.length;ipd++)ctx.fillStyle=particles[ipd].color,ctx.fillRect(particles[ipd].px,particles[ipd].py,5,5),particles[ipd].px+=particles[ipd].dx,particles[ipd].py+=particles[ipd].dy,particles[ipd].dy=0==t.value?particles[ipd].dy-.8:particles[ipd].dy+.8,particles[ipd].ttl--,0>=particles[ipd].ttl&&(progresses[particles[ipd].value]+=5,particles.splice(ipd,1),--ipd);ctx.restore()}
function rand(b,a){return b>a?rand(a,b):Math.floor(Math.random()*(a+1-b)+b)}function distanceFrom(b,a){return Math.sqrt((b.x-a.x)*(b.x-a.x)+(b.y-a.y)*(b.y-a.y))}function distanceFrom(b,a,c,d){return Math.sqrt((b-c)*(b-c)+(a-d)*(a-d))}function cliccatoTap(b){b.preventDefault();dragging=!1;var a=canvas.getBoundingClientRect();mousex=(b.targetTouches[0].pageX-a.left)/(a.right-a.left)*canvasW;mousey=(b.targetTouches[0].pageY-a.top)/(a.bottom-a.top)*canvasH}
function mossoTap(b){b.preventDefault();dragging=!1;var a=canvas.getBoundingClientRect();mousex=(b.targetTouches[0].pageX-a.left)/(a.right-a.left)*canvasW;mousey=(b.targetTouches[0].pageY-a.top)/(a.bottom-a.top)*canvasH}function rilasciatoTap(b){b.preventDefault();dragging=!0;setTimeout(function(){mousex=mousey=-100},100)}function cliccatoMouse(b){dragging=!0;var a=canvas.getBoundingClientRect();mousex=(b.clientX-a.left)/(a.right-a.left)*canvasW;mousey=(b.clientY-a.top)/(a.bottom-a.top)*canvasH}
function mossoMouse(b){var a=canvas.getBoundingClientRect();mousex=(b.clientX-a.left)/(a.right-a.left)*canvasW;mousey=(b.clientY-a.top)/(a.bottom-a.top)*canvasH}function rilasciatoMouse(b){dragging=!1}
window.AutoScaler=function(b,a,c,d){var e=this;this.viewportHeight=this.viewportWidth=0;"string"===typeof b&&(b=document.getElementById(b));this.element=b;this.gameAspect=a/c;this.skewAllowance=d||0;this.checkRescale=function(){if(window.innerWidth!=e.viewportWidth||window.innerHeight!=e.viewportHeight){var f=window.innerWidth,g=window.innerHeight,l=f/g;var h=f;var k=g;Math.abs(l-e.gameAspect)>e.skewAllowance&&(l<e.gameAspect?k=f/e.gameAspect:h=g*e.gameAspect);e.element.style.width=h+"px";e.element.style.height=
k+"px";e.element.style.marginLeft=(f-h)/2+"px";e.element.style.marginTop=(g-k)/2+"px";e.viewportWidth=f;e.viewportHeight=g}};e.element.style.display="block";e.element.style.margin="0";e.element.style.padding="0";window.addEventListener("resize",this.checkRescale);rescalercheck=setInterval(this.checkRescale,1500)};