"use strict";(()=>{var Jt=Object.create;var Y=Object.defineProperty;var Zt=Object.getOwnPropertyDescriptor;var zt=Object.getOwnPropertyNames,wt=Object.getOwnPropertySymbols,te=Object.getPrototypeOf,kt=Object.prototype.hasOwnProperty,ee=Object.prototype.propertyIsEnumerable;var Mt=(e,t,i)=>t in e?Y(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i,E=(e,t)=>{for(var i in t||={})kt.call(t,i)&&Mt(e,i,t[i]);if(wt)for(var i of wt(t))ee.call(t,i)&&Mt(e,i,t[i]);return e};var ie=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),C=(e,t)=>{for(var i in t)Y(e,i,{get:t[i],enumerable:!0})},oe=(e,t,i,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of zt(t))!kt.call(e,n)&&n!==i&&Y(e,n,{get:()=>t[n],enumerable:!(o=Zt(t,n))||o.enumerable});return e};var w=(e,t,i)=>(i=e!=null?Jt(te(e)):{},oe(t||!e||!e.__esModule?Y(i,"default",{value:e,enumerable:!0}):i,e));var x=ie((Be,Tt)=>{Tt.exports=globalThis.wglt});var y=w(x());function K(e,t=new Map){if(!e||typeof e!="object")return e;if(t.has(e))return t.get(e);let i;if(e.nodeType&&"cloneNode"in e)i=e.cloneNode(!0),t.set(e,i);else if(e instanceof Date)i=new Date(e.getTime()),t.set(e,i);else if(e instanceof RegExp)i=new RegExp(e),t.set(e,i);else if(Array.isArray(e)){i=new Array(e.length),t.set(e,i);for(let o=0;o<e.length;o++)i[o]=K(e[o],t)}else if(e instanceof Map){i=new Map,t.set(e,i);for(let[o,n]of e.entries())i.set(o,K(n,t))}else if(e instanceof Set){i=new Set,t.set(e,i);for(let o of e)i.add(K(o,t))}else if(e instanceof Object){i={},t.set(e,i);for(let[o,n]of Object.entries(e))i[o]=K(n,t)}else throw Error(`Unable to clone ${e}`);return i}function At(e){return K(e,new Map)}var Z=At,Ct=Object.keys,Ht=e=>{let t={};for(let[i,o]of e)t[i]=o;return t};var T=class{constructor(t,i){this.g=t;this.name=i;this.alive=!0,this.id=++t.lastEntityId,this.solid=!1,this.tags=new Set}applyPrefab(t,i){if(this.prefab=t,i.components&&Object.assign(this,Z(i.components)),i.children)for(let{name:o,x:n,y:r,overlay:s,tags:a}of i.children){let l=this.g.spawn(o).setAttachment({parent:this,x:n,y:r});if(s)for(let p of Ct(s))Object.assign(l[p],Z(s[p]));if(a)for(let p of a)l.tags.add(p)}return this}get[Symbol.toStringTag](){return this.name}kill(t){return this.alive=!1,this.eachChild(i=>this.g.kill(i,t)),this}eachChild(t){var i;for(let o of this.g.entities.get())((i=o.attachment)==null?void 0:i.parent)===this&&t(o,o.attachment)}setOwner(t){return this.owner=t,this}setAI(t){return this.ai=t,this}setAppearance(t){return this.g.dirty=!0,this.appearance=t,this}setAttachment(t){return this.attachment=t,this}setExplodes(t){return this.explodes=t,this}setField(t){return this.field=t,this}setHoming(t){return this.homing=t,this}setIgnoreSolid(t){return this.ignoreSolid=t,this}setLifetime(t){return this.lifetime=t,this}setMotion(t){return this.motion=t,this}setPilot(t){return this.pilot=t,this}setPosition(t){return this.g.dirty=!0,this.position=t,this}setShip(t){return this.ship=t,this}setTrail(t){return this.trail=t,this}setTurret(t){return this.turret=t,this}setPlayer(t){return this.player=t,this}setProjectile(t){return this.projectile=t,this}setSolid(t){return this.solid=t,this}move(t,i){return this.g.dirty=!0,this.position={x:t,y:i},this.eachChild((o,n)=>o.move(t+n.x,i+n.y)),this}};function Bt(e,t){var n,r,s,a;let i=(r=(n=e.appearance)==null?void 0:n.layer)!=null?r:0,o=(a=(s=t.appearance)==null?void 0:s.layer)!=null?a:0;return i!==o?i-o:e.id-t.id}var St=["damage","draw","kill","move","notice","playerFire","playerMove","spawn","tick"];function b(e){return typeof e=="undefined"?NaN:Math.floor(e)}function k(e){return{x:b(e.x),y:b(e.y)}}function H(e,t){let i=k(e),o=k(t);return i.x===o.x&&i.y===o.y}function P(e,t){return{x:e.x+t.x,y:e.y+t.y}}function ne(e,t){if(!t||!e.length)throw new Error("Could not get midpoint");let i=o=>e.reduce((n,{offset:r})=>n+r[o],0)/e.length;return{x:t.x+i("x"),y:t.y+i("y")}}function re(e,t,i,o=[]){let n=[];for(let{offset:r}of t){let s=P(i,r),{wall:a,solid:l}=e.getContents(s,o);a?n.push({absolute:s,offset:r,entity:"wall"}):l&&n.push({absolute:s,offset:r,entity:l})}return n}function B(e,t){let i=e.getRoot(t);return e.entities.get().filter(o=>e.getRoot(o)===i)}function O(e,t){return B(e,t).map(i=>i.id)}function S(e,t){var s;let i=e.getRoot(t),o=(s=e.getRoot(t).position)!=null?s:{x:0,y:0},n=B(e,t),r=[];for(let a of n){let{attachment:l,solid:p}=a;if(l&&p){let{x:f,y:c}=l;r.push({absolute:P(o,l),offset:{x:f,y:c},entity:a})}}return{layout:r,topLeft:o}}function Ft(e,t,i){let o=O(e,t),{layout:n,topLeft:r}=S(e,t);return!i||!r?[]:re(e,n,i||r,o)}function F(e,t){let{layout:i,topLeft:o}=S(e,t);if(!o||!i.length)throw new Error(`Could not get midpoint of entity#${t.id}`);return ne(i,o)}var tt={};C(tt,{Battleship:()=>se,BattleshipHull:()=>ae});var z=w(x());var Rt=(r=>(r[r.Effect=0]="Effect",r[r.Ship=1]="Ship",r[r.Gun=2]="Gun",r[r.Bullet=3]="Bullet",r[r.Player=4]="Player",r))(Rt||{}),m=Rt;var se={components:{ai:{idealDistance:8,speed:1},ship:{name:"Battleship",hp:40,maxHp:40}},children:[{name:"BattleshipHull",x:1,y:0},{name:"BattleshipHull",x:2,y:0},{name:"BattleshipHull",x:0,y:1},{name:"BattleshipHull",x:1,y:1},{name:"BattleshipHull",x:2,y:1},{name:"MachineGun",x:0,y:1},{name:"HomingMissileLauncher",x:2,y:1},{name:"FighterLauncher",x:2,y:0}]},ae={components:{solid:!0,appearance:{glyph:"/",layer:m.Ship,fg:z.Colors.WHITE,bg:z.Colors.BROWN}}};var et={};C(et,{Bullet:()=>le,HomingMissile:()=>pe,PlayerBullet:()=>me});var $=w(x());var It="",Lt="",Dt="\x1B",Kt="\xAD";var le={components:{projectile:{damage:1},appearance:{glyph:".",layer:m.Bullet,fg:$.Colors.YELLOW}}},pe={components:{projectile:{damage:1},homing:{strength:.15,duration:10},trail:{effectPrefab:"SmokePuff"},explodes:{size:5,falloff:1},appearance:{glyph:"*",layer:m.Bullet,fg:$.Colors.DARK_RED}}},me={components:{projectile:{damage:1},appearance:{glyph:Kt,layer:m.Bullet,fg:$.Colors.YELLOW}}};var it={};C(it,{AirFistRange:()=>fe,SmokePuff:()=>ce});var R=w(x());var fe={components:{lifetime:{duration:2},appearance:{glyph:" ",layer:m.Effect,bg:(0,R.fromRgb)(0,255,255,100),blendMode:R.BlendMode.Add}}},ce={components:{lifetime:{duration:2},appearance:{glyph:" ",layer:m.Effect,bg:(0,R.fromRgb)(100,100,100,50),blendMode:R.BlendMode.Add}}};var ot={};C(ot,{Fighter:()=>ue,FighterHull:()=>de,FighterLauncher:()=>he});var Q=w(x());var A=({bulletPrefab:e="Bullet",bulletVelocity:t=1,salvoCount:i=1,timeBetweenShots:o=1,timeBetweenSalvos:n=1})=>({bulletPrefab:e,bulletVelocity:t,salvoCount:i,timeBetweenShots:o,timeBetweenSalvos:n,timer:0,salvo:i});var he={components:{appearance:{glyph:"_",layer:m.Gun,fg:Q.Colors.DARK_CYAN},turret:A({bulletPrefab:"Fighter",bulletVelocity:0,salvoCount:1,timeBetweenSalvos:20})}},ue={components:{ai:{idealDistance:6,speed:2},ship:{name:"Fighter",hp:2,maxHp:2}},children:[{name:"FighterHull",x:0,y:0,overlay:{appearance:{glyph:"<"}}},{name:"FighterHull",x:1,y:0},{name:"FighterHull",x:2,y:0,overlay:{appearance:{glyph:">"}}},{name:"PeaShooter",x:1,y:0}]},de={components:{solid:!0,appearance:{glyph:"-",layer:m.Ship,fg:Q.Colors.YELLOW,bg:Q.Colors.DARK_BLUE}}};var nt={};C(nt,{HomingMissileLauncher:()=>ge,MachineGun:()=>ye,PeaShooter:()=>be,PlayerGun:()=>Ee});var G=w(x());var ye={components:{appearance:{glyph:"o",layer:m.Gun,fg:G.Colors.WHITE},turret:A({bulletPrefab:"Bullet",bulletVelocity:2,salvoCount:5,timeBetweenShots:0,timeBetweenSalvos:12})}},ge={components:{appearance:{glyph:"o",layer:m.Gun,fg:G.Colors.YELLOW},turret:A({bulletPrefab:"HomingMissile",bulletVelocity:1,salvoCount:1,timeBetweenSalvos:8})}},be={components:{appearance:{glyph:"o",layer:m.Gun,fg:G.Colors.LIGHT_GRAY},turret:A({bulletPrefab:"Bullet",bulletVelocity:2,salvoCount:1,timeBetweenSalvos:3})}},Ee={components:{appearance:{glyph:"o",layer:m.Gun,fg:G.Colors.WHITE},turret:A({bulletPrefab:"PlayerBullet",bulletVelocity:2,salvoCount:2,timeBetweenShots:0,timeBetweenSalvos:3})}};var rt={};C(rt,{PlayerHull:()=>xe,PlayerShip:()=>Pe});var I=w(x());var xe={components:{solid:!0,appearance:{glyph:"#",layer:m.Player,fg:I.Colors.WHITE,bg:I.Colors.DARK_RED}}},Pe={components:{player:{weaponArrays:["primary"]},ship:{name:"Your Ship",hp:20,maxHp:20}},children:[{name:"PlayerHull",x:0,y:0,overlay:{appearance:{glyph:Dt,bg:I.Colors.DARK_RED}}},{name:"PlayerHull",x:1,y:0,overlay:{appearance:{glyph:It,bg:I.Colors.DARK_RED}}},{name:"PlayerHull",x:2,y:0,overlay:{appearance:{glyph:Lt,bg:I.Colors.DARK_RED}}},{name:"PlayerGun",x:1,y:0,tags:["primary"]}]};var ve=E(E(E(E(E(E({},tt),et),it),ot),nt),rt);function st(e,t){return e.add(new T(e,t).applyPrefab(t,ve[t]))}var V=class{constructor(t,i=[]){this.compareFn=t;this.entities=i;this.dirty=!0}clear(){this.entities=[],this.dirty=!1}add(t){this.entities.push(t),this.dirty=!0}clearDead(){this.entities=this.entities.filter(t=>t.alive)}sort(){this.entities.sort(this.compareFn),this.dirty=!1}get(){return this.dirty&&this.sort(),this.entities.slice()}};var we={name:"Ace"},Me=[we],Ot=Me;var h=class{constructor(t,i){this.list=t;this.filter=i}matches(t){if(!t.alive)return!1;for(let i of this.filter)if(!t[i])return!1;return!0}forEach(t){for(let i of this.list.get())this.matches(i)&&t(i,i)}};var at=[{x:-1,y:-1},{x:-1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1},{x:1,y:0},{x:1,y:-1},{x:0,y:-1}];function lt(e){return at.map(t=>P(e,t))}function pt(e){if(!e.length)throw new Error("oneOf passed empty array");return e[Math.floor(Math.random()*e.length)]}function mt(e){let t=new h(e.entities,["ai","position"]);e.on("tick",()=>t.forEach(({ai:i,position:o},n)=>{i.attacking||(i.attacking=e.player,e.fire("notice",{e:n,noticed:e.player}));let r=O(e,n),{layout:s}=S(e,n),a=k(o),l=e.getDistanceMap(i.attacking),p=u=>{let{solid:d,wall:M}=e.getContents(u,r);return!d&&!M},f=u=>p(u)?Math.abs(l.getOrDefault(u,1/0)-i.idealDistance):1/0,c=u=>s.reduce((d,{offset:M})=>d+f(P(u,M)),0)/s.length,g=c(a),v=[];for(let u of at){let d=P(a,u);if(!l.has(d))continue;let M=c(d);M<g?(g=M,v=[d]):M===g&&v.push(d)}if(v.length){let u=pt(v);n.move(u.x,u.y);return}})),e.on("damage",({e:i,inflicter:o})=>{if(i!==o&&i.ai&&!i.ai.attacking){let n=e.getRoot(o);n.alive&&(i.ai.attacking=n)}})}function ft(e){let t=new h(e.entities,["appearance","position"]);e.on("draw",()=>t.forEach(({appearance:i,position:o})=>e.drawIfVisible(b(o.x),b(o.y),i.glyph,i.fg,i.bg,i.blendMode)))}var Gt=w(x());var X=w(x());function L(e,t,i){return e*(1-i)+t*i}var N=class{constructor(t){this.points=t;this.sort()}sort(){this.points.sort(([t],[i])=>t-i)}add(t,i){return this.points.push([t,i]),this.sort(),this}get(t){let[i,o]=this.points[0];if(t<=i)return(0,X.fromRgb)(...o);let[n,r]=this.points[this.points.length-1];if(t>=n)return(0,X.fromRgb)(...r);let s=this.points.findIndex(([Ut])=>Ut>t),[a,[l,p,f,c]]=this.points[s-1],[g,[v,u,d,M]]=this.points[s],q=(t-a)/(g-a);return(0,X.fromRgb)(L(l,v,q),L(p,u,q),L(f,d,q),L(c,M,q))}};function W(e,t){let i=Math.abs(e.x-t.x),o=Math.abs(e.y-t.y);return Math.sqrt(i*i+o*o)}var ke={fire:new N([[0,[0,0,0,0]],[2,[255,0,0,150]],[4,[255,255,0,150]],[6,[255,255,255,150]],[10,[255,255,255,255]]])};function ct(e){if(!(e.intensity<=0))return{glyph:" ",layer:m.Effect,bg:ke[e.type].get(e.intensity),blendMode:Gt.BlendMode.Add}}function Vt(e,t){let i=[],o=Math.floor(e.x-t),n=Math.ceil(e.x+t),r=Math.floor(e.y-t),s=Math.ceil(e.y+t);for(let a=r;a<=s;a++)for(let l=o;l<=n;l++){let p=W(e,{x:l,y:a});p>=t||i.push({x:l,y:a,intensity:t-p})}return i}function ht(e){e.on("kill",({e:t})=>{let{explodes:i,name:o,position:n}=t;if(i&&n)for(let{x:r,y:s,intensity:a}of Vt(n,i.size))e.add(new T(e,o+"Explosion").setPosition({x:r,y:s}).setField({type:"fire",intensity:a,falloff:i.falloff}))})}function ut(e){let t=new h(e.entities,["hull"]),i=new h(e.entities,["field","position"]);e.on("tick",()=>i.forEach(({field:o,position:n},r)=>{o.intensity-=o.falloff,r.setAppearance(ct(o)),o.intensity<=0?e.kill(r):t.forEach(({},s)=>{let{layout:a}=S(e,s);a.find(({absolute:p})=>H(p,n))&&e.damage(s,o.intensity,r)})})),e.on("spawn",({e:o})=>{o.field&&o.setAppearance(ct(o.field))})}var Nt=Math.PI*2;function D(e,t){return Math.atan2(t.y-e.y,t.x-e.x)}function Wt(e,t){let i=(e-t)%Nt,o=(t-e)%Nt;return i<o?-i:o}function jt(e){let t=Math.cos(e.angle)*e.vel,i=Math.sin(e.angle)*e.vel;return[t,i]}function dt(e){let t=new h(e.entities,["homing","motion","position"]);e.on("tick",()=>t.forEach(({homing:i,motion:o,position:n},r)=>{var p;if(!((p=i.target)!=null&&p.alive))return;let s=F(e,i.target),a=D(n,s),l=Wt(o.angle,a);Math.abs(l)<=i.strength?o.angle=a:l<0?o.angle-=i.strength:o.angle+=i.strength,--i.duration<=0&&(r.setHoming(),r.setTrail())}))}function yt(e){let t=new h(e.entities,["lifetime"]);e.on("tick",()=>t.forEach(({lifetime:i},o)=>{--i.duration<=0&&e.kill(o)}))}function _t(e,t){let i=t.x-e.x,o=t.y-e.y,n=Math.abs(i),r=Math.abs(o),s=i>0?1:-1,a=o>0?1:-1,l=E({},e),p=[E({},l)];for(let f=0,c=0;f<n||c<r;)(.5+f)/n<(.5+c)/r?(l.x+=s,f++):(l.y+=a,c++),p.push(E({},l));return p}function qt(e,t,i){let o=[],n=(r,s)=>{let a=b(r),l=b(s);o.find(p=>p.x===a&&p.y===l)||o.push({x:a,y:l})};for(let r=0;r<=Math.floor(i*Math.sqrt(.5));r++){let s=Math.floor(Math.sqrt(i*i-r*r));n(e-s,t+r),n(e+s,t+r),n(e-s,t-r),n(e+s,t-r),n(e+r,t-s),n(e+r,t+s),n(e-r,t-s),n(e-r,t+s)}return o}function gt(e){let t=new h(e.entities,["motion","position"]);e.on("tick",()=>t.forEach(({motion:i,position:o,projectile:n,ignoreSolid:r},s)=>{let[a,l]=jt(i),p={x:o.x+a,y:o.y+l},f=_t(k(o),k(p)),c=!1,g;for(let v of f){if(!e.inBounds(v)){e.kill(s);return}e.move(s,v);let{wall:u,solid:d}=e.getContents(v,r==null?void 0:r.ids);if(u){c=!0;break}else if(d){g=d;break}}c?e.kill(s):g?(n&&e.damage(g,n.damage,s),e.kill(s)):e.move(s,p)}))}function Yt(e){if(e.timer>0){e.timer--,e.timer<=0&&e.salvo<=0&&(e.salvo=e.salvoCount);return}}function U(e){return e.timer===0}function J(e,t,i,o,n,r=[]){--t.salvo<=0?t.timer=t.timeBetweenSalvos:t.timer=t.timeBetweenShots;let s={x:i.x+.5,y:i.y+.5},a=e.spawn(t.bulletPrefab).setIgnoreSolid({ids:r}).move(s.x,s.y);return t.bulletVelocity&&a.setMotion({angle:D(s,o),vel:t.bulletVelocity}),a.ai||a.setOwner(n),a}function bt(e){e.on("playerMove",({move:t})=>{let i=e.player,o=P(i.position,t);Ft(e,i,o).length||(i.move(o.x,o.y),e.tick())}),e.on("playerFire",({array:t})=>{let i=e.player,o=i.player.weaponArrays[t],n=B(e,i),r=n.filter(a=>a.tags.has(o)),s=!1;for(let a of r){if(!a.turret)continue;let l=a.position,p=P(l,{x:.5,y:-.5});U(a.turret)&&(J(e,a.turret,l,p,i,n.map(f=>f.id)),s=!0)}s&&e.tick()})}function Et(e){e.on("move",({e:t,old:i,pos:o})=>{t.trail&&!H(i,o)&&e.spawn(t.trail.effectPrefab).setPosition(i)})}function xt(e){let t=new h(e.entities,["position","turret"]);e.on("tick",()=>t.forEach(({position:i,turret:o},n)=>{var a;let r=e.getRoot(n),s=(a=r.ai)==null?void 0:a.attacking;if(Yt(o),!!(s!=null&&s.alive)&&U(o)&&s){let l=F(e,s),p=J(e,o,i,l,r,O(e,n));p.homing&&(p.homing.target=s),p.ai&&(p.ai.attacking=s)}}))}function $t(e){yt(e),dt(e),xt(e),ut(e),gt(e),mt(e),ft(e),Et(e),ht(e),bt(e)}var j=class{constructor(t){this.keyFn=t;this.items=new Map}has(t){return this.items.has(this.keyFn(t))}get(t){return this.items.get(this.keyFn(t))}getOrDefault(t,i){let o=this.items.get(this.keyFn(t));return typeof o!="undefined"?o:i}getOrDie(t){let i=this.keyFn(t),o=this.items.get(i);if(typeof o=="undefined")throw new Error(`Invalid key: ${i}`);return o}set(t,i){this.items.set(this.keyFn(t),i)}};function Pt(e,t,i=1/0){let o=[],n=new j(r=>`${r.x},${r.y}`);for(let r of e)o.push(r),n.set(r,0);for(;;){let r=o.shift();if(!r)break;let s=n.getOrDie(r)+1;if(!(s>i))for(let a of lt(r))!n.has(a)&&t(a)&&(n.set(a,s),o.push(a))}return n}function Qt(e,t,i){for(let o of e.entities.get()){let{motion:n,projectile:r,position:s}=o;if(n&&r&&s&&W(t,s)<=i){let a=D(t,s);n.angle=a,o.setIgnoreSolid()}}for(let o of qt(t.x,t.y,i))e.spawn("AirFistRange").setPosition(o)}function vt(e){return typeof e!="undefined"}var Te=60,Ae=40,_=class{constructor(t,i=Te,o=Ae){this.term=t;this.mapWidth=i;this.mapHeight=o;t.update=this.update.bind(this),this.dirty=!0,this.map=new y.Console(i,o,()=>!0),this.lastEntityId=0,this.entities=new V(Bt),this.overlays=new Map,this.eventCallbacks=Ht(St.map(n=>[n,[]])),$t(this)}fire(t,i){for(let o of this.eventCallbacks[t])o(i)}on(t,i){this.eventCallbacks[t].push(i)}spawn(t){return st(this,t)}add(t){return this.dirty=!0,this.entities.add(t),this.fire("spawn",{e:t}),t}kill(t,i){t.alive&&(t.kill(i),this.fire("kill",{e:t,by:i}))}move(t,i){let o=t.position;t.move(i.x,i.y),o&&this.fire("move",{e:t,old:o,pos:i})}gotoDemoRoom(){this.entities.clear(),this.blankMap(),this.player=this.spawn("PlayerShip").move(b(this.mapWidth/2)-1,this.mapHeight-5).setPilot(Ot[0]),this.spawn("Battleship").move(8,5)}blankMap(){let{map:t,mapHeight:i,mapWidth:o}=this;t.clear();for(let n=0;n<i;n++)for(let r=0;r<o;r++)t.setBlocked(r,n,!1),t.setBlockedSight(r,n,!1);t.computeFov(0,0,1/0)}drawIfVisible(t,i,o,n,r,s){this.map.isVisible(t,i)&&(s?this.term.drawCell(t,i,{bg:r},s):this.term.drawChar(t,i,o,n,r))}draw(){let{map:t,mapWidth:i,mapHeight:o,player:n,term:r}=this;for(let s=0;s<o;s++)for(let a=0;a<i;a++){let l=t.grid[s][a],p=t.isVisible(a,s),f=l.blockedSight,c=y.Colors.BLACK;p?(c=f?y.Colors.WHITE:y.Colors.DARK_GRAY,l.explored=!0):l.explored&&(c=f?y.Colors.LIGHT_GRAY:y.Colors.BLACK),r.drawChar(a,s,0,0,c)}if(this.fire("draw",void 0),this.dirty=!1,this.showOverlay){let s=this.overlays.get(this.showOverlay);if(s)for(let a=0;a<o;a++)for(let l=0;l<i;l++){let p=s.get({x:l,y:a})||1/0,f=p===1/0?"-":p<10?`${p}`:"*";r.drawChar(l,a,f,y.Colors.LIGHT_RED)}}}getRoot(t){var o;let i=(o=t.owner)!=null?o:t;return i.attachment?this.getRoot(i.attachment.parent):i}getContents(t,i=[]){let o=k(t);if(!this.inBounds(o))return{wall:!0};let n=this.map.isBlocked(o.x,o.y),r=this.entities.get().filter(a=>a.position&&H(o,a.position)),s=r.filter(a=>!i.includes(a.id)).find(a=>a.solid);return{wall:n,solid:s,other:r.filter(a=>!a.solid)}}tick(){this.overlays.clear(),this.fire("tick",void 0),this.entities.clearDead()}handleKeys(){let t=this.term.getMovementKey();if(t){this.fire("playerMove",{move:t});return}if(this.term.isKeyPressed(y.Key.VK_1)){this.fire("playerFire",{array:0});return}if(this.term.isKeyPressed(y.Key.VK_2)){this.fire("playerFire",{array:1});return}if(this.term.isKeyPressed(y.Key.VK_F)){Qt(this,F(this,this.player),4.5),this.tick();return}}update(){this.handleKeys(),this.dirty&&this.draw()}saveOverlay(t,i,o){this.overlays.set(`${t.id}.${i}`,o)}inBounds(t){return t.x>=0&&t.y>=0&&t.x<this.mapWidth&&t.y<this.mapHeight}getDistanceMap(t){let i=`${t.id}.distance`,o=this.overlays.get(i);return o||(o=Pt(B(this,t).map(n=>n.position).filter(vt),this.inBounds.bind(this)),this.overlays.set(i,o)),o}damage(t,i,o){let n=this.getRoot(t);n.ship&&(n.ship.hp-=i,console.log(o.name,"hits",n.name,"for",i),this.fire("damage",{e:n,inflicter:o,amount:i}),n.ship.hp<=0&&this.kill(n,o))}};var Xt=w(x());function Ce(e){let o=document.createElement("div");e.appendChild(o);let n=()=>{let f=Math.floor(window.innerWidth/480),c=Math.floor(window.innerHeight/320),g=Math.min(f,c);o.style.width=`${480*g}px`,o.style.height=`${320*g}px`};window.addEventListener("resize",n),n();let r=document.createElement("canvas");o.appendChild(r),requestAnimationFrame(()=>r.focus());let s=new Xt.Terminal(r,60,40),a=new _(s);a.gotoDemoRoom(),window.g=a}window.addEventListener("load",()=>Ce(document.body));})();
//# sourceMappingURL=bundle.js.map
