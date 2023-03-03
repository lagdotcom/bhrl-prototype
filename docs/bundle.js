"use strict";(()=>{var qt=Object.create;var W=Object.defineProperty;var _t=Object.getOwnPropertyDescriptor;var $t=Object.getOwnPropertyNames,vt=Object.getOwnPropertySymbols,Yt=Object.getPrototypeOf,Mt=Object.prototype.hasOwnProperty,Qt=Object.prototype.propertyIsEnumerable;var wt=(e,t,o)=>t in e?W(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,g=(e,t)=>{for(var o in t||={})Mt.call(t,o)&&wt(e,o,t[o]);if(vt)for(var o of vt(t))Qt.call(t,o)&&wt(e,o,t[o]);return e};var Xt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),A=(e,t)=>{for(var o in t)W(e,o,{get:t[o],enumerable:!0})},Ut=(e,t,o,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of $t(t))!Mt.call(e,n)&&n!==o&&W(e,n,{get:()=>t[n],enumerable:!(i=_t(t,n))||i.enumerable});return e};var x=(e,t,o)=>(o=e!=null?qt(Yt(e)):{},Ut(t||!e||!e.__esModule?W(o,"default",{value:e,enumerable:!0}):o,e));var b=Xt((Ee,kt)=>{kt.exports=globalThis.wglt});var E=x(b());function D(e,t=new Map){if(!e||typeof e!="object")return e;if(t.has(e))return t.get(e);let o;if(e.nodeType&&"cloneNode"in e)o=e.cloneNode(!0),t.set(e,o);else if(e instanceof Date)o=new Date(e.getTime()),t.set(e,o);else if(e instanceof RegExp)o=new RegExp(e),t.set(e,o);else if(Array.isArray(e)){o=new Array(e.length),t.set(e,o);for(let i=0;i<e.length;i++)o[i]=D(e[i],t)}else if(e instanceof Map){o=new Map,t.set(e,o);for(let[i,n]of e.entries())o.set(i,D(n,t))}else if(e instanceof Set){o=new Set,t.set(e,o);for(let i of e)o.add(D(i,t))}else if(e instanceof Object){o={},t.set(e,o);for(let[i,n]of Object.entries(e))o[i]=D(n,t)}else throw Error(`Unable to clone ${e}`);return o}function Tt(e){return D(e,new Map)}var Q=Tt,Ct=Object.keys,At=e=>{let t={};for(let[o,i]of e)t[o]=i;return t};var T=class{constructor(t,o){this.g=t;this.name=o;this.alive=!0,this.id=++t.lastEntityId,this.solid=!1}applyPrefab(t,o){if(this.prefab=t,o.components&&Object.assign(this,Q(o.components)),o.children)for(let{name:i,x:n,y:r,overlay:s}of o.children){let a=this.g.spawn(i).setAttachment({parent:this,x:n,y:r});if(s)for(let l of Ct(s))Object.assign(a[l],Q(s[l]))}return this}get[Symbol.toStringTag](){return this.name}kill(t){return this.alive=!1,this.eachChild(o=>this.g.kill(o,t)),this}eachChild(t){var o;for(let i of this.g.entities.get())((o=i.attachment)==null?void 0:o.parent)===this&&t(i,i.attachment)}setAI(t){return this.ai=t,this}setAppearance(t){return this.g.dirty=!0,this.appearance=t,this}setAttachment(t){return this.attachment=t,this}setExplodes(t){return this.explodes=t,this}setField(t){return this.field=t,this}setHoming(t){return this.homing=t,this}setHull(t){return this.hull=t,this}setIgnoreSolid(t){return this.ignoreSolid=t,this}setLifetime(t){return this.lifetime=t,this}setMotion(t){return this.motion=t,this}setPosition(t){return this.g.dirty=!0,this.position=t,this}setTrail(t){return this.trail=t,this}setTurret(t){return this.turret=t,this}setPlayer(t){return this.player=t,this}setProjectile(t){return this.projectile=t,this}setSolid(t){return this.solid=t,this}move(t,o){return this.g.dirty=!0,this.position={x:t,y:o},this.eachChild((i,n)=>i.move(t+n.x,o+n.y)),this.position}};function Ht(e,t){var n,r,s,a;let o=(r=(n=e.appearance)==null?void 0:n.layer)!=null?r:0,i=(a=(s=t.appearance)==null?void 0:s.layer)!=null?a:0;return o!==i?o-i:e.id-t.id}var Rt=["damage","draw","kill","move","notice","playerMove","spawn","tick"];function P(e){return typeof e=="undefined"?NaN:Math.floor(e)}function k(e){return{x:P(e.x),y:P(e.y)}}function H(e,t){let o=k(e),i=k(t);return o.x===i.x&&o.y===i.y}function v(e,t){return{x:e.x+t.x,y:e.y+t.y}}function Jt(e,t){if(!t||!e.length)throw new Error("Could not get midpoint");let o=i=>e.reduce((n,{offset:r})=>n+r[i],0)/e.length;return{x:t.x+o("x"),y:t.y+o("y")}}function Zt(e,t,o,i=[]){let n=[];for(let{offset:r}of t){let s=v(o,r),{wall:a,solid:l}=e.getContents(s,i);a?n.push({absolute:s,offset:r,entity:"wall"}):l&&n.push({absolute:s,offset:r,entity:l})}return n}function q(e,t){let o=e.getRoot(t);return e.entities.get().filter(i=>e.getRoot(i)===o)}function K(e,t){return q(e,t).map(o=>o.id)}function R(e,t){var s;let o=e.getRoot(t),i=(s=e.getRoot(t).position)!=null?s:{x:0,y:0},n=q(e,t),r=[];for(let a of n){let{attachment:l,solid:m}=a;if(l&&m){let{x:f,y:p}=l;r.push({absolute:v(i,l),offset:{x:f,y:p},entity:a})}}return{layout:r,topLeft:i}}function Bt(e,t,o){let i=K(e,t),{layout:n,topLeft:r}=R(e,t);return!o||!r?[]:Zt(e,n,o||r,i)}function B(e,t){let{layout:o,topLeft:i}=R(e,t);if(!i||!o.length)throw new Error(`Could not get midpoint of entity#${t.id}`);return Jt(o,i)}var U={};A(U,{Battleship:()=>zt,BattleshipHull:()=>te});var X=x(b());var Ft=(r=>(r[r.Effect=0]="Effect",r[r.Ship=1]="Ship",r[r.Gun=2]="Gun",r[r.Bullet=3]="Bullet",r[r.Player=4]="Player",r))(Ft||{}),c=Ft;var zt={components:{ai:{idealDistance:8,speed:1,visionRange:10},hull:{hp:40,maxHp:40}},children:[{name:"BattleshipHull",x:1,y:0},{name:"BattleshipHull",x:2,y:0},{name:"BattleshipHull",x:0,y:1},{name:"BattleshipHull",x:1,y:1},{name:"BattleshipHull",x:2,y:1},{name:"MachineGun",x:0,y:1},{name:"HomingMissileLauncher",x:2,y:1},{name:"FighterLauncher",x:2,y:0}]},te={components:{solid:!0,appearance:{glyph:"/",layer:c.Ship,fg:X.Colors.WHITE,bg:X.Colors.BROWN}}};var Z={};A(Z,{Bullet:()=>ee,HomingMissile:()=>oe});var J=x(b());var ee={components:{projectile:{damage:1},appearance:{glyph:".",layer:c.Bullet,fg:J.Colors.YELLOW}}},oe={components:{projectile:{damage:1},homing:{strength:.15,duration:10},trail:{effectPrefab:"SmokePuff"},explodes:{size:5,falloff:1},appearance:{glyph:"*",layer:c.Bullet,fg:J.Colors.DARK_RED}}};var z={};A(z,{AirFistRange:()=>ie,SmokePuff:()=>ne});var F=x(b());var ie={components:{lifetime:{duration:2},appearance:{glyph:" ",layer:c.Effect,bg:(0,F.fromRgb)(0,255,255,100),blendMode:F.BlendMode.Add}}},ne={components:{lifetime:{duration:2},appearance:{glyph:" ",layer:c.Effect,bg:(0,F.fromRgb)(100,100,100,50),blendMode:F.BlendMode.Add}}};var tt={};A(tt,{Fighter:()=>se,FighterHull:()=>ae,FighterLauncher:()=>re});var _=x(b());var I=({bulletPrefab:e="Bullet",bulletVelocity:t=1,salvoCount:o=1,timeBetweenShots:i=1,timeBetweenSalvos:n=1})=>({bulletPrefab:e,bulletVelocity:t,salvoCount:o,timeBetweenShots:i,timeBetweenSalvos:n,timer:0,salvo:o});var re={components:{appearance:{glyph:"_",layer:c.Gun,fg:_.Colors.DARK_CYAN},turret:I({bulletPrefab:"Fighter",bulletVelocity:0,salvoCount:1,timeBetweenSalvos:20})}},se={components:{ai:{idealDistance:6,speed:2,visionRange:5},hull:{hp:2,maxHp:2}},children:[{name:"FighterHull",x:0,y:0,overlay:{appearance:{glyph:"<"}}},{name:"FighterHull",x:1,y:0},{name:"FighterHull",x:2,y:0,overlay:{appearance:{glyph:">"}}},{name:"PeaShooter",x:1,y:0}]},ae={components:{solid:!0,appearance:{glyph:"-",layer:c.Ship,fg:_.Colors.YELLOW,bg:_.Colors.DARK_BLUE}}};var et={};A(et,{HomingMissileLauncher:()=>me,MachineGun:()=>le,PeaShooter:()=>fe});var $=x(b());var le={components:{appearance:{glyph:"o",layer:c.Gun,fg:$.Colors.WHITE},turret:I({bulletPrefab:"Bullet",bulletVelocity:2,salvoCount:5,timeBetweenShots:0,timeBetweenSalvos:12})}},me={components:{appearance:{glyph:"o",layer:c.Gun,fg:$.Colors.YELLOW},turret:I({bulletPrefab:"HomingMissile",bulletVelocity:1,salvoCount:1,timeBetweenSalvos:8})}},fe={components:{appearance:{glyph:"o",layer:c.Gun,fg:$.Colors.LIGHT_GRAY},turret:I({bulletPrefab:"Bullet",bulletVelocity:2,salvoCount:1,timeBetweenSalvos:3})}};var it={};A(it,{Player:()=>ce,PlayerHull:()=>pe});var ot=x(b());var pe={components:{solid:!0,appearance:{glyph:"#",layer:c.Player,fg:ot.Colors.WHITE,bg:ot.Colors.DARK_RED}}},ce={components:{player:{visionRange:20},hull:{hp:20,maxHp:20}},children:[{name:"PlayerHull",x:0,y:0},{name:"PlayerHull",x:1,y:0,overlay:{appearance:{glyph:">"}}}]};var ue=g(g(g(g(g(g({},U),Z),z),tt),et),it);function nt(e,t){return e.add(new T(e,t).applyPrefab(t,ue[t]))}var O=class{constructor(t,o=[]){this.compareFn=t;this.entities=o;this.dirty=!0}clear(){this.entities=[],this.dirty=!1}add(t){this.entities.push(t),this.dirty=!0}clearDead(){this.entities=this.entities.filter(t=>t.alive)}sort(){this.entities.sort(this.compareFn),this.dirty=!1}get(){return this.dirty&&this.sort(),this.entities.slice()}};var u=class{constructor(t,o){this.list=t;this.filter=o}matches(t){if(!t.alive)return!1;for(let o of this.filter)if(!t[o])return!1;return!0}forEach(t){for(let o of this.list.get())this.matches(o)&&t(o,o)}};function C(e,t){let o=Math.abs(e.x-t.x),i=Math.abs(e.y-t.y);return Math.sqrt(o*o+i*i)}var rt=[{x:-1,y:-1},{x:-1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1},{x:1,y:0},{x:1,y:-1},{x:0,y:-1}];function st(e){return rt.map(t=>v(e,t))}function at(e){if(!e.length)throw new Error("oneOf passed empty array");return e[Math.floor(Math.random()*e.length)]}function lt(e){let t=new u(e.entities,["ai","position"]);e.on("tick",()=>t.forEach(({ai:o,position:i},n)=>{if(!o.attacking){if(C(i,e.player.position)>=o.visionRange)return;o.attacking=e.player,e.fire("notice",{e:n,noticed:e.player})}let r=K(e,n),{layout:s}=R(e,n),a=k(i),l=e.getDistanceMap(o.attacking),m=d=>{let{solid:h,wall:M}=e.getContents(d,r);return!h&&!M},f=d=>m(d)?Math.abs(l.getOrDefault(d,1/0)-o.idealDistance):1/0,p=d=>s.reduce((h,{offset:M})=>h+f(v(d,M)),0)/s.length,y=p(a),w=[];for(let d of rt){let h=v(a,d);if(!l.has(h))continue;let M=p(h);M<y?(y=M,w=[h]):M===y&&w.push(h)}if(w.length){let d=at(w);n.move(d.x,d.y);return}}))}function mt(e){let t=new u(e.entities,["appearance","position"]);e.on("draw",()=>t.forEach(({appearance:o,position:i})=>e.drawIfVisible(P(i.x),P(i.y),o.glyph,o.fg,o.bg,o.blendMode)))}var It=x(b());var Y=x(b());function L(e,t,o){return e*(1-o)+t*o}var N=class{constructor(t){this.points=t;this.sort()}sort(){this.points.sort(([t],[o])=>t-o)}add(t,o){return this.points.push([t,o]),this.sort(),this}get(t){let[o,i]=this.points[0];if(t<=o)return(0,Y.fromRgb)(...i);let[n,r]=this.points[this.points.length-1];if(t>=n)return(0,Y.fromRgb)(...r);let s=this.points.findIndex(([Wt])=>Wt>t),[a,[l,m,f,p]]=this.points[s-1],[y,[w,d,h,M]]=this.points[s],j=(t-a)/(y-a);return(0,Y.fromRgb)(L(l,w,j),L(m,d,j),L(f,h,j),L(p,M,j))}};var de={fire:new N([[0,[0,0,0,0]],[2,[255,0,0,150]],[4,[255,255,0,150]],[6,[255,255,255,150]],[10,[255,255,255,255]]])};function ft(e){if(!(e.intensity<=0))return{glyph:" ",layer:c.Effect,bg:de[e.type].get(e.intensity),blendMode:It.BlendMode.Add}}function Lt(e,t){let o=[],i=Math.floor(e.x-t),n=Math.ceil(e.x+t),r=Math.floor(e.y-t),s=Math.ceil(e.y+t);for(let a=r;a<=s;a++)for(let l=i;l<=n;l++){let m=C(e,{x:l,y:a});m>=t||o.push({x:l,y:a,intensity:t-m})}return o}function pt(e){e.on("kill",({e:t})=>{let{explodes:o,name:i,position:n}=t;if(o&&n)for(let{x:r,y:s,intensity:a}of Lt(n,o.size))e.add(new T(e,i+"Explosion").setPosition({x:r,y:s}).setField({type:"fire",intensity:a,falloff:o.falloff}))})}function ct(e){let t=new u(e.entities,["hull"]),o=new u(e.entities,["field","position"]);e.on("tick",()=>o.forEach(({field:i,position:n},r)=>{i.intensity-=i.falloff,r.setAppearance(ft(i)),i.intensity<=0?e.kill(r):t.forEach(({},s)=>{let{layout:a}=R(e,s);a.find(({absolute:m})=>H(m,n))&&e.damage(s,i.intensity,r)})})),e.on("spawn",({e:i})=>{i.field&&i.setAppearance(ft(i.field))})}var St=Math.PI*2;function S(e,t){return Math.atan2(t.y-e.y,t.x-e.x)}function Dt(e,t){let o=(e-t)%St,i=(t-e)%St;return o<i?-o:i}function Kt(e){let t=Math.cos(e.angle)*e.vel,o=Math.sin(e.angle)*e.vel;return[t,o]}function ut(e){let t=new u(e.entities,["homing","motion","position"]);e.on("tick",()=>t.forEach(({homing:o,motion:i,position:n},r)=>{if(!o.target)return;let s=B(e,o.target),a=S(n,s),l=Dt(i.angle,a);Math.abs(l)<=o.strength?i.angle=a:l<0?i.angle-=o.strength:i.angle+=o.strength,--o.duration<=0&&(r.setHoming(),r.setTrail())}))}function dt(e){let t=new u(e.entities,["lifetime"]);e.on("tick",()=>t.forEach(({lifetime:o},i)=>{--o.duration<=0&&e.kill(i)}))}function Ot(e,t){let o=t.x-e.x,i=t.y-e.y,n=Math.abs(o),r=Math.abs(i),s=o>0?1:-1,a=i>0?1:-1,l=g({},e),m=[g({},l)];for(let f=0,p=0;f<n||p<r;)(.5+f)/n<(.5+p)/r?(l.x+=s,f++):(l.y+=a,p++),m.push(g({},l));return m}function Nt(e,t,o){let i=[],n=(r,s)=>{let a=P(r),l=P(s);i.find(m=>m.x===a&&m.y===l)||i.push({x:a,y:l})};for(let r=0;r<=Math.floor(o*Math.sqrt(.5));r++){let s=Math.floor(Math.sqrt(o*o-r*r));n(e-s,t+r),n(e+s,t+r),n(e-s,t-r),n(e+s,t-r),n(e+r,t-s),n(e+r,t+s),n(e-r,t-s),n(e-r,t+s)}return i}function ht(e){let t=new u(e.entities,["motion","position"]);e.on("tick",()=>t.forEach(({motion:o,position:i,projectile:n,ignoreSolid:r},s)=>{let[a,l]=Kt(o),m={x:i.x+a,y:i.y+l},f=Ot(k(i),k(m)),p=!1,y;for(let w of f){e.move(s,w);let{wall:d,solid:h}=e.getContents(w,r==null?void 0:r.ids);if(d){p=!0;break}else if(h){y=h;break}}p?e.kill(s):y?(n&&e.damage(y,n.damage,s),e.kill(s)):e.move(s,m)}))}function yt(e){e.on("playerMove",({move:t})=>{let o=e.player,i=v(o.position,t);Bt(e,o,i).length||(o.move(i.x,i.y),e.fovRecompute=!0,e.tick())})}function gt(e){e.on("move",({e:t,old:o,pos:i})=>{t.trail&&!H(o,i)&&e.spawn(t.trail.effectPrefab).setPosition(o)})}function bt(e,t){return e.timer?(e.timer--,e.timer<=0&&e.salvo<=0&&(e.salvo=e.salvoCount),!1):t?(--e.salvo<=0?e.timer=e.timeBetweenSalvos:e.timer=e.timeBetweenShots,!0):!1}function Et(e){let t=new u(e.entities,["position","turret"]);e.on("tick",()=>t.forEach(({position:o,turret:i},n)=>{var s;let r=(s=e.getRoot(n).ai)==null?void 0:s.attacking;if(bt(i,r)&&r){let a={x:o.x+.5,y:o.y+.5},l=B(e,r),m=e.spawn(i.bulletPrefab).setIgnoreSolid({ids:K(e,n)});m.move(a.x,a.y),i.bulletVelocity&&m.setMotion({angle:S(a,l),vel:i.bulletVelocity}),m.homing&&(m.homing.target=r),m.ai&&(m.ai.attacking=r)}}))}function Gt(e){dt(e),ut(e),Et(e),ct(e),ht(e),lt(e),mt(e),gt(e),pt(e),yt(e)}var G=class{constructor(t){this.keyFn=t;this.items=new Map}has(t){return this.items.has(this.keyFn(t))}get(t){return this.items.get(this.keyFn(t))}getOrDefault(t,o){let i=this.items.get(this.keyFn(t));return typeof i!="undefined"?i:o}getOrDie(t){let o=this.keyFn(t),i=this.items.get(o);if(typeof i=="undefined")throw new Error(`Invalid key: ${o}`);return i}set(t,o){this.items.set(this.keyFn(t),o)}};function xt(e,t,o=1/0){let i=[],n=new G(r=>`${r.x},${r.y}`);for(let r of e)i.push(r),n.set(r,0);for(;;){let r=i.shift();if(!r)break;let s=n.getOrDie(r)+1;if(!(s>o))for(let a of st(r))!n.has(a)&&t(a)&&(n.set(a,s),i.push(a))}return n}function Vt(e,t,o){for(let i of e.entities.get()){let{motion:n,projectile:r,position:s}=i;if(n&&r&&s&&C(t,s)<=o){let a=S(t,s);n.angle=a,i.setIgnoreSolid()}}for(let i of Nt(t.x,t.y,o))e.spawn("AirFistRange").setPosition(i)}function Pt(e){return typeof e!="undefined"}var he=60,ye=40,V=class{constructor(t,o=he,i=ye){this.term=t;this.mapWidth=o;this.mapHeight=i;t.update=this.update.bind(this),this.dirty=!0,this.fovRecompute=!0,this.map=new E.Console(o,i,()=>!0),this.lastEntityId=0,this.entities=new O(Ht),this.overlays=new Map,this.eventCallbacks=At(Rt.map(n=>[n,[]])),Gt(this)}get player(){let t=this.entities.get().find(o=>o.player);if(!t)throw new Error("Could not find a player!");return t}fire(t,o){for(let i of this.eventCallbacks[t])i(o)}on(t,o){this.eventCallbacks[t].push(o)}spawn(t){return nt(this,t)}add(t){return this.dirty=!0,this.entities.add(t),this.fire("spawn",{e:t}),t}kill(t,o){t.alive&&(t.kill(o),this.fire("kill",{e:t,by:o}))}move(t,o){let i=t.position;t.move(o.x,o.y),i&&this.fire("move",{e:t,old:i,pos:o})}gotoDemoRoom(){this.entities.clear(),this.map.clear(),this.room(1,1,40,30),this.spawn("Player").move(5,25),this.spawn("Battleship").move(8,5)}room(t,o,i,n){let{map:r}=this;for(let s=0;s<n;s++)for(let a=0;a<i;a++){let l=a===0||s===0||a===i-1||s===n-1,m=t+a,f=o+s;r.setBlocked(m,f,l),r.setBlockedSight(m,f,l)}}drawIfVisible(t,o,i,n,r,s){this.map.isVisible(t,o)&&(s?this.term.drawCell(t,o,{bg:r},s):this.term.drawChar(t,o,i,n,r))}draw(){let{map:t,mapWidth:o,mapHeight:i,player:n,term:r}=this;this.fovRecompute&&(t.computeFov(n.position.x,n.position.y,n.player.visionRange),this.fovRecompute=!1);for(let s=0;s<i;s++)for(let a=0;a<o;a++){let l=t.grid[s][a],m=t.isVisible(a,s),f=l.blockedSight,p=E.Colors.BLACK;m?(p=f?E.Colors.WHITE:E.Colors.DARK_GRAY,l.explored=!0):l.explored&&(p=f?E.Colors.LIGHT_GRAY:E.Colors.BLACK),r.drawChar(a,s,0,0,p)}if(this.fire("draw",void 0),this.dirty=!1,this.showOverlay){let s=this.overlays.get(this.showOverlay);if(s)for(let a=0;a<i;a++)for(let l=0;l<o;l++){let m=s.get({x:l,y:a})||1/0,f=m===1/0?"-":m<10?`${m}`:"*";r.drawChar(l,a,f,E.Colors.LIGHT_RED)}}}getRoot(t){return t.attachment?this.getRoot(t.attachment.parent):t}getContents(t,o=[]){let i=k(t),n=this.map.isBlocked(i.x,i.y),r=this.entities.get().filter(a=>a.position&&H(i,a.position)),s=r.filter(a=>!o.includes(a.id)).find(a=>a.solid);return{wall:n,solid:s,other:r.filter(a=>!a.solid)}}tick(){this.overlays.clear(),this.fire("tick",void 0),this.entities.clearDead()}handleKeys(){let t=this.term.getMovementKey();if(t){this.fire("playerMove",{move:t});return}if(this.term.isKeyPressed(E.Key.VK_F)){Vt(this,B(this,this.player),4.5),this.tick();return}}update(){this.handleKeys(),this.dirty&&this.draw()}saveOverlay(t,o,i){this.overlays.set(`${t.id}.${o}`,i)}inBounds(t){return t.x>=0&&t.y>=0&&t.x<this.mapWidth&&t.y<this.mapHeight}getDistanceMap(t){let o=`${t.id}.distance`,i=this.overlays.get(o);return i||(i=xt(q(this,t).map(n=>n.position).filter(Pt),this.inBounds.bind(this)),this.overlays.set(o,i)),i}damage(t,o,i){let n=this.getRoot(t);n.hull&&(n.hull.hp-=o,console.log(i.name,"hits",n.name,"for",o),this.fire("damage",{e:n,inflicter:i,amount:o}),n.hull.hp<=0&&this.kill(n,i))}};var jt=x(b());function ge(e){let i=document.createElement("div");e.appendChild(i);let n=()=>{let f=Math.floor(window.innerWidth/480),p=Math.floor(window.innerHeight/320),y=Math.min(f,p);i.style.width=`${480*y}px`,i.style.height=`${320*y}px`};window.addEventListener("resize",n),n();let r=document.createElement("canvas");i.appendChild(r),requestAnimationFrame(()=>r.focus());let s=new jt.Terminal(r,60,40),a=new V(s);a.gotoDemoRoom(),window.g=a}window.addEventListener("load",()=>ge(document.body));})();
//# sourceMappingURL=bundle.js.map
