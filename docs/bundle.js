"use strict";(()=>{var $e=Object.create;var xt=Object.defineProperty;var je=Object.getOwnPropertyDescriptor;var Ue=Object.getOwnPropertyNames,ue=Object.getOwnPropertySymbols,ze=Object.getPrototypeOf,ge=Object.prototype.hasOwnProperty,qe=Object.prototype.propertyIsEnumerable;var ye=(i,t,e)=>t in i?xt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,D=(i,t)=>{for(var e in t||={})ge.call(t,e)&&ye(i,e,t[e]);if(ue)for(var e of ue(t))qe.call(t,e)&&ye(i,e,t[e]);return i};var Qe=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports),_=(i,t)=>{for(var e in t)xt(i,e,{get:t[e],enumerable:!0})},Xe=(i,t,e,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Ue(t))!ge.call(i,r)&&r!==e&&xt(i,r,{get:()=>t[r],enumerable:!(o=je(t,r))||o.enumerable});return i};var g=(i,t,e)=>(e=i!=null?$e(ze(i)):{},Xe(t||!i||!i.__esModule?xt(e,"default",{value:i,enumerable:!0}):e,i));var u=Qe((lo,be)=>{be.exports=globalThis.wglt});var Tt=g(u());var Ve=g(u());var xe=["damage","draw","kill","move","notice","playerFire","playerMove","spawn","tick"];function rt(i,t=new Map){if(!i||typeof i!="object")return i;if(t.has(i))return t.get(i);let e;if(i.nodeType&&"cloneNode"in i)e=i.cloneNode(!0),t.set(i,e);else if(i instanceof Date)e=new Date(i.getTime()),t.set(i,e);else if(i instanceof RegExp)e=new RegExp(i),t.set(i,e);else if(Array.isArray(i)){e=new Array(i.length),t.set(i,e);for(let o=0;o<i.length;o++)e[o]=rt(i[o],t)}else if(i instanceof Map){e=new Map,t.set(i,e);for(let[o,r]of i.entries())e.set(o,rt(r,t))}else if(i instanceof Set){e=new Set,t.set(i,e);for(let o of i)e.add(rt(o,t))}else if(i instanceof Object){e={},t.set(i,e);for(let[o,r]of Object.entries(i))e[o]=rt(r,t)}else throw Error(`Unable to clone ${i}`);return e}function Ee(i){return rt(i,new Map)}var nt=Ee,Pe=Object.keys,we=i=>{let t={};for(let[e,o]of i)t[e]=o;return t};var V=class{constructor(t,e){this.g=t;this.name=e;this.alive=!0,this.id=++t.lastEntityId,this.solid=!1,this.tags=new Set}applyPrefab(t,e){if(this.prefab=t,e.components&&Object.assign(this,nt(e.components)),e.children)for(let{name:o,x:r,y:n,overlay:s,tags:a}of e.children){let l=this.g.spawn(o).setAttachment({parent:this,x:r,y:n});if(s)for(let p of Pe(s))Object.assign(l[p],nt(s[p]));if(a)for(let p of a)l.tags.add(p)}return this}get[Symbol.toStringTag](){return this.name}kill(t){return this.alive=!1,this.eachChild(e=>this.g.kill(e,t)),this}eachChild(t){var e;for(let o of this.g.entities.get())((e=o.attachment)==null?void 0:e.parent)===this&&t(o,o.attachment)}setAI(t){return this.ai=t,this}setAppearance(t){return this.g.refresh(),this.appearance=t,this}setAttachment(t){return this.attachment=t,this}setExplodes(t){return this.explodes=t,this}setField(t){return this.field=t,this}setHoming(t){return this.homing=t,this}setIgnoreSolid(t){return this.ignoreSolid=t,this}setLastMovement(t){return this.lastMovement=t,this}setLifetime(t){return this.lifetime=t,this}setMotion(t){return this.motion=t,this}setOrigin(t){return this.origin=t,this}setPilot(t){return this.pilot=t,this}setPosition(t){return this.g.refresh(),this.position=t,this}setShip(t){return this.ship=t,this}setTrail(t){return this.trail=t,this}setTurret(t){return this.turret=t,this}setPlayer(t){return this.player=t,this}setProjectile(t){return this.projectile=t,this}setSolid(t){return this.solid=t,this}move(t,e){return this.g.refresh(),this.position={x:t,y:e},this.eachChild((o,r)=>o.move(t+r.x,e+r.y)),this}};function Se(i,t){var r,n,s,a;let e=(n=(r=i.appearance)==null?void 0:r.layer)!=null?n:0,o=(a=(s=t.appearance)==null?void 0:s.layer)!=null?a:0;return e!==o?e-o:i.id-t.id}var It={};_(It,{Battleship:()=>Je,BattleshipHull:()=>Ze});var Rt=g(u());var ve=(n=>(n[n.Effect=0]="Effect",n[n.Ship=1]="Ship",n[n.Gun=2]="Gun",n[n.Bullet=3]="Bullet",n[n.Player=4]="Player",n))(ve||{}),d=ve;var h=(i,t,e,o,r)=>({name:i,x:t,y:e,overlay:o,tags:r}),b=(i,t,e=0)=>({name:i,maxHp:t,hp:0,maxShield:e,shield:0}),I=(i,t,{bulletPrefab:e="Bullet",bulletVelocity:o=1,salvoCount:r=1,timeBetweenShots:n=1,timeBetweenSalvos:s=1,ammunition:a=1/0})=>({name:i,bulletPrefab:e,bulletAngle:t,bulletVelocity:o,salvoCount:r,timeBetweenShots:n,timeBetweenSalvos:s,timer:0,salvo:r,ammunition:a});var Je={components:{ai:{idealDistance:8,speed:1},ship:b("Battleship",40)},children:[{name:"BattleshipHull",x:1,y:0},{name:"BattleshipHull",x:2,y:0},{name:"BattleshipHull",x:0,y:1},{name:"BattleshipHull",x:1,y:1},{name:"BattleshipHull",x:2,y:1},{name:"MachineGun",x:0,y:1},{name:"HomingMissileLauncher",x:2,y:1},{name:"FighterLauncher",x:2,y:0}]},Ze={components:{solid:!0,appearance:{glyph:"/",layer:d.Ship,fg:Rt.Colors.WHITE,bg:Rt.Colors.BROWN}}};var Bt={};_(Bt,{Bullet:()=>ei,DroneBullet:()=>ii,HomingMissile:()=>oi,PlayerBullet:()=>ri});var st=g(u());var ti={Diamond:"",Club:"",Dot:"\x07",Ring:"	",RingInvert:`
`,Female:"\f",Star:"",Pilcrow:"",Silcrow:"",ResizeVertical:"",UpArrow:"",DownArrow:"",RightArrow:"",LeftArrow:"\x1B",DownWedge:"",Pentagon:"\x7F",CapitalUUmlaut:"\x9A",Cent:"\x9B",Yen:"\x9D",NotFlip:"\xA9",Not:"\xAA",InvertedExclamation:"\xAD",BoxVerticalSingle:"\xB3",BoxUpSingleHorizontalSingle:"\xC1",BoxDownSingleHorizontalSingle:"\xC2",BoxHorizontalSingle:"\xC4",BoxUpDoubleHorizontalSingle:"\xD0",BoxDownSingleHorizontalDouble:"\xD1",BoxVerticalDoubleHorizontalSingle:"\xD7",Pi:"\xE3",Theta:"\xE9",Omega:"\xEA",SymbolED:"\xED",HorizontalDivide:"\xF6"},f=ti;var ei={components:{projectile:{damage:1},appearance:{glyph:f.InvertedExclamation,layer:d.Bullet,fg:st.Colors.YELLOW}}},ii={components:{projectile:{damage:1},appearance:{glyph:".",layer:d.Bullet,fg:st.Colors.ORANGE}}},oi={components:{projectile:{damage:1},homing:{strength:.15,duration:10},trail:{effectPrefab:"SmokePuff"},explodes:{size:5,falloff:1},appearance:{glyph:"*",layer:d.Bullet,fg:st.Colors.DARK_RED}}},ri={components:{projectile:{damage:3},appearance:{glyph:"!",layer:d.Bullet,fg:st.Colors.YELLOW}}};var Lt={};_(Lt,{AirFistRange:()=>ni,SmokePuff:()=>si});var J=g(u());var ni={components:{lifetime:{duration:2},appearance:{glyph:" ",layer:d.Effect,bg:(0,J.fromRgb)(0,255,255,100),blendMode:J.BlendMode.Add}}},si={components:{lifetime:{duration:2},appearance:{glyph:" ",layer:d.Effect,bg:(0,J.fromRgb)(100,100,100,50),blendMode:J.BlendMode.Add}}};var Gt={};_(Gt,{Fighter:()=>li,FighterHull:()=>pi,FighterLauncher:()=>ai});var Et=g(u());var ai={components:{appearance:{glyph:"_",layer:d.Gun,fg:Et.Colors.DARK_CYAN},turret:I("Fighter Bay","nearestEnemy",{bulletPrefab:"Fighter",bulletVelocity:0,salvoCount:1,timeBetweenSalvos:20})}},li={components:{ai:{idealDistance:6,speed:2},ship:b("Fighter",2)},children:[{name:"FighterHull",x:0,y:0,overlay:{appearance:{glyph:"<"}}},{name:"FighterHull",x:1,y:0},{name:"FighterHull",x:2,y:0,overlay:{appearance:{glyph:">"}}},{name:"PeaShooter",x:1,y:0}]},pi={components:{solid:!0,appearance:{glyph:"-",layer:d.Ship,fg:Et.Colors.YELLOW,bg:Et.Colors.DARK_BLUE}}};var kt={};_(kt,{DroneGun:()=>ui,HomingMissileLauncher:()=>hi,MachineGun:()=>fi,PeaShooter:()=>ci,PlayerGun:()=>di});var mi={Right:0,Down:Math.PI/2,Left:Math.PI,Up:Math.PI*3/2},Pt=mi;var wt=g(u());var fi={components:{appearance:{glyph:"o",layer:d.Gun,fg:wt.Colors.WHITE},turret:I("Machine Gun",Pt.Down,{bulletPrefab:"Bullet",bulletVelocity:2,salvoCount:5,timeBetweenShots:0,timeBetweenSalvos:12})}},hi={components:{appearance:{glyph:"o",layer:d.Gun,fg:wt.Colors.YELLOW},turret:I("Homing Missile","nearestEnemy",{bulletPrefab:"HomingMissile",bulletVelocity:1,salvoCount:1,timeBetweenSalvos:8})}},ci={components:{turret:I("Pea Shooter",Pt.Down,{bulletPrefab:"Bullet",bulletVelocity:2,salvoCount:1,timeBetweenSalvos:3})}},di={components:{appearance:{glyph:"o",layer:d.Gun,fg:wt.Colors.WHITE},turret:I("Pew Pew",Pt.Up,{bulletPrefab:"PlayerBullet",bulletVelocity:2,salvoCount:2,timeBetweenShots:0,timeBetweenSalvos:3})}},ui={components:{turret:I("Stinger","nearestEnemy",{bulletPrefab:"DroneBullet",bulletVelocity:1,salvoCount:1,timeBetweenSalvos:5,ammunition:5})}};var Ft={};_(Ft,{PlayerHull:()=>yi,PlayerShip:()=>gi});var Kt=g(u());var yi={components:{solid:!0,appearance:{glyph:"#",layer:d.Player,fg:Kt.Colors.DARK_GRAY}}},gi={components:{player:{weaponArrays:["Primary","Secondary"]},ship:b("Ace of Clubs",20,10)},children:[h("PlayerHull",0,0,{appearance:{glyph:f.LeftArrow}}),h("PlayerHull",1,0,{appearance:{glyph:f.Club,fg:Kt.Colors.LIGHT_GRAY}}),h("PlayerHull",2,0,{appearance:{glyph:f.RightArrow}}),h("PlayerGun",1,0,void 0,["Primary"]),h("Sword",1,0,void 0,["Secondary"])]};var Ot={};_(Ot,{CruiseyWing:()=>Ti,Demigod:()=>Bi,DroneA:()=>Di,DroneB:()=>Ci,DroneC:()=>Ai,GoutOFlame:()=>Ii,Hull:()=>bi,Olm:()=>Ri,ShipA:()=>xi,ShipB:()=>Ei,ShipC:()=>Pi,ShipD:()=>wi,ShipE:()=>Si,ShipF:()=>vi,ShipG:()=>Mi,ShipH:()=>Hi});var Me=g(u());var bi={components:{solid:!0,appearance:{glyph:"#",layer:d.Ship,fg:Me.Colors.DARK_GRAY}}},N={idealDistance:8,firingDistance:14,speed:1},O=h("PeaShooter",0,0),xi={components:{ai:N,ship:b("A",0)},children:[h("Hull",0,0,{appearance:{glyph:f.Pilcrow}}),O]},Ei={components:{ai:N,ship:b("B",0)},children:[h("Hull",0,0,{appearance:{glyph:f.Yen}}),O]},Pi={components:{ai:N,ship:b("C",0)},children:[h("Hull",0,0,{appearance:{glyph:"W"}}),O]},wi={components:{ai:N,ship:b("D",0)},children:[h("Hull",0,0,{appearance:{glyph:f.Omega}}),O]},Si={components:{ai:N,ship:b("E",0)},children:[h("Hull",0,0,{appearance:{glyph:f.DownWedge}}),O]},vi={components:{ai:N,ship:b("F",0)},children:[h("Hull",0,0,{appearance:{glyph:f.Pi}}),O]},Mi={components:{ai:N,ship:b("G",0)},children:[h("Hull",0,0,{appearance:{glyph:"M"}}),O]},Hi={components:{ai:N,ship:b("H",0)},children:[h("Hull",0,0,{appearance:{glyph:f.Female}}),O]},_t={idealDistance:5,firingDistance:6,speed:1},Nt=h("DroneGun",0,0),Di={components:{ai:_t,ship:b("Drone A",1)},children:[h("Hull",0,0,{appearance:{glyph:f.Theta}}),Nt]},Ci={components:{ai:_t,ship:b("Drone B",1)},children:[h("Hull",0,0,{appearance:{glyph:f.SymbolED}}),Nt]},Ai={components:{ai:_t,ship:b("Drone C",1)},children:[h("Hull",0,0,{appearance:{glyph:f.Silcrow}}),Nt]},Ti={components:{ship:b("Cruisey Wing",10,5)},children:[h("Hull",0,0,{appearance:{glyph:f.Not}}),h("Hull",1,0,{appearance:{glyph:f.HorizontalDivide}}),h("Hull",2,0,{appearance:{glyph:f.NotFlip}})]},Ri={components:{ship:b("Olm",15,4)},children:[h("Hull",0,0,{appearance:{glyph:f.Cent}}),h("Hull",0,1,{appearance:{glyph:f.ResizeVertical}}),h("Hull",0,2,{appearance:{glyph:f.BoxDownSingleHorizontalDouble}})]},Ii={components:{ship:b("Gout-'o-flame",5,20)},children:[h("Hull",0,0,{appearance:{glyph:f.Pentagon}}),h("Hull",1,0,{appearance:{glyph:f.BoxVerticalDoubleHorizontalSingle}}),h("Hull",2,0,{appearance:{glyph:f.Pentagon}}),h("Hull",1,1,{appearance:{glyph:f.BoxUpDoubleHorizontalSingle}})]},Bi={components:{ship:b("Demigod",30,15)},children:[h("Hull",1,0,{appearance:{glyph:f.CapitalUUmlaut}}),h("Hull",0,1,{appearance:{glyph:"}"}}),h("Hull",1,1,{appearance:{glyph:f.RingInvert}}),h("Hull",2,1,{appearance:{glyph:"{"}}),h("Hull",1,2,{appearance:{glyph:"Y"}})]};var Wt={};_(Wt,{Sword:()=>Gi,SwordBullet:()=>Li});var Y=g(u());var Li={components:{projectile:{damage:5},appearance:{glyph:f.Star,layer:d.Bullet,fg:Y.Colors.LIGHT_GREEN},lifetime:{duration:6,decayingAppearance:[{glyph:f.Dot,fg:Y.Colors.DARK_GRAY},{glyph:f.Ring,fg:Y.Colors.DARK_GREEN},{glyph:f.Diamond,fg:Y.Colors.LIGHT_GREEN},{glyph:"o",fg:Y.Colors.LIGHT_GREEN},{glyph:f.Star,fg:Y.Colors.LIGHT_GREEN}]}}},Gi={components:{turret:I("Sword","lastMovement",{bulletPrefab:"SwordBullet",bulletVelocity:1,salvoCount:1,timeBetweenSalvos:20})}};var ki=D(D(D(D(D(D(D(D({},It),Bt),Lt),Gt),kt),Ft),Ot),Wt);function Vt(i,t){return i.add(new V(i,t).applyPrefab(t,ki[t]))}function C(i){return typeof i=="undefined"?NaN:Math.floor(i)}function M(i){return{x:C(i.x),y:C(i.y)}}function k(i,t){if(typeof i=="undefined"||typeof t=="undefined")return!1;let e=M(i),o=M(t);return e.x===o.x&&e.y===o.y}function A(i,t){return{x:i.x+t.x,y:i.y+t.y}}var at=class{constructor(t,e=[]){this.compareFn=t;this.entities=e;this.dirty=!0}clear(){this.entities=[],this.dirty=!1}add(t){this.entities.push(t),this.dirty=!0}clearDead(){this.entities=this.entities.filter(t=>t.alive)}sort(){this.entities.sort(this.compareFn),this.dirty=!1}get(){return this.dirty&&this.sort(),this.entities.slice()}};var y=g(u());var R=g(u());var F=g(u());function Ki(i,t){if(!t||!i.length)throw new Error("Could not get midpoint");let e=o=>i.reduce((r,{offset:n})=>r+n[o],0)/i.length;return{x:t.x+e("x"),y:t.y+e("y")}}function Fi(i,t,e,o=[]){let r=[];for(let{offset:n}of t){let s=A(e,n),{wall:a,solid:l}=i.getContents(s,o);a?r.push({absolute:s,offset:n,entity:"wall"}):l&&r.push({absolute:s,offset:n,entity:l})}return r}function T(i,t){let e=i.getRoot(t);return i.entities.get().filter(o=>i.getRoot(o)===e)}function lt(i,t){return T(i,t).map(e=>e.id)}function B(i,t){var a;let e=(a=i.getRoot(t).position)!=null?a:{x:0,y:0},o=T(i,t),r=[],n=0,s=0;for(let l of o){let{attachment:p,solid:m}=l;if(p&&m){let{x:c,y:x}=p;r.push({absolute:A(e,p),offset:{x:c,y:x},entity:l}),n=Math.max(c+1,n),s=Math.max(x+1,s)}}return{layout:r,topLeft:e,width:n,height:s}}function He(i,t,e){let o=lt(i,t),{layout:r,topLeft:n}=B(i,t);return!e||!n?[]:Fi(i,r,e||n,o)}function Z(i,t){let{layout:e,topLeft:o}=B(i,t);if(!o||!e.length)throw new Error(`Could not get midpoint of entity#${t.id}`);return Ki(e,o)}var P=class{constructor(t,e){this.list=t;this.filter=e}matches(t){if(!t.alive)return!1;for(let e of this.filter)if(!t[e])return!1;return!0}forEach(t){for(let e of this.list.get())this.matches(e)&&t(e,e)}};var Yt=Math.PI*2;function L(i,t){return Math.atan2(t.y-i.y,t.x-i.x)}function De(i,t){let e=(i-t)%Yt,o=(t-i)%Yt;return e<o?-e:o}function tt(i){let t=Math.cos(i.angle)*i.vel,e=Math.sin(i.angle)*i.vel;return[t,e]}function Ce(i){for(;i<0;)i+=Yt;return i}var $t=[{x:-1,y:-1},{x:-1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1},{x:1,y:0},{x:1,y:-1},{x:0,y:-1}];function jt(i){return $t.map(t=>A(i,t))}function H(i){if(!i.length)throw new Error("oneOf passed empty array");return i[Math.floor(Math.random()*i.length)]}function Ut(i){let t=new P(i.entities,["ai","position"]);i.on("tick",()=>t.forEach(({ai:e,position:o},r)=>{r.setLastMovement(),e.attacking||(e.attacking=i.player,i.fire("notice",{e:r,noticed:i.player}));let n=lt(i,r),{layout:s}=B(i,r),a=M(o),l=i.getDistanceMap(e.attacking),p=w=>{let{solid:S,wall:v}=i.getContents(w,n);return!S&&!v},m=w=>p(w)?Math.abs(l.getOrDefault(w,1/0)-e.idealDistance):1/0,c=w=>s.reduce((S,{offset:v})=>S+m(A(w,v)),0)/s.length,x=c(a),E=[];for(let w of $t){let S=A(a,w);if(!l.has(S))continue;let v=c(S);v<x?(x=v,E=[S]):v===x&&E.push(S)}if(E.length){let w=H(E);r.move(w.x,w.y),r.setLastMovement({angle:L(a,w)});return}})),i.on("damage",({e,source:o})=>{o.owner&&e!==o.owner&&e.ai&&!e.ai.attacking&&o.owner.alive&&(e.ai.attacking=o.owner)})}function zt(i){let t=new P(i.entities,["appearance","position"]);i.on("draw",()=>t.forEach(({appearance:e,position:o})=>i.drawIfVisible(C(o.x),C(o.y),e.glyph,e.fg,e.bg,e.blendMode)))}var Ae=g(u());var St=g(u());function et(i,t,e){return i*(1-e)+t*e}var pt=class{constructor(t){this.points=t;this.sort()}sort(){this.points.sort(([t],[e])=>t-e)}add(t,e){return this.points.push([t,e]),this.sort(),this}get(t){let[e,o]=this.points[0];if(t<=e)return(0,St.fromRgb)(...o);let[r,n]=this.points[this.points.length-1];if(t>=r)return(0,St.fromRgb)(...n);let s=this.points.findIndex(([Ye])=>Ye>t),[a,[l,p,m,c]]=this.points[s-1],[x,[E,w,S,v]]=this.points[s],W=(t-a)/(x-a);return(0,St.fromRgb)(et(l,E,W),et(p,w,W),et(m,S,W),et(c,v,W))}};function $(i,t){let e=Math.abs(i.x-t.x),o=Math.abs(i.y-t.y);return Math.sqrt(e*e+o*o)}var _i={fire:new pt([[0,[0,0,0,0]],[2,[255,0,0,150]],[4,[255,255,0,150]],[6,[255,255,255,150]],[10,[255,255,255,255]]])};function qt(i){if(!(i.intensity<=0))return{glyph:" ",layer:d.Effect,bg:_i[i.type].get(i.intensity),blendMode:Ae.BlendMode.Add}}function Te(i,t){let e=[],o=Math.floor(i.x-t),r=Math.ceil(i.x+t),n=Math.floor(i.y-t),s=Math.ceil(i.y+t);for(let a=n;a<=s;a++)for(let l=o;l<=r;l++){let p=$(i,{x:l,y:a});p>=t||e.push({x:l,y:a,intensity:t-p})}return e}function Qt(i){i.on("kill",({e:t})=>{let{explodes:e,name:o,position:r}=t;if(e&&r)for(let{x:n,y:s,intensity:a}of Te(r,e.size))i.add(new V(i,o+"Explosion").setPosition({x:n,y:s}).setField({type:"fire",intensity:a,falloff:e.falloff}))})}function mt(i,t,e,o){let r=i.getRoot(t);if(!r.ship)return;let n=e;r.ship.shield>0&&(r.ship.shield>e?(r.ship.shield-=e,n=0):(n-=r.ship.shield,r.ship.shield=0)),n&&(r.ship.hp-=n);let s={e:o,owner:o};o.origin&&(s.owner=o.origin.owner,s.ship=o.origin.ship,s.turret=o.origin.turret),console.log(o.name,"hits",r.name,"for",e),i.fire("damage",{e:r,amount:e,source:s}),r.ship.hp<=0&&i.kill(r,s)}function Xt(i){let t=new P(i.entities,["ship"]),e=new P(i.entities,["field","position"]);i.on("tick",()=>e.forEach(({field:o,position:r},n)=>{o.intensity-=o.falloff,n.setAppearance(qt(o)),o.intensity<=0?i.kill(n):t.forEach((s,a)=>{let{layout:l}=B(i,a);l.find(({absolute:m})=>k(m,r))&&mt(i,a,o.intensity,n)})})),i.on("spawn",({e:o})=>{o.field&&o.setAppearance(qt(o.field))})}var X=g(u());var ft=g(u());var j=g(u()),vt=[0,j.Colors.DARK_RED,j.Colors.BROWN,j.Colors.LIGHT_RED,j.Colors.ORANGE,j.Colors.YELLOW,j.Colors.WHITE];var U=class{constructor(t,e,o){this.g=t;this.pilot=e;this.full=o;this.width=11,this.height=o?2+e.class.length:1}get isPlayer(){return isNaN(this.pilot.difficulty)}draw(t,e){if(this.full&&(this.g.term.drawString(t,e,this.pilot.name,this.pilot.star?ft.Colors.YELLOW:ft.Colors.LIGHT_GRAY),e++),this.drawStat(t,e,"body"),this.drawStat(t+3,e,"mind"),this.drawStat(t+6,e,"spirit"),this.drawStat(t+9,e,"talent"),!!this.full)for(let o of this.pilot.class)this.g.term.drawString(t,++e,o,ft.Colors.LIGHT_GREEN)}drawStat(t,e,o){let r=this.pilot[o];this.g.term.drawChar(t,e,o[0].toUpperCase(),ft.Colors.WHITE),this.g.term.drawChar(t+1,e,r.toString(),vt[r])}};var G=g(u());function Jt(i,t,e,o,r,n,s,a,l){let p=`${Math.ceil(r)}/${n}`,m=Math.floor(r/n*o);i.drawHLine(t,e,o," ",void 0,a),m&&i.drawHLine(t,e,m," ",void 0,s),i.drawCenteredString(t+o/2,e,p,l)}var z=class{constructor(t,e){this.g=t;this.ship=e;this.width=Math.max(13,e.name.length),this.height=e.maxShield?3:2}draw(t,e){let{ship:o,width:r}=this,{term:n}=this.g,s=r-3;n.drawString(t,e,o.name,G.Colors.WHITE),n.drawString(t,e+1,"HP:",G.Colors.WHITE),Jt(n,t+3,e+1,s,o.hp,o.maxHp,G.Colors.DARK_GREEN,G.Colors.DARK_RED,G.Colors.WHITE),o.maxShield&&(n.drawString(t,e+2,"Sh:",G.Colors.WHITE),Jt(n,t+3,e+2,s,o.shield,o.maxShield,G.Colors.DARK_CYAN,G.Colors.LIGHT_BLUE,G.Colors.WHITE))}};var q=g(u());function Zt(i){return i.salvo<=0?i.ammunition<=0?"Spent":"Reloading":i.timer>0?"Chambering":"Ready"}function Re(i){i.timer>0&&(i.timer--,i.timer<=0&&i.salvo<=0&&(i.ammunition?(i.salvo=Math.min(i.salvoCount,i.ammunition),i.ammunition-=i.salvo):i.timer=1/0))}function Mt(i,t){return i.bulletAngle==="lastMovement"&&!t.lastMovement?!1:i.timer===0}function Ht(i,t,e,o,r,n=[]){--t.salvo<=0?t.timer=t.timeBetweenSalvos:t.timer=t.timeBetweenShots;let s={x:e.x+.5,y:e.y+.5},a=t.bulletAngle==="nearestEnemy"?L(s,o):t.bulletAngle==="lastMovement"?r.lastMovement.angle:t.bulletAngle,l=i.spawn(t.bulletPrefab).setIgnoreSolid({ids:n}).move(s.x,s.y);return t.bulletVelocity&&l.setMotion({angle:a,vel:t.bulletVelocity}),r.ship&&l.setOrigin({owner:r,ship:r.ship,turret:t}),l}var Ni={Spent:q.Colors.DARK_GRAY,Reloading:q.Colors.LIGHT_RED,Ready:q.Colors.YELLOW,Chambering:q.Colors.BROWN},Q=class{constructor(t,e){this.g=t;this.turret=e;this.width=Math.max(e.name.length,this.stateLabel.length),this.height=2,e.ammunition>0&&e.ammunition<1/0&&this.height++}get stateLabel(){let{timer:t,salvo:e,salvoCount:o}=this.turret,r=Zt(this.turret);if(r==="Spent")return"Out of Ammo";if(r==="Reloading")return`Reloading (${t})`;let n=`${e}/${o}`;return r==="Ready"?n:`${n} (${t})`}draw(t,e){this.g.term.drawString(t,e,this.turret.name,q.Colors.WHITE);let o=Zt(this.turret);this.g.term.drawString(t,e+1,this.stateLabel,Ni[o]),this.height>2&&this.g.term.drawString(t,e+2,`${this.turret.ammunition} ammo left`,q.Colors.LIGHT_GRAY)}};function te(i,t){return t===1?i:i+"s"}var it=6;function ee(i){let{mapHeight:t,term:e}=i;i.on("draw",()=>{let o=i.player,{pilot:r,ship:n}=o;e.fillRect(0,t,e.width,it," ",X.Colors.WHITE,X.Colors.BLACK),e.drawSingleBox(0,t,e.width,it);let s=1,a=t+1,l=new z(i,n);l.draw(s,a);let p=s+Math.floor((l.width-11)/2);new U(i,r,!1).draw(p,a+3),s+=l.width+1,e.drawChar(s-1,a-1,f.BoxDownSingleHorizontalSingle,X.Colors.WHITE),e.drawVLine(s-1,a,it-2,f.BoxVerticalSingle,X.Colors.WHITE),e.drawChar(s-1,a+it-2,f.BoxUpSingleHorizontalSingle,X.Colors.WHITE);let c=s;for(let x of o.player.weaponArrays){let E=c,w=T(i,o).filter(v=>v.turret&&v.tags.has(x));for(let v of w){let W=new Q(i,v.turret);W.draw(c,a+1),c+=W.width+1}let S=`${x} ${te("Weapon",w.length)}`;e.drawString(E,a,S,X.Colors.LIGHT_CYAN),c=Math.max(c,E+S.length+1)}})}function ie(i){let t=new P(i.entities,["homing","motion","position"]);i.on("tick",()=>t.forEach(({homing:e,motion:o,position:r},n)=>{var p;if(!((p=e.target)!=null&&p.alive))return;let s=Z(i,e.target),a=L(r,s),l=De(o.angle,a);Math.abs(l)<=e.strength?o.angle=a:l<0?o.angle-=e.strength:o.angle+=e.strength,--e.duration<=0&&(n.setHoming(),n.setTrail())}))}function oe(i){let t=new P(i.entities,["lifetime"]);i.on("tick",()=>t.forEach(({lifetime:e},o)=>{if(--e.duration<=0)i.kill(o);else if(e.decayingAppearance&&o.appearance){let r=e.decayingAppearance[e.duration-1];Object.assign(o.appearance,r)}}))}function Dt(i,t){let e=t.x-i.x,o=t.y-i.y,r=Math.abs(e),n=Math.abs(o),s=e>0?1:-1,a=o>0?1:-1,l=D({},i),p=[D({},l)];for(let m=0,c=0;m<r||c<n;)(.5+m)/r<(.5+c)/n?(l.x+=s,m++):(l.y+=a,c++),p.push(D({},l));return p}function Ie(i,t,e){let o=[],r=(n,s)=>{let a=C(n),l=C(s);o.find(p=>p.x===a&&p.y===l)||o.push({x:a,y:l})};for(let n=0;n<=Math.floor(e*Math.sqrt(.5));n++){let s=Math.floor(Math.sqrt(e*e-n*n));r(i-s,t+n),r(i+s,t+n),r(i-s,t-n),r(i+s,t-n),r(i+n,t-s),r(i+n,t+s),r(i-n,t-s),r(i-n,t+s)}return o}function re(i){let t=new P(i.entities,["motion","position"]);i.on("tick",()=>t.forEach(({motion:e,position:o,projectile:r,ignoreSolid:n},s)=>{let[a,l]=tt(e),p={x:o.x+a,y:o.y+l},m=Dt(M(o),M(p)),c=!1,x;for(let E of m){if(!i.inBounds(E)){i.kill(s);return}i.move(s,E);let{wall:w,solid:S}=i.getContents(E,n==null?void 0:n.ids);if(w){c=!0;break}else if(S){x=S;break}}c?i.kill(s):x?(r&&mt(i,x,r.damage,s),i.kill(s)):i.move(s,p)}))}function ne(i){i.on("playerMove",({move:t})=>{let e=i.player,o=e.position,r=A(o,t);He(i,e,r).length||(e.move(r.x,r.y),e.setLastMovement({angle:L(o,r)}),i.tick())}),i.on("playerFire",({array:t})=>{let e=i.player,o=e.player.weaponArrays[t],r=T(i,e),n=r.filter(a=>a.tags.has(o)),s=!1;for(let a of n)a.turret&&Mt(a.turret,e)&&(Ht(i,a.turret,a.position,{x:0,y:0},e,r.map(l=>l.id)),s=!0);s&&(e.setLastMovement(),i.tick())})}function se(i){let t=new P(i.entities,["pilot","ship"]);i.on("tick",()=>t.forEach(({pilot:e,ship:o})=>{let r=e.body;o.shield=Math.min(o.maxShield,o.shield+r)}))}var Be=["Typical","Healthy","Double","Multi","Drain","StarPilot","Mega"];var K=g(u());var Oi={name:"Basic",difficulty:0,body:1,mind:1,spirit:1,talent:1,class:[]},Wi=[Oi],Le=Wi;var Ge=["Berserker","Chopter","Duelist","Engineer","Fighter","Negotiator","Psychic","Smuggler"];var Vi={name:"Bodini",star:!0,difficulty:4,body:3,mind:2,spirit:3,talent:2,class:["Psychic"]},Yi={name:"Star Pilot B",star:!0,difficulty:2,body:2,mind:2,spirit:2,talent:2,class:[]},$i={name:"Star Pilot C",star:!0,difficulty:2,body:2,mind:2,spirit:2,talent:2,class:[]},ji={name:"Star Pilot D",star:!0,difficulty:2,body:2,mind:2,spirit:2,talent:2,class:[]},Ui={name:"Star Pilot E",star:!0,difficulty:2,body:2,mind:2,spirit:2,talent:2,class:[]},zi={name:"Star Pilot F",star:!0,difficulty:2,body:2,mind:2,spirit:2,talent:2,class:[]},qi=[Vi,Yi,$i,ji,Ui,zi],Ct=qi;function ae(i,t=0){let e=[];for(let o=t;o<i;o++)e.push(o);return e}function At(i,t){let{ship:e}=i;if(!e)throw new Error(`Cannot put pilot into entity ${i.name} (no ship)`);i.setPilot(t),e.maxHp+=t.body}function le(i){for(let t=i.length-1;t>0;t--){let e=Math.floor(Math.random()*(t+1));[i[t],i[e]]=[i[e],i[t]]}return i}var ke=i=>["DroneA","DroneB","DroneC"].includes(i),Qi=i=>["Healthy","Multi","Mega"].includes(i),Xi=i=>["StarPilot","Mega"].includes(i),Ji={Typical:{fg:K.Colors.DARK_GRAY},Healthy:{fg:K.Colors.DARK_GREEN},Double:{fg:K.Colors.LIGHT_GRAY},Multi:{fg:K.Colors.DARK_MAGENTA},Drain:{fg:K.Colors.DARK_RED},StarPilot:{fg:K.Colors.YELLOW},Mega:{fg:K.Colors.BLACK,bg:K.Colors.DARK_MAGENTA}};var Zi={Typical:0,Healthy:2,Double:3,Multi:6,Drain:4,StarPilot:8,Mega:20},to=["ShipA","ShipB","ShipC","ShipD","ShipE","ShipF","ShipG","ShipH","DroneA","DroneB","DroneC","CruiseyWing","Olm","GoutOFlame","Demigod"],eo={ShipA:1,ShipB:1,ShipC:1,ShipD:1,ShipE:1,ShipF:1,ShipG:1,ShipH:1,DroneA:2,DroneB:2,DroneC:2,CruiseyWing:8,Olm:10,GoutOFlame:20,Demigod:40};function io(i,t){if(!ke(i))return t==="StarPilot"||t==="Mega"?H(Ct):H(Le)}function Ke(i,t){var e;for(;;){let o=H(to),r=H(Be);if(ke(o)&&Xi(r))continue;let n=io(o,r),s=Zi[r]+eo[o]+((e=n==null?void 0:n.difficulty)!=null?e:0);if(s<=t){let a=i.spawn(o),{ship:l}=a;if(!l)throw new Error(`Ship prefab ${o} doesn't have a ship component!`);if(Qi(r)&&(l.maxHp=l.maxHp*2+3),n){let m=nt(n);for(;m.class.length<m.talent;)m.class.push(H(Ge.filter(c=>!m.class.includes(c))));At(a,m)}l.hp=l.maxHp,l.shield=l.maxShield;let p=Ji[r];for(let m of T(i,a))m.appearance&&Object.assign(m.appearance,p);return{entity:a,difficulty:s}}}}function oo(i,t,e,o,r){for(let n=0;n<r;n++)for(let s=0;s<o;s++){let{wall:a,solid:l,other:p}=i.getContents({x:t+s,y:e+n});if(a||l||p.length)return!1}return!0}function Fe(i,t,e){for(let o=0;o<5;o++){let r=le(ae(i.term.width-t));for(let n of r)if(oo(i,n,o,t,e))return{x:n,y:o}}throw new Error(`Could not find spawn position for ${t}x${e}!`)}function pe(i){let t=0;i.on("tick",()=>{if(t++,!(t%10)){let e=Math.ceil(t/20),{entity:o}=Ke(i,e),{width:r,height:n}=B(i,o),s=Fe(i,r,n);o.move(s.x,s.y)}})}function me(i){i.on("move",({e:t,old:e,pos:o})=>{t.trail&&!k(e,o)&&i.spawn(t.trail.effectPrefab).setPosition(e)})}function fe(i){let t=new P(i.entities,["position","turret"]);i.on("tick",()=>t.forEach(({position:e,turret:o},r)=>{var l;Re(o);let n=i.getRoot(r);if(!n.ai)return;let s=n.ai.attacking;if(!(s!=null&&s.alive))return;let a=Z(i,s);if(!($(e,a)>((l=n.ai.firingDistance)!=null?l:1/0))&&Mt(o,n)){let p=Ht(i,o,e,a,n,lt(i,r));p.homing&&(p.homing.target=s),p.ai&&(p.ai.attacking=s)}}))}function _e(i){oe(i),ie(i),fe(i),Xt(i),se(i),re(i),Ut(i),pe(i),zt(i),ee(i),me(i),Qt(i),ne(i)}var ot=g(u());var Ne=Math.PI/4,ro=[f.RightArrow,f.DownArrow+f.RightArrow,f.DownArrow,f.DownArrow+f.LeftArrow,f.LeftArrow,f.UpArrow+f.LeftArrow,f.UpArrow,f.UpArrow+f.RightArrow];function no(i){let t=Math.floor(Ce(i)/Ne+Ne/2);return ro[t]}var ht=class{constructor(t,e){this.g=t;this.e=e;this.instructions=[],e.name&&this.add(e.name,ot.Colors.WHITE),e.projectile&&this.add(`${e.projectile.damage} damage`,ot.Colors.LIGHT_RED),e.motion&&this.add(`${no(e.motion.angle)}, vel ${e.motion.vel}`,ot.Colors.LIGHT_GRAY),e.homing&&this.add(`chasing ${e.homing.target===this.g.player?"you ":""}${e.homing.duration<1/0?`(${e.homing.duration})`:""}`,ot.Colors.DARK_RED),e.lifetime&&this.add(`(lasts ${e.lifetime.duration})`,ot.Colors.DARK_GRAY),this.width=this.instructions.reduce((o,r)=>Math.max(r.line.length,o),0),this.height=this.instructions.length}add(t,e){this.instructions.push({x:0,y:this.instructions.length,line:t,fg:e})}draw(t,e){for(let{x:o,y:r,line:n,fg:s}of this.instructions)this.g.term.drawString(t+o,e+r,n,s)}};var he=g(u());function Oe(i,t,e){if(!e.length)return;let o=[],r=1,n=1,s=m=>{o.push({x:r,y:n,object:m}),n+=m.height+1};for(let m of e){m.ship&&s(new z(i,m.ship)),m.pilot&&s(new U(i,m.pilot,!0));let c=T(i,m);for(let x of c.filter(E=>E.turret))s(new Q(i,x.turret));(m.motion||m.projectile||m.homing||m.lifetime)&&s(new ht(i,m))}if(!o.length)return;let a=Math.max(...o.map(m=>m.object.width))+2,l=Math.min(t.x+2,i.term.width-a),p=Math.min(t.y,i.term.height-n);i.term.fillRect(l,p,a,n," ",he.Colors.WHITE,he.Colors.BLACK),i.term.drawSingleBox(l,p,a,n);for(let m of o)m.object.draw(l+m.x,p+m.y)}function We(i,t,e){for(let o of i.entities.get()){let{motion:r,projectile:n,position:s}=o;if(r&&n&&s&&$(t,s)<=e){let a=L(t,s);r.angle=a,o.setIgnoreSolid()}}for(let o of Ie(t.x,t.y,e))i.spawn("AirFistRange").setPosition(o)}var ct=class{constructor(t,e){this.g=t;this.sector=e;this.dirty=!0,this.examining=[]}refresh(){this.dirty=!0}init(){let{g:t}=this;this.examineAt=void 0,this.examining=[],t.blankMap();let{width:e,height:o}=B(t,t.player);t.player.move(C(t.mapWidth/2-e/2),t.mapHeight-o-4),_e(t)}draw(){let{map:t,mapWidth:e,mapHeight:o,overlays:r,term:n}=this.g;for(let s=0;s<o;s++)for(let a=0;a<e;a++){let l=t.grid[s][a];n.drawChar(a,s,0,l.fg,l.bg)}if(this.g.fire("draw",void 0),this.dirty=!1,this.showOverlay){let s=r.get(this.showOverlay);if(s)for(let a=0;a<o;a++)for(let l=0;l<e;l++){let p=s.get({x:l,y:a})||1/0,m=p===1/0?"-":p<10?`${p}`:"*";n.drawChar(l,a,m,F.Colors.LIGHT_RED)}}if(this.examineAt){Oe(this.g,this.examineAt,this.examining);for(let s of this.examining){let{motion:a,position:l}=s;if(a&&l){let[p,m]=tt(a),c={x:l.x+p,y:l.y+m},x=Dt(M(l),M(c));for(let E of x)n.drawCell(E.x,E.y,{bg:F.Colors.DARK_RED},F.BlendMode.Add)}}}}update(){(this.g.term.mouse.dx||this.g.term.mouse.dy)&&this.refresh(),this.handleKeys(),this.dirty&&(this.handleMouseMove(),this.draw())}examine(t){this.examineAt=t,this.dirty=!0;let{solid:e,other:o}=this.g.getContents(t),r=new Set;e&&r.add(this.g.getRoot(e));for(let n of o)r.add(this.g.getRoot(n));this.examining=[...r]}handleMouseMove(){let{x:t,y:e}=this.g.term.mouse;this.examine({x:t,y:e})}handleKeys(){let{player:t,term:e}=this.g,o=e.getMovementKey();if(o){this.g.fire("playerMove",{move:o});return}if(e.isKeyPressed(F.Key.VK_1)){this.g.fire("playerFire",{array:0});return}if(e.isKeyPressed(F.Key.VK_2)){this.g.fire("playerFire",{array:1});return}if(e.isKeyPressed(F.Key.VK_F)){We(this.g,Z(this.g,t),4.5),this.g.tick();return}}};var dt=class{constructor(t,e,o){this.width=t;this.height=e;this.grid=[];for(let r=0;r<e;r++){let n=[];for(let s=0;s<t;s++)n.push(o(s,r));this.grid.push(n)}}contains({x:t,y:e}){return t>=0&&t<this.width&&e>=0&&e<this.height}get({x:t,y:e}){return this.grid[e][t]}getPositions(){let t=[];for(let e=0;e<this.height;e++)for(let o=0;o<this.width;o++)t.push({x:o,y:e});return t}};var ut=class{constructor(t,e,o){this.g=t;this.shipPrefab=e;this.pilot=o;this.dirty=!0}refresh(){this.combat?this.combat.refresh():this.dirty=!0}init(){let{g:t}=this;t.clearEventHandlers(),t.entities.clear(),t.player=this.makePlayer(),this.position={x:2,y:2},this.space=new dt(5,5,()=>({completed:!1}));let e=new Set,o=this.space.getPositions().filter(r=>!k(this.position,r));for(;e.size<6;){let r=H(Ct);if(!e.has(r)){e.add(r);let n=H(o),s=this.space.get(n);s.star=r;let a=o.indexOf(n);o.splice(a,1)}}}startCombat(){this.combat=new ct(this.g,this.space.get(this.position)),this.combat.init()}makePlayer(){let{g:t,shipPrefab:e,pilot:o}=this,r=t.spawn(e);if(!r.ship)throw new Error(`Ship prefab ${e} doesn't have a ship component!`);return At(r,o),r.ship.hp=r.ship.maxHp,r.ship.shield=r.ship.maxShield,r}draw(){let{term:t}=this.g;t.clear();let e=this.space.get(this.position),o=t.width/2;t.drawCenteredString(o,2,"Known Space",R.Colors.WHITE),e.completed||t.drawCenteredString(o,4,"Hit Enter to fight!",R.Colors.WHITE);let r=(t.width-25)/2,n=(t.height-25)/2;for(let s=0;s<5;s++){let a=n+s*5;for(let l=0;l<5;l++){let p=r+l*5,m={x:l,y:s},c=this.space.get(m);t.fillRect(p,a,5,5," ",void 0,c.completed?R.Colors.BLACK:R.Colors.DARK_RED),t.drawSingleBox(p,a,5,5,R.Colors.WHITE),k(m,this.position)?t.drawChar(p+2,a+2,"@",R.Colors.LIGHT_CYAN):c.star&&t.drawChar(p+2,a+2,"*",R.Colors.YELLOW)}}this.dirty=!1}handleKeys(){let t=this.space.get(this.position);!t.completed&&(this.g.term.isKeyPressed(R.Key.VK_ENTER)||this.g.term.isKeyPressed(R.Key.VK_NUMPAD_ENTER))&&this.startCombat();let e=this.g.term.getMovementKey();if(t.completed&&e){let o=A(this.position,e);this.space.contains(o)&&(this.position=o,this.dirty=!0)}}update(){if(this.combat)return this.combat.update();this.handleKeys(),this.dirty&&this.draw()}};var yt=class{constructor(t,e=5,o=100){this.g=t;this.starfieldSpeed=e;this.starCount=o}refresh(){this.dirty=!0}init(){this.dirty=!0,this.pilot={name:"Player",difficulty:NaN,body:1,mind:1,spirit:1,talent:1,class:[]},this.points=6,this.starfieldCounter=0,this.stars=[];for(let t=0;t<this.starCount;t++)this.stars.push(this.newStar())}draw(){let{term:t}=this.g;t.clear();for(let s of this.stars){let{x:a,y:l}=M(s);t.drawChar(a,l,s.c,s.fg)}let e=t.width/2;t.drawCenteredString(e,2,"Bullet Hell Roguelike",y.Colors.WHITE),t.drawCenteredString(e,9,"Create your Pilot",y.Colors.WHITE),t.drawCenteredString(e,10,`${this.points} points`,y.Colors.YELLOW);let o=2,r=Math.floor((t.width-o*2)/4),n=o+r/2;this.drawStat("body",n),this.drawStat("mind",n+r),this.drawStat("spirit",n+r*2),this.drawStat("talent",n+r*3),this.points===0&&t.drawCenteredString(e,20,"Hit Enter to begin!",y.Colors.WHITE),this.dirty=!1}drawStat(t,e){let{term:o}=this.g,r=`(${t[0].toUpperCase()})${t.slice(1)}`,n=this.pilot[t];o.drawCenteredString(e,13,r,y.Colors.LIGHT_CYAN),o.drawCenteredString(e,14,n.toString(),vt[n])}update(){this.handleStarfield(),this.handleKeys(),this.dirty&&this.draw()}newStar(){let{term:t}=this.g,e=H([y.Colors.DARK_RED,y.Colors.LIGHT_RED,y.Colors.YELLOW,y.Colors.LIGHT_CYAN,y.Colors.WHITE]),o=.5+Math.random(),r=o<.75?".":o<1.25?f.Dot:"*",n=Math.random()*Math.PI*2;return{x:t.width/2,y:t.height/2,c:r,fg:e,vel:o,angle:n}}handleStarfield(){if(this.starfieldCounter<this.starfieldSpeed){this.starfieldCounter++;return}this.starfieldCounter=0,this.dirty=!0;let{width:t,height:e}=this.g.term;for(let o of this.stars){let[r,n]=tt(o);o.x+=r,o.y+=n,(o.x<0||o.x>=t||o.y<0||o.y>=e)&&Object.assign(o,this.newStar())}}isPressed(t,e){let o=this.g.term.isKeyDown(y.Key.VK_SHIFT_LEFT)||this.g.term.isKeyDown(y.Key.VK_SHIFT_RIGHT);return this.g.term.isKeyPressed(t)&&e===o}changeStat(t,e){let o=this.pilot[t]+e;if(o<1||o>6)return!1;this.points-=e,this.pilot[t]=o,this.dirty=!0}handleKeys(){this.points>0&&(this.isPressed(y.Key.VK_B,!1)&&this.changeStat("body",1),this.isPressed(y.Key.VK_M,!1)&&this.changeStat("mind",1),this.isPressed(y.Key.VK_S,!1)&&this.changeStat("spirit",1),this.isPressed(y.Key.VK_T,!1)&&this.changeStat("talent",1)),this.isPressed(y.Key.VK_B,!0)&&this.changeStat("body",-1),this.isPressed(y.Key.VK_M,!0)&&this.changeStat("mind",-1),this.isPressed(y.Key.VK_S,!0)&&this.changeStat("spirit",-1),this.isPressed(y.Key.VK_T,!0)&&this.changeStat("talent",-1),this.points===0&&(this.g.term.isKeyPressed(y.Key.VK_ENTER)||this.g.term.isKeyPressed(y.Key.VK_NUMPAD_ENTER))&&this.g.setMode(new ut(this.g,"PlayerShip",this.pilot))}};var gt=class{constructor(t){this.keyFn=t;this.items=new Map}has(t){return this.items.has(this.keyFn(t))}get(t){return this.items.get(this.keyFn(t))}getOrDefault(t,e){let o=this.items.get(this.keyFn(t));return typeof o!="undefined"?o:e}getOrDie(t){let e=this.keyFn(t),o=this.items.get(e);if(typeof o=="undefined")throw new Error(`Invalid key: ${e}`);return o}set(t,e){this.items.set(this.keyFn(t),e)}};function ce(i,t,e=1/0){let o=[],r=new gt(n=>`${n.x},${n.y}`);for(let n of i)o.push(n),r.set(n,0);for(;o.length;){let n=o.shift(),s=r.getOrDie(n)+1;if(!(s>e))for(let a of jt(n))!r.has(a)&&t(a)&&(r.set(a,s),o.push(a))}return r}function de(i){return typeof i!="undefined"}var bt=class{constructor(t,e,o){this.term=t;this.mapWidth=e;this.mapHeight=o;t.update=this.update.bind(this),this.map=new Ve.Console(e,o,()=>!0),this.lastEntityId=0,this.entities=new at(Se),this.overlays=new Map,this.clearEventHandlers(),this.setMode(new yt(this))}setMode(t){this.mode=t,this.mode.init()}clearEventHandlers(){this.eventCallbacks=we(xe.map(t=>[t,[]]))}fire(t,e){for(let o of this.eventCallbacks[t])o(e)}on(t,e){this.eventCallbacks[t].push(e)}spawn(t){return Vt(this,t)}refresh(){this.mode.refresh()}add(t){return this.refresh(),this.entities.add(t),this.fire("spawn",{e:t}),t}kill(t,e){t.alive&&(t.kill(e),this.fire("kill",{e:t,source:e}))}move(t,e){let o=t.position;t.move(e.x,e.y),o&&this.fire("move",{e:t,old:o,pos:e})}blankMap(){let{map:t,mapHeight:e,mapWidth:o}=this;t.clear();for(let r=0;r<e;r++)for(let n=0;n<o;n++)t.setBlocked(n,r,!1),t.setBlockedSight(n,r,!1);t.computeFov(0,0,1/0)}drawIfVisible(t,e,o,r,n,s){this.map.isVisible(t,e)&&(s?this.term.drawCell(t,e,{bg:n},s):this.term.drawChar(t,e,o,r,n))}getRoot(t){return t.attachment?this.getRoot(t.attachment.parent):t}getContents(t,e=[]){let o=M(t);if(!this.inBounds(o))return{wall:!0,other:[]};let r=this.map.isBlocked(o.x,o.y),n=this.entities.get().filter(a=>a.position&&k(o,a.position)),s=n.filter(a=>!e.includes(a.id)).find(a=>a.solid);return{wall:r,solid:s,other:n.filter(a=>!a.solid)}}tick(){this.overlays.clear(),this.fire("tick",void 0),this.entities.clearDead()}update(){this.mode.update()}inBounds(t){return t.x>=0&&t.y>=0&&t.x<this.mapWidth&&t.y<this.mapHeight}getDistanceMap(t){let e=`${t.id}.distance`,o=this.overlays.get(e);return o||(o=ce(T(this,t).map(r=>r.position).filter(de),this.inBounds.bind(this)),this.overlays.set(e,o)),o}};function so(i){let o=Tt.DEFAULT_FONT,r=document.createElement("div");i.appendChild(r);let n=()=>{let p=60*o.charWidth,m=40*o.charHeight,c=Math.floor(window.innerWidth/p),x=Math.floor(window.innerHeight/m),E=Math.min(c,x);r.style.width=`${p*E}px`,r.style.height=`${m*E}px`};window.addEventListener("resize",n),n();let s=document.createElement("canvas");r.appendChild(s),requestAnimationFrame(()=>s.focus());let a=new Tt.Terminal(s,60,40,{font:o}),l=new bt(a,60,40-it);window.g=l}window.addEventListener("load",()=>so(document.body));})();
//# sourceMappingURL=bundle.js.map
