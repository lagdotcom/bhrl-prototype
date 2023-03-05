"use strict";(()=>{var we=Object.create;var it=Object.defineProperty;var Se=Object.getOwnPropertyDescriptor;var He=Object.getOwnPropertyNames,jt=Object.getOwnPropertySymbols,ve=Object.getPrototypeOf,qt=Object.prototype.hasOwnProperty,Te=Object.prototype.propertyIsEnumerable;var Ut=(e,t,i)=>t in e?it(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,v=(e,t)=>{for(var i in t||={})qt.call(t,i)&&Ut(e,i,t[i]);if(jt)for(var i of jt(t))Te.call(t,i)&&Ut(e,i,t[i]);return e};var Me=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),R=(e,t)=>{for(var i in t)it(e,i,{get:t[i],enumerable:!0})},Ce=(e,t,i,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of He(t))!qt.call(e,n)&&n!==i&&it(e,n,{get:()=>t[n],enumerable:!(o=Se(t,n))||o.enumerable});return e};var H=(e,t,i)=>(i=e!=null?we(ve(e)):{},Ce(t||!e||!e.__esModule?it(i,"default",{value:e,enumerable:!0}):i,e));var E=Me((Ci,zt)=>{zt.exports=globalThis.wglt});var ct=H(E());var Pe=H(E());function $(e,t=new Map){if(!e||typeof e!="object")return e;if(t.has(e))return t.get(e);let i;if(e.nodeType&&"cloneNode"in e)i=e.cloneNode(!0),t.set(e,i);else if(e instanceof Date)i=new Date(e.getTime()),t.set(e,i);else if(e instanceof RegExp)i=new RegExp(e),t.set(e,i);else if(Array.isArray(e)){i=new Array(e.length),t.set(e,i);for(let o=0;o<e.length;o++)i[o]=$(e[o],t)}else if(e instanceof Map){i=new Map,t.set(e,i);for(let[o,n]of e.entries())i.set(o,$(n,t))}else if(e instanceof Set){i=new Set,t.set(e,i);for(let o of e)i.add($(o,t))}else if(e instanceof Object){i={},t.set(e,i);for(let[o,n]of Object.entries(e))i[o]=$(n,t)}else throw Error(`Unable to clone ${e}`);return i}function Qt(e){return $(e,new Map)}var dt=Qt,Xt=Object.keys,Jt=e=>{let t={};for(let[i,o]of e)t[i]=o;return t};var L=class{constructor(t,i){this.g=t;this.name=i;this.alive=!0,this.id=++t.lastEntityId,this.solid=!1,this.tags=new Set}applyPrefab(t,i){if(this.prefab=t,i.components&&Object.assign(this,dt(i.components)),i.children)for(let{name:o,x:n,y:r,overlay:s,tags:a}of i.children){let l=this.g.spawn(o).setAttachment({parent:this,x:n,y:r});if(s)for(let p of Xt(s))Object.assign(l[p],dt(s[p]));if(a)for(let p of a)l.tags.add(p)}return this}get[Symbol.toStringTag](){return this.name}kill(t){return this.alive=!1,this.eachChild(i=>this.g.kill(i,t)),this}eachChild(t){var i;for(let o of this.g.entities.get())((i=o.attachment)==null?void 0:i.parent)===this&&t(o,o.attachment)}setOwner(t){return this.owner=t,this}setAI(t){return this.ai=t,this}setAppearance(t){return this.g.refresh(),this.appearance=t,this}setAttachment(t){return this.attachment=t,this}setExplodes(t){return this.explodes=t,this}setField(t){return this.field=t,this}setHoming(t){return this.homing=t,this}setIgnoreSolid(t){return this.ignoreSolid=t,this}setLifetime(t){return this.lifetime=t,this}setMotion(t){return this.motion=t,this}setPilot(t){return this.pilot=t,this}setPosition(t){return this.g.refresh(),this.position=t,this}setShip(t){return this.ship=t,this}setTrail(t){return this.trail=t,this}setTurret(t){return this.turret=t,this}setPlayer(t){return this.player=t,this}setProjectile(t){return this.projectile=t,this}setSolid(t){return this.solid=t,this}move(t,i){return this.g.refresh(),this.position={x:t,y:i},this.eachChild((o,n)=>o.move(t+n.x,i+n.y)),this}};function Zt(e,t){var n,r,s,a;let i=(r=(n=e.appearance)==null?void 0:n.layer)!=null?r:0,o=(a=(s=t.appearance)==null?void 0:s.layer)!=null?a:0;return i!==o?i-o:e.id-t.id}var te=["damage","draw","kill","move","notice","playerFire","playerMove","spawn","tick"];var yt={};R(yt,{Battleship:()=>De,BattleshipHull:()=>Ae});var ut=H(E());var ee=(r=>(r[r.Effect=0]="Effect",r[r.Ship=1]="Ship",r[r.Gun=2]="Gun",r[r.Bullet=3]="Bullet",r[r.Player=4]="Player",r))(ee||{}),c=ee;var De={components:{ai:{idealDistance:8,speed:1},ship:{name:"Battleship",hp:40,maxHp:40}},children:[{name:"BattleshipHull",x:1,y:0},{name:"BattleshipHull",x:2,y:0},{name:"BattleshipHull",x:0,y:1},{name:"BattleshipHull",x:1,y:1},{name:"BattleshipHull",x:2,y:1},{name:"MachineGun",x:0,y:1},{name:"HomingMissileLauncher",x:2,y:1},{name:"FighterLauncher",x:2,y:0}]},Ae={components:{solid:!0,appearance:{glyph:"/",layer:c.Ship,fg:ut.Colors.WHITE,bg:ut.Colors.BROWN}}};var gt={};R(gt,{Bullet:()=>Be,HomingMissile:()=>Ie,PlayerBullet:()=>Re});var ot=H(E());var ke={Club:"",Dot:"\x07",RingInvert:`
`,Female:"\f",Pilcrow:"",Silcrow:"",ResizeVertical:"",RightArrow:"",LeftArrow:"\x1B",DownWedge:"",Pentagon:"\x7F",CapitalUUmlaut:"\x9A",Cent:"\x9B",Yen:"\x9D",NotFlip:"\xA9",Not:"\xAA",InvertedExclamation:"\xAD",BoxVerticalSingle:"\xB3",BoxUpSingleHorizontalSingle:"\xC1",BoxDownSingleHorizontalSingle:"\xC2",BoxHorizontalSingle:"\xC4",BoxUpDoubleHorizontalSingle:"\xD0",BoxDownSingleHorizontalDouble:"\xD1",BoxVerticalDoubleHorizontalSingle:"\xD7",Pi:"\xE3",Theta:"\xE9",Omega:"\xEA",SymbolED:"\xED",HorizontalDivide:"\xF6"},m=ke;var Be={components:{projectile:{damage:1},appearance:{glyph:".",layer:c.Bullet,fg:ot.Colors.YELLOW}}},Ie={components:{projectile:{damage:1},homing:{strength:.15,duration:10},trail:{effectPrefab:"SmokePuff"},explodes:{size:5,falloff:1},appearance:{glyph:"*",layer:c.Bullet,fg:ot.Colors.DARK_RED}}},Re={components:{projectile:{damage:3},appearance:{glyph:m.InvertedExclamation,layer:c.Bullet,fg:ot.Colors.YELLOW}}};var bt={};R(bt,{AirFistRange:()=>Le,SmokePuff:()=>Fe});var K=H(E());var Le={components:{lifetime:{duration:2},appearance:{glyph:" ",layer:c.Effect,bg:(0,K.fromRgb)(0,255,255,100),blendMode:K.BlendMode.Add}}},Fe={components:{lifetime:{duration:2},appearance:{glyph:" ",layer:c.Effect,bg:(0,K.fromRgb)(100,100,100,50),blendMode:K.BlendMode.Add}}};var xt={};R(xt,{Fighter:()=>Ke,FighterHull:()=>We,FighterLauncher:()=>Ge});var nt=H(E());var F=(e,t,{bulletPrefab:i="Bullet",bulletVelocity:o=1,salvoCount:n=1,timeBetweenShots:r=1,timeBetweenSalvos:s=1})=>({name:e,bulletPrefab:i,bulletAngle:t,bulletVelocity:o,salvoCount:n,timeBetweenShots:r,timeBetweenSalvos:s,timer:0,salvo:n});var Ge={components:{appearance:{glyph:"_",layer:c.Gun,fg:nt.Colors.DARK_CYAN},turret:F("Fighter Bay","nearestEnemy",{bulletPrefab:"Fighter",bulletVelocity:0,salvoCount:1,timeBetweenSalvos:20})}},Ke={components:{ai:{idealDistance:6,speed:2},ship:{name:"Fighter",hp:2,maxHp:2}},children:[{name:"FighterHull",x:0,y:0,overlay:{appearance:{glyph:"<"}}},{name:"FighterHull",x:1,y:0},{name:"FighterHull",x:2,y:0,overlay:{appearance:{glyph:">"}}},{name:"PeaShooter",x:1,y:0}]},We={components:{solid:!0,appearance:{glyph:"-",layer:c.Ship,fg:nt.Colors.YELLOW,bg:nt.Colors.DARK_BLUE}}};var Pt={};R(Pt,{HomingMissileLauncher:()=>_e,MachineGun:()=>Ne,PeaShooter:()=>Ve,PlayerGun:()=>Ye});var Oe={Right:0,Down:Math.PI/2,Left:Math.PI,Up:Math.PI*3/2},rt=Oe;var j=H(E());var Ne={components:{appearance:{glyph:"o",layer:c.Gun,fg:j.Colors.WHITE},turret:F("Machine Gun",rt.Down,{bulletPrefab:"Bullet",bulletVelocity:2,salvoCount:5,timeBetweenShots:0,timeBetweenSalvos:12})}},_e={components:{appearance:{glyph:"o",layer:c.Gun,fg:j.Colors.YELLOW},turret:F("Homing Missile","nearestEnemy",{bulletPrefab:"HomingMissile",bulletVelocity:1,salvoCount:1,timeBetweenSalvos:8})}},Ve={components:{appearance:{glyph:"o",layer:c.Gun,fg:j.Colors.LIGHT_GRAY},turret:F("Pea Shooter",rt.Down,{bulletPrefab:"Bullet",bulletVelocity:2,salvoCount:1,timeBetweenSalvos:3})}},Ye={components:{appearance:{glyph:"o",layer:c.Gun,fg:j.Colors.WHITE},turret:F("Pew Pew",rt.Up,{bulletPrefab:"PlayerBullet",bulletVelocity:2,salvoCount:2,timeBetweenShots:0,timeBetweenSalvos:3})}};var wt={};R(wt,{PlayerHull:()=>$e,PlayerShip:()=>je});var f=(e,t,i,o,n)=>({name:e,x:t,y:i,overlay:o,tags:n}),x=(e,t,i=0)=>({name:e,maxHp:t,hp:0,maxShield:i,shield:0});var Et=H(E());var $e={components:{solid:!0,appearance:{glyph:"#",layer:c.Player,fg:Et.Colors.DARK_GRAY}}},je={components:{player:{weaponArrays:["Primary"]},ship:x("Ace of Clubs",20,10)},children:[f("PlayerHull",0,0,{appearance:{glyph:m.LeftArrow}}),f("PlayerHull",1,0,{appearance:{glyph:m.Club,fg:Et.Colors.LIGHT_GRAY}}),f("PlayerHull",2,0,{appearance:{glyph:m.RightArrow}}),f("PlayerGun",1,0,void 0,["Primary"])]};var St={};R(St,{CruiseyWing:()=>ri,Demigod:()=>li,DroneA:()=>ii,DroneB:()=>oi,DroneC:()=>ni,GoutOFlame:()=>ai,Hull:()=>Ue,Olm:()=>si,ShipA:()=>qe,ShipB:()=>ze,ShipC:()=>Qe,ShipD:()=>Xe,ShipE:()=>Je,ShipF:()=>Ze,ShipG:()=>ti,ShipH:()=>ei});var ie=H(E());var Ue={components:{solid:!0,appearance:{glyph:"#",layer:c.Ship,fg:ie.Colors.DARK_GRAY}}},qe={components:{ship:x("A",0)},children:[f("Hull",0,0,{appearance:{glyph:m.Pilcrow}})]},ze={components:{ship:x("B",0)},children:[f("Hull",0,0,{appearance:{glyph:m.Yen}})]},Qe={components:{ship:x("C",0)},children:[f("Hull",0,0,{appearance:{glyph:"W"}})]},Xe={components:{ship:x("D",0)},children:[f("Hull",0,0,{appearance:{glyph:m.Omega}})]},Je={components:{ship:x("E",0)},children:[f("Hull",0,0,{appearance:{glyph:m.DownWedge}})]},Ze={components:{ship:x("F",0)},children:[f("Hull",0,0,{appearance:{glyph:m.Pi}})]},ti={components:{ship:x("G",0)},children:[f("Hull",0,0,{appearance:{glyph:"M"}})]},ei={components:{ship:x("H",0)},children:[f("Hull",0,0,{appearance:{glyph:m.Female}})]},ii={components:{ship:x("Drone A",1)},children:[f("Hull",0,0,{appearance:{glyph:m.Theta}})]},oi={components:{ship:x("Drone B",1)},children:[f("Hull",0,0,{appearance:{glyph:m.SymbolED}})]},ni={components:{ship:x("Drone C",1)},children:[f("Hull",0,0,{appearance:{glyph:m.Silcrow}})]},ri={components:{ship:x("Cruisey Wing",10,5)},children:[f("Hull",0,0,{appearance:{glyph:m.Not}}),f("Hull",1,0,{appearance:{glyph:m.HorizontalDivide}}),f("Hull",2,0,{appearance:{glyph:m.NotFlip}})]},si={components:{ship:x("Olm",15,4)},children:[f("Hull",0,0,{appearance:{glyph:m.Cent}}),f("Hull",0,1,{appearance:{glyph:m.ResizeVertical}}),f("Hull",0,2,{appearance:{glyph:m.BoxDownSingleHorizontalDouble}})]},ai={components:{ship:x("Gout-'o-flame",5,20)},children:[f("Hull",0,0,{appearance:{glyph:m.Pentagon}}),f("Hull",1,0,{appearance:{glyph:m.BoxVerticalDoubleHorizontalSingle}}),f("Hull",2,0,{appearance:{glyph:m.Pentagon}}),f("Hull",1,1,{appearance:{glyph:m.BoxUpDoubleHorizontalSingle}})]},li={components:{ship:x("Demigod",30,15)},children:[f("Hull",1,0,{appearance:{glyph:m.CapitalUUmlaut}}),f("Hull",0,1,{appearance:{glyph:"}"}}),f("Hull",1,1,{appearance:{glyph:m.RingInvert}}),f("Hull",2,1,{appearance:{glyph:"{"}}),f("Hull",1,2,{appearance:{glyph:"Y"}})]};var pi=v(v(v(v(v(v(v({},yt),gt),bt),xt),Pt),wt),St);function Ht(e,t){return e.add(new L(e,t).applyPrefab(t,pi[t]))}function T(e){return typeof e=="undefined"?NaN:Math.floor(e)}function M(e){return{x:T(e.x),y:T(e.y)}}function W(e,t){let i=M(e),o=M(t);return i.x===o.x&&i.y===o.y}function C(e,t){return{x:e.x+t.x,y:e.y+t.y}}var U=class{constructor(t,i=[]){this.compareFn=t;this.entities=i;this.dirty=!0}clear(){this.entities=[],this.dirty=!1}add(t){this.entities.push(t),this.dirty=!0}clearDead(){this.entities=this.entities.filter(t=>t.alive)}sort(){this.entities.sort(this.compareFn),this.dirty=!1}get(){return this.dirty&&this.sort(),this.entities.slice()}};var d=H(E());var Y=H(E());function mi(e,t){if(!t||!e.length)throw new Error("Could not get midpoint");let i=o=>e.reduce((n,{offset:r})=>n+r[o],0)/e.length;return{x:t.x+i("x"),y:t.y+i("y")}}function fi(e,t,i,o=[]){let n=[];for(let{offset:r}of t){let s=C(i,r),{wall:a,solid:l}=e.getContents(s,o);a?n.push({absolute:s,offset:r,entity:"wall"}):l&&n.push({absolute:s,offset:r,entity:l})}return n}function D(e,t){let i=e.getRoot(t);return e.entities.get().filter(o=>e.getRoot(o)===i)}function q(e,t){return D(e,t).map(i=>i.id)}function A(e,t){var a;let i=(a=e.getRoot(t).position)!=null?a:{x:0,y:0},o=D(e,t),n=[],r=0,s=0;for(let l of o){let{attachment:p,solid:h}=l;if(p&&h){let{x:u,y:w}=p;n.push({absolute:C(i,p),offset:{x:u,y:w},entity:l}),r=Math.max(u+1,r),s=Math.max(w+1,s)}}return{layout:n,topLeft:i,width:r,height:s}}function oe(e,t,i){let o=q(e,t),{layout:n,topLeft:r}=A(e,t);return!i||!r?[]:fi(e,n,i||r,o)}function O(e,t){let{layout:i,topLeft:o}=A(e,t);if(!o||!i.length)throw new Error(`Could not get midpoint of entity#${t.id}`);return mi(i,o)}var y=class{constructor(t,i){this.list=t;this.filter=i}matches(t){if(!t.alive)return!1;for(let i of this.filter)if(!t[i])return!1;return!0}forEach(t){for(let i of this.list.get())this.matches(i)&&t(i,i)}};var vt=[{x:-1,y:-1},{x:-1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1},{x:1,y:0},{x:1,y:-1},{x:0,y:-1}];function Tt(e){return vt.map(t=>C(e,t))}function k(e){if(!e.length)throw new Error("oneOf passed empty array");return e[Math.floor(Math.random()*e.length)]}function Mt(e){let t=new y(e.entities,["ai","position"]);e.on("tick",()=>t.forEach(({ai:i,position:o},n)=>{i.attacking||(i.attacking=e.player,e.fire("notice",{e:n,noticed:e.player}));let r=q(e,n),{layout:s}=A(e,n),a=M(o),l=e.getDistanceMap(i.attacking),p=b=>{let{solid:P,wall:B}=e.getContents(b,r);return!P&&!B},h=b=>p(b)?Math.abs(l.getOrDefault(b,1/0)-i.idealDistance):1/0,u=b=>s.reduce((P,{offset:B})=>P+h(C(b,B)),0)/s.length,w=u(a),S=[];for(let b of vt){let P=C(a,b);if(!l.has(P))continue;let B=u(P);B<w?(w=B,S=[P]):B===w&&S.push(P)}if(S.length){let b=k(S);n.move(b.x,b.y);return}})),e.on("damage",({e:i,inflicter:o})=>{var n;if(i!==o&&i.ai&&!i.ai.attacking){let r=e.getRoot((n=o.owner)!=null?n:o);r.alive&&(i.ai.attacking=r)}})}function Ct(e){let t=new y(e.entities,["appearance","position"]);e.on("draw",()=>t.forEach(({appearance:i,position:o})=>e.drawIfVisible(T(o.x),T(o.y),i.glyph,i.fg,i.bg,i.blendMode)))}var ne=H(E());var st=H(E());function N(e,t,i){return e*(1-i)+t*i}var z=class{constructor(t){this.points=t;this.sort()}sort(){this.points.sort(([t],[i])=>t-i)}add(t,i){return this.points.push([t,i]),this.sort(),this}get(t){let[i,o]=this.points[0];if(t<=i)return(0,st.fromRgb)(...o);let[n,r]=this.points[this.points.length-1];if(t>=n)return(0,st.fromRgb)(...r);let s=this.points.findIndex(([Ee])=>Ee>t),[a,[l,p,h,u]]=this.points[s-1],[w,[S,b,P,B]]=this.points[s],et=(t-a)/(w-a);return(0,st.fromRgb)(N(l,S,et),N(p,b,et),N(h,P,et),N(u,B,et))}};function Q(e,t){let i=Math.abs(e.x-t.x),o=Math.abs(e.y-t.y);return Math.sqrt(i*i+o*o)}var hi={fire:new z([[0,[0,0,0,0]],[2,[255,0,0,150]],[4,[255,255,0,150]],[6,[255,255,255,150]],[10,[255,255,255,255]]])};function Dt(e){if(!(e.intensity<=0))return{glyph:" ",layer:c.Effect,bg:hi[e.type].get(e.intensity),blendMode:ne.BlendMode.Add}}function re(e,t){let i=[],o=Math.floor(e.x-t),n=Math.ceil(e.x+t),r=Math.floor(e.y-t),s=Math.ceil(e.y+t);for(let a=r;a<=s;a++)for(let l=o;l<=n;l++){let p=Q(e,{x:l,y:a});p>=t||i.push({x:l,y:a,intensity:t-p})}return i}function At(e){e.on("kill",({e:t})=>{let{explodes:i,name:o,position:n}=t;if(i&&n)for(let{x:r,y:s,intensity:a}of re(n,i.size))e.add(new L(e,o+"Explosion").setPosition({x:r,y:s}).setField({type:"fire",intensity:a,falloff:i.falloff}))})}function kt(e){let t=new y(e.entities,["ship"]),i=new y(e.entities,["field","position"]);e.on("tick",()=>i.forEach(({field:o,position:n},r)=>{o.intensity-=o.falloff,r.setAppearance(Dt(o)),o.intensity<=0?e.kill(r):t.forEach((s,a)=>{let{layout:l}=A(e,a);l.find(({absolute:h})=>W(h,n))&&e.damage(a,o.intensity,r)})})),e.on("spawn",({e:o})=>{o.field&&o.setAppearance(Dt(o.field))})}var g=H(E());var G=H(E()),at=[0,G.Colors.DARK_RED,G.Colors.BROWN,G.Colors.LIGHT_RED,G.Colors.ORANGE,G.Colors.YELLOW,G.Colors.WHITE];var se=Math.PI*2;function _(e,t){return Math.atan2(t.y-e.y,t.x-e.x)}function ae(e,t){let i=(e-t)%se,o=(t-e)%se;return i<o?-i:o}function lt(e){let t=Math.cos(e.angle)*e.vel,i=Math.sin(e.angle)*e.vel;return[t,i]}function le(e){return e.salvo<=0?"Reloading":e.timer>0?"Chambering":"Ready"}function pe(e){e.timer>0&&(e.timer--,e.timer<=0&&e.salvo<=0&&(e.salvo=e.salvoCount))}function pt(e){return e.timer===0}function mt(e,t,i,o,n,r=[]){--t.salvo<=0?t.timer=t.timeBetweenSalvos:t.timer=t.timeBetweenShots;let s={x:i.x+.5,y:i.y+.5},a=t.bulletAngle==="nearestEnemy"?_(s,o):t.bulletAngle,l=e.spawn(t.bulletPrefab).setIgnoreSolid({ids:r}).move(s.x,s.y);return t.bulletVelocity&&l.setMotion({angle:a,vel:t.bulletVelocity}),l.ai||l.setOwner(n),l}function Bt(e,t){return t===1?e:e+"s"}var V=6;function me(e,t,i,o,n,r,s,a,l){let p=`${Math.ceil(n)}/${r}`,h=Math.floor(n/r*o);e.drawHLine(t,i,o," ",void 0,a),h&&e.drawHLine(t,i,h," ",void 0,s),e.drawCenteredString(t+o/2,i,p,l)}function ci(e,t,i,o){e.drawString(t,i,o.name,g.Colors.WHITE);let n=le(o);if(n==="Reloading"){e.drawString(t,i+1,`Reloading (${o.timer})`,g.Colors.LIGHT_RED);return}let r=`${o.salvo}/${o.salvoCount}`;e.drawString(t,i+1,r,g.Colors.YELLOW),n==="Chambering"&&e.drawString(t+r.length,i+1,` (${o.timer})`,g.Colors.BROWN)}function ft(e,t,i,o,n){let r=o[n];e.drawChar(t,i,n[0].toUpperCase(),g.Colors.WHITE),e.drawChar(t+1,i,r.toString(),at[r])}function It(e){let{mapHeight:t,term:i}=e;e.on("draw",()=>{let o=e.player,{pilot:n,ship:r}=o;i.fillRect(0,t,i.width,V," "),i.drawSingleBox(0,t,i.width,V,g.Colors.WHITE);let s=1,a=t+1,l=r.name,p=Math.max(10,l.length-3),h=p+3;i.drawString(s,a,l,g.Colors.WHITE),i.drawString(s,a+1,"HP:",g.Colors.WHITE),me(i,s+3,a+1,p,r.hp,r.maxHp,g.Colors.DARK_GREEN,g.Colors.DARK_RED,g.Colors.WHITE),i.drawString(s,a+2,"Sh:",g.Colors.WHITE),me(i,s+3,a+2,p,r.shield,r.maxShield,g.Colors.DARK_CYAN,g.Colors.LIGHT_BLUE,g.Colors.WHITE);let u=s+Math.floor((h-11)/2);ft(i,u,a+3,n,"body"),ft(i,u+3,a+3,n,"mind"),ft(i,u+6,a+3,n,"spirit"),ft(i,u+9,a+3,n,"talent"),s+=h+1,i.drawChar(s-1,a-1,m.BoxDownSingleHorizontalSingle,g.Colors.WHITE),i.drawVLine(s-1,a,V-2,m.BoxVerticalSingle,g.Colors.WHITE),i.drawChar(s-1,a+V-2,m.BoxUpSingleHorizontalSingle,g.Colors.WHITE);for(let w of o.player.weaponArrays){let S=D(e,o).filter(P=>P.turret),b=s;for(let P of S)ci(i,b,a+1,P.turret),b+=15;i.drawString(s,a,`${w} ${Bt("Weapon",S.length)}`,g.Colors.LIGHT_CYAN)}})}function Rt(e){let t=new y(e.entities,["homing","motion","position"]);e.on("tick",()=>t.forEach(({homing:i,motion:o,position:n},r)=>{var p;if(!((p=i.target)!=null&&p.alive))return;let s=O(e,i.target),a=_(n,s),l=ae(o.angle,a);Math.abs(l)<=i.strength?o.angle=a:l<0?o.angle-=i.strength:o.angle+=i.strength,--i.duration<=0&&(r.setHoming(),r.setTrail())}))}function Lt(e){let t=new y(e.entities,["lifetime"]);e.on("tick",()=>t.forEach(({lifetime:i},o)=>{--i.duration<=0&&e.kill(o)}))}function fe(e,t){let i=t.x-e.x,o=t.y-e.y,n=Math.abs(i),r=Math.abs(o),s=i>0?1:-1,a=o>0?1:-1,l=v({},e),p=[v({},l)];for(let h=0,u=0;h<n||u<r;)(.5+h)/n<(.5+u)/r?(l.x+=s,h++):(l.y+=a,u++),p.push(v({},l));return p}function he(e,t,i){let o=[],n=(r,s)=>{let a=T(r),l=T(s);o.find(p=>p.x===a&&p.y===l)||o.push({x:a,y:l})};for(let r=0;r<=Math.floor(i*Math.sqrt(.5));r++){let s=Math.floor(Math.sqrt(i*i-r*r));n(e-s,t+r),n(e+s,t+r),n(e-s,t-r),n(e+s,t-r),n(e+r,t-s),n(e+r,t+s),n(e-r,t-s),n(e-r,t+s)}return o}function Ft(e){let t=new y(e.entities,["motion","position"]);e.on("tick",()=>t.forEach(({motion:i,position:o,projectile:n,ignoreSolid:r},s)=>{let[a,l]=lt(i),p={x:o.x+a,y:o.y+l},h=fe(M(o),M(p)),u=!1,w;for(let S of h){if(!e.inBounds(S)){e.kill(s);return}e.move(s,S);let{wall:b,solid:P}=e.getContents(S,r==null?void 0:r.ids);if(b){u=!0;break}else if(P){w=P;break}}u?e.kill(s):w?(n&&e.damage(w,n.damage,s),e.kill(s)):e.move(s,p)}))}function Gt(e){e.on("playerMove",({move:t})=>{let i=e.player,o=C(i.position,t);oe(e,i,o).length||(i.move(o.x,o.y),e.tick())}),e.on("playerFire",({array:t})=>{let i=e.player,o=i.player.weaponArrays[t],n=D(e,i),r=n.filter(a=>a.tags.has(o)),s=!1;for(let a of r)a.turret&&pt(a.turret)&&(mt(e,a.turret,a.position,{x:0,y:0},i,n.map(l=>l.id)),s=!0);s&&e.tick()})}function Kt(e){let t=new y(e.entities,["pilot","ship"]);e.on("tick",()=>t.forEach(({pilot:i,ship:o})=>{let n=i.body;o.shield=Math.min(o.maxShield,o.shield+n)}))}var ce=["Typical","Healthy","Double","Multi","Drain","StarPilot","Mega"];var I=H(E());var di={name:"Basic",difficulty:0,body:1,mind:1,spirit:1,talent:1,class:[]},ui=[di],de=ui;var yi={name:"Bodini",difficulty:4,body:3,mind:2,spirit:3,talent:2,class:[]},gi=[yi],ue=gi;function Wt(e,t=0){let i=[];for(let o=t;o<e;o++)i.push(o);return i}function ht(e,t){let{ship:i}=e;if(!i)throw new Error(`Cannot put pilot into entity ${e.name} (no ship)`);e.setPilot(t),i.maxHp+=t.body}function Ot(e){for(let t=e.length-1;t>0;t--){let i=Math.floor(Math.random()*(t+1));[e[t],e[i]]=[e[i],e[t]]}return e}var bi=e=>["DroneA","DroneB","DroneC"].includes(e),xi=e=>["Healthy","Multi","Mega"].includes(e),Pi={Typical:{fg:I.Colors.DARK_GRAY},Healthy:{fg:I.Colors.DARK_GREEN},Double:{fg:I.Colors.LIGHT_GRAY},Multi:{fg:I.Colors.DARK_MAGENTA},Drain:{fg:I.Colors.DARK_RED},StarPilot:{fg:I.Colors.YELLOW},Mega:{fg:I.Colors.BLACK,bg:I.Colors.DARK_MAGENTA}};var Ei={Typical:0,Healthy:2,Double:3,Multi:6,Drain:4,StarPilot:8,Mega:20},wi=["ShipA","ShipB","ShipC","ShipD","ShipE","ShipF","ShipG","ShipH","DroneA","DroneB","DroneC","CruiseyWing","Olm","GoutOFlame","Demigod"],Si={ShipA:1,ShipB:1,ShipC:1,ShipD:1,ShipE:1,ShipF:1,ShipG:1,ShipH:1,DroneA:2,DroneB:2,DroneC:2,CruiseyWing:8,Olm:10,GoutOFlame:20,Demigod:40};function Hi(e,t){if(!bi(e))return t==="StarPilot"||t==="Mega"?k(ue):k(de)}function ye(e,t){var i;for(;;){let o=k(wi),n=k(ce),r=Hi(o,n),s=Ei[n]+Si[o]+((i=r==null?void 0:r.difficulty)!=null?i:0);if(s<=t){let a=e.spawn(o),{ship:l}=a;if(!l)throw new Error(`Ship prefab ${o} doesn't have a ship component!`);xi(n)&&(l.maxHp=l.maxHp*2+3),r&&ht(a,r),l.hp=l.maxHp,l.shield=l.maxShield;let p=Pi[n];for(let h of D(e,a))h.appearance&&Object.assign(h.appearance,p);return{entity:a,difficulty:s}}}}function vi(e,t,i,o,n){for(let r=0;r<n;r++)for(let s=0;s<o;s++){let{wall:a,solid:l,other:p}=e.getContents({x:t+s,y:i+r});if(a||l||p.length)return!1}return!0}function ge(e,t,i){for(let o=0;o<5;o++){let n=Ot(Wt(e.term.width-t));for(let r of n)if(vi(e,r,o,t,i))return{x:r,y:o}}throw new Error(`Could not find spawn position for ${t}x${i}!`)}function Nt(e){let t=0;e.on("tick",()=>{if(t++,!(t%10)){let i=Math.ceil(t/20),{entity:o}=ye(e,i),{width:n,height:r}=A(e,o),s=ge(e,n,r);o.move(s.x,s.y)}})}function _t(e){e.on("move",({e:t,old:i,pos:o})=>{t.trail&&!W(i,o)&&e.spawn(t.trail.effectPrefab).setPosition(i)})}function Vt(e){let t=new y(e.entities,["position","turret"]);e.on("tick",()=>t.forEach(({position:i,turret:o},n)=>{var a;let r=e.getRoot(n),s=(a=r.ai)==null?void 0:a.attacking;if(pe(o),!!(s!=null&&s.alive)&&pt(o)&&s){let l=O(e,s),p=mt(e,o,i,l,r,q(e,n));p.homing&&(p.homing.target=s),p.ai&&(p.ai.attacking=s)}}))}function be(e){Lt(e),Rt(e),Vt(e),kt(e),Kt(e),Ft(e),Mt(e),Nt(e),Ct(e),It(e),_t(e),At(e),Gt(e)}function xe(e,t,i){for(let o of e.entities.get()){let{motion:n,projectile:r,position:s}=o;if(n&&r&&s&&Q(t,s)<=i){let a=_(t,s);n.angle=a,o.setIgnoreSolid()}}for(let o of he(t.x,t.y,i))e.spawn("AirFistRange").setPosition(o)}var X=class{constructor(t,i,o){this.g=t;this.shipPrefab=i;this.pilot=o;this.dirty=!0}init(){let{g:t}=this;t.clearEventHandlers(),t.entities.clear(),t.blankMap(),t.player=this.makePlayer();let{width:i,height:o}=A(t,t.player);t.player.move(T(t.mapWidth/2-i/2),t.mapHeight-o-4),be(t)}makePlayer(){let{g:t,shipPrefab:i,pilot:o}=this,n=t.spawn(i);return ht(n,o),n.ship.hp=n.ship.maxHp,n.ship.shield=n.ship.maxShield,n}draw(){let{map:t,mapWidth:i,mapHeight:o,overlays:n,term:r}=this.g;for(let s=0;s<o;s++)for(let a=0;a<i;a++){let l=t.grid[s][a];r.drawChar(a,s,0,l.fg,l.bg)}if(this.g.fire("draw",void 0),this.dirty=!1,this.showOverlay){let s=n.get(this.showOverlay);if(s)for(let a=0;a<o;a++)for(let l=0;l<i;l++){let p=s.get({x:l,y:a})||1/0,h=p===1/0?"-":p<10?`${p}`:"*";r.drawChar(l,a,h,Y.Colors.LIGHT_RED)}}}update(){this.handleKeys(),this.dirty&&this.draw()}handleKeys(){let{player:t,term:i}=this.g,o=i.getMovementKey();if(o){this.g.fire("playerMove",{move:o});return}if(i.isKeyPressed(Y.Key.VK_1)){this.g.fire("playerFire",{array:0});return}if(i.isKeyPressed(Y.Key.VK_2)){this.g.fire("playerFire",{array:1});return}if(i.isKeyPressed(Y.Key.VK_F)){xe(this.g,O(this.g,t),4.5),this.g.tick();return}}};var J=class{constructor(t,i=5,o=100){this.g=t;this.starfieldSpeed=i;this.starCount=o}init(){this.dirty=!0,this.pilot={name:"Player",difficulty:NaN,body:1,mind:1,spirit:1,talent:1,class:[]},this.points=6,this.starfieldCounter=0,this.stars=[];for(let t=0;t<this.starCount;t++)this.stars.push(this.newStar())}draw(){let{term:t}=this.g;t.clear();for(let s of this.stars){let{x:a,y:l}=M(s);t.drawChar(a,l,s.c,s.fg)}let i=t.width/2;t.drawCenteredString(i,2,"Bullet Hell Roguelike",d.Colors.WHITE),t.drawCenteredString(i,9,"Create your Pilot",d.Colors.WHITE),t.drawCenteredString(i,10,`${this.points} points`,d.Colors.YELLOW);let o=2,n=Math.floor((t.width-o*2)/4),r=o+n/2;this.drawStat("body",r),this.drawStat("mind",r+n),this.drawStat("spirit",r+n*2),this.drawStat("talent",r+n*3),this.points===0&&t.drawCenteredString(i,20,"Hit Enter to begin!",d.Colors.WHITE),this.dirty=!1}drawStat(t,i){let{term:o}=this.g,n=`(${t[0].toUpperCase()})${t.slice(1)}`,r=this.pilot[t];o.drawCenteredString(i,13,n,d.Colors.LIGHT_CYAN),o.drawCenteredString(i,14,r.toString(),at[r])}update(){this.handleStarfield(),this.handleKeys(),this.dirty&&this.draw()}newStar(){let{term:t}=this.g,i=k([d.Colors.DARK_RED,d.Colors.LIGHT_RED,d.Colors.YELLOW,d.Colors.LIGHT_CYAN,d.Colors.WHITE]),o=.5+Math.random(),n=o<.75?".":o<1.25?m.Dot:"*",r=Math.random()*Math.PI*2;return{x:t.width/2,y:t.height/2,c:n,fg:i,vel:o,angle:r}}handleStarfield(){if(this.starfieldCounter<this.starfieldSpeed){this.starfieldCounter++;return}this.starfieldCounter=0,this.dirty=!0;let{width:t,height:i}=this.g.term;for(let o of this.stars){let[n,r]=lt(o);o.x+=n,o.y+=r,(o.x<0||o.x>=t||o.y<0||o.y>=i)&&Object.assign(o,this.newStar())}}isPressed(t,i){let o=this.g.term.isKeyDown(d.Key.VK_SHIFT_LEFT)||this.g.term.isKeyDown(d.Key.VK_SHIFT_RIGHT);return this.g.term.isKeyPressed(t)&&i===o}changeStat(t,i){let o=this.pilot[t]+i;if(o<1||o>6)return!1;this.points-=i,this.pilot[t]=o,this.dirty=!0}handleKeys(){this.points>0&&(this.isPressed(d.Key.VK_B,!1)&&this.changeStat("body",1),this.isPressed(d.Key.VK_M,!1)&&this.changeStat("mind",1),this.isPressed(d.Key.VK_S,!1)&&this.changeStat("spirit",1),this.isPressed(d.Key.VK_T,!1)&&this.changeStat("talent",1)),this.isPressed(d.Key.VK_B,!0)&&this.changeStat("body",-1),this.isPressed(d.Key.VK_M,!0)&&this.changeStat("mind",-1),this.isPressed(d.Key.VK_S,!0)&&this.changeStat("spirit",-1),this.isPressed(d.Key.VK_T,!0)&&this.changeStat("talent",-1),this.points===0&&this.g.term.isKeyPressed(d.Key.VK_ENTER)&&this.g.setMode(new X(this.g,"PlayerShip",this.pilot))}};var Z=class{constructor(t){this.keyFn=t;this.items=new Map}has(t){return this.items.has(this.keyFn(t))}get(t){return this.items.get(this.keyFn(t))}getOrDefault(t,i){let o=this.items.get(this.keyFn(t));return typeof o!="undefined"?o:i}getOrDie(t){let i=this.keyFn(t),o=this.items.get(i);if(typeof o=="undefined")throw new Error(`Invalid key: ${i}`);return o}set(t,i){this.items.set(this.keyFn(t),i)}};function Yt(e,t,i=1/0){let o=[],n=new Z(r=>`${r.x},${r.y}`);for(let r of e)o.push(r),n.set(r,0);for(;o.length;){let r=o.shift(),s=n.getOrDie(r)+1;if(!(s>i))for(let a of Tt(r))!n.has(a)&&t(a)&&(n.set(a,s),o.push(a))}return n}function $t(e){return typeof e!="undefined"}var tt=class{constructor(t,i,o){this.term=t;this.mapWidth=i;this.mapHeight=o;t.update=this.update.bind(this),this.map=new Pe.Console(i,o,()=>!0),this.lastEntityId=0,this.entities=new U(Zt),this.overlays=new Map,this.clearEventHandlers(),this.setMode(new J(this))}setMode(t){this.mode=t,this.mode.init()}clearEventHandlers(){this.eventCallbacks=Jt(te.map(t=>[t,[]]))}fire(t,i){for(let o of this.eventCallbacks[t])o(i)}on(t,i){this.eventCallbacks[t].push(i)}spawn(t){return Ht(this,t)}refresh(){this.mode.dirty=!0}add(t){return this.refresh(),this.entities.add(t),this.fire("spawn",{e:t}),t}kill(t,i){t.alive&&(t.kill(i),this.fire("kill",{e:t,by:i}))}move(t,i){let o=t.position;t.move(i.x,i.y),o&&this.fire("move",{e:t,old:o,pos:i})}blankMap(){let{map:t,mapHeight:i,mapWidth:o}=this;t.clear();for(let n=0;n<i;n++)for(let r=0;r<o;r++)t.setBlocked(r,n,!1),t.setBlockedSight(r,n,!1);t.computeFov(0,0,1/0)}drawIfVisible(t,i,o,n,r,s){this.map.isVisible(t,i)&&(s?this.term.drawCell(t,i,{bg:r},s):this.term.drawChar(t,i,o,n,r))}getRoot(t){return t.attachment?this.getRoot(t.attachment.parent):t}getContents(t,i=[]){let o=M(t);if(!this.inBounds(o))return{wall:!0,other:[]};let n=this.map.isBlocked(o.x,o.y),r=this.entities.get().filter(a=>a.position&&W(o,a.position)),s=r.filter(a=>!i.includes(a.id)).find(a=>a.solid);return{wall:n,solid:s,other:r.filter(a=>!a.solid)}}tick(){this.overlays.clear(),this.fire("tick",void 0),this.entities.clearDead()}update(){this.mode.update()}inBounds(t){return t.x>=0&&t.y>=0&&t.x<this.mapWidth&&t.y<this.mapHeight}getDistanceMap(t){let i=`${t.id}.distance`,o=this.overlays.get(i);return o||(o=Yt(D(this,t).map(n=>n.position).filter($t),this.inBounds.bind(this)),this.overlays.set(i,o)),o}damage(t,i,o){let n=this.getRoot(t);if(!n.ship)return;let r=i;n.ship.shield>0&&(n.ship.shield>i?(n.ship.shield-=i,r=0):(r-=n.ship.shield,n.ship.shield=0)),r&&(n.ship.hp-=r),console.log(o.name,"hits",n.name,"for",i),this.fire("damage",{e:n,inflicter:o,amount:i}),n.ship.hp<=0&&this.kill(n,o)}};function Ti(e){let o=ct.DEFAULT_FONT,n=document.createElement("div");e.appendChild(n);let r=()=>{let p=60*o.charWidth,h=40*o.charHeight,u=Math.floor(window.innerWidth/p),w=Math.floor(window.innerHeight/h),S=Math.min(u,w);n.style.width=`${p*S}px`,n.style.height=`${h*S}px`};window.addEventListener("resize",r),r();let s=document.createElement("canvas");n.appendChild(s),requestAnimationFrame(()=>s.focus());let a=new ct.Terminal(s,60,40,{font:o}),l=new tt(a,60,40-V);window.g=l}window.addEventListener("load",()=>Ti(document.body));})();
//# sourceMappingURL=bundle.js.map
