(this["webpackJsonpsoweli-li-mi"]=this["webpackJsonpsoweli-li-mi"]||[]).push([[0],{24:function(n){n.exports=JSON.parse('[{"nimi":"kama sona","ma":[" .  SOW LON TEL LI  WEK  .   . "," .  LI   .   .   .   .   .   . ","kiw MI   .  sow  .   .   .   . "," .   .   .   .   .  KIW LI  AWE"," .   .   .   .   .   .   .   . ","tel tel tel tel tel tel tel tel"," .   .   .   .   .  NIM LI  TAW","tom  .  TOM LI  PIN  .   .   . "]},{"nimi":"lon poka telo","ma":["tom TOM LI  PIN  .  SOW EN  KAL LON KON LI  ANP  .  WAS EN  KAL LON TOM LI  WEK"," .   .   .   .   .  LI  MI   .   .   .   .   .   .   .   .   .   .   .   .  was"," .   .   .   .  KAL  .   .   .   .   .   .   .   .   .   .   .   .  kas kas kas"," .   .   .   .  kil  .   .   .   .   .   .   .   .   .   .   .   .   .  pal  . "," .  sow  .   .  kas  .   .   .   .   .   .   .   .   .   .   .   .   .  pal  . ","ma  ma  ma  ma  ma  ma   .  pan pan pan  .   .   .   .   .   .   .   .  pal  . ","ma  MA  LI  AWE ma  ma  ma  ma  ma  ma   .  WAS LI  SEW pan  .   .  ma  ma  ma ","ma  KIW LI  TAW ma  KIW LI  ANP ma  ma  tel tel tel tel tel tel SOW LI  MI  ma ","ma  NIM LON TEL LI  WEK ma  ma  ma  ma  tel tel tel tel tel tel LON ma  ma  ma ","ma   .   .  WAS  .  PIP kiw kiw tel ma  tel tel tel tel tel tel TEL TOM WAS ma ","ma   .  ma  ma  LI  ma  ma  ma  tel tel tel tel tel pan ~cx tel LI  kiw LI   . ","ma   .   .  pip MI  ma  ma  ma  ma  kas tel kas tel pan kas tel ANP WEK  .  ma ","NIM EN  SOW EN  KAL LI  TAW ma  ma  ma  ma  ma  ma  ma  ma  WAS LON TEL LI  SEW"],"namako":{"~cx":"telo kala"}},{"nimi":"nimi namako","ma":["SOW LI  MI   .    .  sow SOW TOM LI  PIN"," .  LI   .   .    .  EN   .   .  NIM  . "," .   .   .  LON  kas tel kas  .   .   . "," .  KAS  .   .   tel tom tel MOL  .   . ","KAS  .   .  KAS  kas tel kas  .   .  TEL","LI MOL   .   .    .   .   .   .  EN  LI ","AWE  .   .   .   NIM LI  TAW  .   .  MOL"]}]')},26:function(n,t,e){},31:function(n,t,e){},32:function(n,t,e){},44:function(n,t,e){},45:function(n,t,e){},47:function(n,t,e){},48:function(n,t,e){},49:function(n,t,e){"use strict";e.r(t);e(26);var a=e(5),i=e(22),o=e(4),r=e(6),u=e(8),l=e(7),c=(e(31),e(32),e(9)),s=e.n(c),p=e(1),m=["\u2191","\u2193","\u2190","\u2192"];function f(n){return m.includes(n)}var k={x:NaN,y:NaN},j=function(n){Object(u.a)(e,n);var t=Object(l.a)(e);function e(n,a){return Object(o.a)(this,e),t.call(this,{x:n,y:a})}return Object(r.a)(e,[{key:"tawa",value:function(n){switch(n){case"\u2191":return new e(this.x,this.y-1);case"\u2193":return new e(this.x,this.y+1);case"\u2190":return new e(this.x-1,this.y);case"\u2192":return new e(this.x+1,this.y);default:throw new RangeError("nasin li ike!")}}},{key:"liInsaMa",value:function(n){return this.x>=0&&this.x<n.x&&this.y>=0&&this.y<n.y}}]),e}(p.a.Record(k));var v=function n(t,e){Object(o.a)(this,n),this.suliMa=void 0,this.lonIjo=void 0,this.suliMa=t,this.lonIjo=e.filter((function(n){return n.liLon})).groupBy((function(n){return n.lon})).toMap()},w=e(3);function h(n,t){return p.a.Map(n.lonIjo.mapEntries((function(e){var a=Object(w.a)(e,2),i=a[0],o=a[1];return[i,o.map((function(e,a){return function(n,t,e,a,i){var o=a.lonIjo.get(n).filterNot((function(n,t){return t===e})).toSet(),r=o.toSeq().filter((function(n){return n.liSitelen()})).map((function(n){return n.nimi})).toSet();function u(n){var e=n.seme.contains("ali")||t.liNimi()&&n.seme.contains("nimi")||t.liSitelen()&&n.seme.contains(t.nimi),a=n.lonSeme.contains("ali")||n.lonSeme.contains("nimi")&&o.some((function(n){return n.liNimi()}))||n.lonSeme.contains("kon")&&o.isEmpty()||!n.lonSeme.intersect(r).isEmpty();return e&&a}return p.a.Seq(i).filter(u).flatMap((function(n){return n.liSeme})).toSet()}(i,e,a,n,t)}))]})))}var O=e(2),b=e(14),d=e.n(b);function S(n){return p.a.Seq(n).flatMap((function(n,t){return p.a.Seq(n).map((function(n){return[n,t]}))})).toMap()}var N={toki:["li","e","en","ala","lon"],kulupu:["nimi","sitelen","ali","kon"],pali:["mi","pini","moli","awen","weka","tawa","sewi","anpa"],ijo:["soweli","waso","kala","akesi","pipi","jan","mije","meli","tomo","ma","kiwen","telo","ko","kili","kasi","pan","sike","lipu","nena","lupa","poki","supa","palisa","ilo","len","mani","linja","jaki","suno","mun","pilin","olin","tenpo","sijelo","lawa","luka","noka","uta","kute","oko","pu"]},y=S(N),x=y.keySeq().toArray();function I(n,t){return N[t].includes(n)}function M(n){return y.get(n)}var L=d.a.mark(g),T=d.a.mark(E);function g(n){return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.delegateYield(E(n,(function(n,t){return new j(n,t)})),"t0",1);case 1:return t.delegateYield(E(n,(function(n,t){return new j(t,n)})),"t1",2);case 2:case"end":return t.stop()}}),L)}function E(n,t){var e,a,i,o;return d.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:e=t(n.suliMa.x,n.suliMa.y),a=0;case 2:if(!(a<e.y)){r.next=10;break}for(i=void 0,o=e.x-1;o>=0;o--)i=P(o,n.lonIjo.get(t(o,a)),i);return r.next=7,i;case 7:a++,r.next=2;break;case 10:case"end":return r.stop()}}),T)}function P(n,t,e){var a=function(n){return{index:n,rowBegin:1,columnBegin:n+1,rowEnd:1,columnEnd:n+2}}(n);if(void 0!==t){var i=t.filterNot((function(n){return n.liSitelen()})).entrySeq().first();if(void 0!==i){var o=Object(w.a)(i,2),r=o[0],u=o[1].nimi;return{nanpaIjo:r,kind:M(u),text:u,pos:a,next:e}}}return{kind:"ala",text:"",pos:a,next:e}}var q,A,K=Object(O.rep)(Object(O.alt)(Object(O.tok)("ala"),Object(O.tok)("ijo"),Object(O.tok)("kulupu"),Object(O.tok)("toki"),Object(O.tok)("pali"))),W=Object(O.tok)("ijo"),z=Object(O.tok)("kulupu"),C=Object(O.tok)("pali"),R=Object(O.str)("li"),F=Object(O.str)("en"),D=Object(O.str)("lon"),B=Object(O.apply)((q=Object(O.alt)(W,z),A=F,Object(O.apply)(Object(O.seq)(q,Object(O.rep)(Object(O.seq)(A,q))),(function(n){var t=Object(w.a)(n,2),e=t[0],a=t[1];return[[e].concat(a.map((function(n){var t=Object(w.a)(n,2);return t[0],t[1]}))),a.map((function(n){var t=Object(w.a)(n,2),e=t[0];return t[1],e}))]}))),(function(n){var t=Object(w.a)(n,2),e=t[0],a=t[1];return{seme:p.a.Seq(e).map((function(n){return n.text})).toSet(),nanpaIjo:p.a.Seq(e).map((function(n){return n.nanpaIjo})).concat(p.a.Seq(a).map((function(n){return n.nanpaIjo}))).toSet()}})),U=Object(O.alt)(Object(O.apply)(B,(function(n){var t=n.nanpaIjo;return{seme:n.seme,lonSeme:p.a.Set.of("ali"),nanpaIjo:t}})),Object(O.apply)(Object(O.seq)(B,D,B),(function(n){var t=Object(w.a)(n,3),e=t[0],a=t[1],i=t[2];return{seme:e.seme,lonSeme:i.seme,nanpaIjo:p.a.Set.of(a.nanpaIjo).union(e.nanpaIjo,i.nanpaIjo)}}))),Z=Object(O.apply)(Object(O.seq)(U,R,Object(O.alt)(C,W)),(function(n){var t=Object(w.a)(n,3),e=t[0],a=t[1],i=t[2];return{seme:e.seme,lonSeme:e.lonSeme,liSeme:p.a.Set.of(i.text),nanpaIjo:p.a.Set.of(a.nanpaIjo,i.nanpaIjo).union(e.nanpaIjo)}})),J=Object(O.kmid)(K,Z,K);function X(n){var t=n.successful?n.candidates.map((function(n){return n.result})):[];return p.a.Seq(t).filterNot((function(n){return t.some((function(t){return e=n.nanpaIjo,a=t.nanpaIjo,e.size<a.size&&e.isSubset(a);var e,a}))}))}var Y=e(25),_=function(n,t,e){var a=p.a.Seq.Keyed(t.entrySeq().flatMap((function(n){var t=Object(w.a)(n,2);t[0];return t[1].map((function(n){return n.filter((function(n){return I(n,"ijo")}))})).filterNot((function(n){return n.isEmpty()})).toKeyedSeq()}))).map((function(n){return{kulupu:"sitelen",nimi:n.first()}})),i=p.a.Seq.Keyed(t.toIndexedSeq().map(H).flatMap((function(n){return n})).map((function(n){return[n,{liLon:!1}]})));return{anteMute:a.concat(i)}};function H(n){var t=n.some((function(n){return n.contains("moli")}));return n.filter((function(n){return n.contains("weka")||t&&n.contains("mi")})).keySeq()}var V=function(n,t,e){return{anteMute:G("mi",n,t,e).toKeyedSeq().map((function(n){return{lon:n.tawa(e)}}))}},$=function(n,t,e){var a=G("anpa",n,t,"\u2193").toKeyedSeq().map((function(n){return{lon:n.tawa("\u2193")}})),i=G("sewi",n,t,"\u2191").toKeyedSeq().map((function(n){return{lon:n.tawa("\u2191")}}));return{anteMute:a.concat(i)}};function G(n,t,e,a){var i=p.a.Seq.Keyed(e.entrySeq().flatMap((function(t){var e=Object(w.a)(t,2),a=e[0];return e[1].filter((function(t){return t.contains(n)})).toKeyedSeq().mapEntries((function(n){var t=Object(w.a)(n,2),e=t[0];t[1];return[e,a]}))})));function o(n,i){var r=e.get(i),u=i.tawa(a),l=e.get(u);if(u.liInsaMa(t)&&Q(r,"awen").isEmpty()&&Q(l,"awen").isEmpty()){var c,s=Q(l,"tawa").union(Q(l,"mi")).toSeq().map((function(n){return o(n,u)}));return s.some((function(n){return n.isEmpty()}))?p.a.Seq.Keyed():(c=p.a.Seq.Keyed([[n,i]])).concat.apply(c,Object(Y.a)(s))}return p.a.Seq.Keyed()}return p.a.Map(i.map((function(n,t){return o(t,n)})).valueSeq().flatMap((function(n){return n})))}function Q(n,t){return void 0!==n?n.filter((function(n){return n.contains(t)})).keySeq().toSet():p.a.Set.of()}function nn(n,t){return t.some(tn)?"pini":function(n,t){var e=G("anpa",n,t,"\u2193"),a=G("sewi",n,t,"\u2191");return e.size>0||a.size>0}(n,t)?"tawa":"palisa"}function tn(n){var t=n.some((function(n){return n.contains("pini")})),e=n.some((function(n){return n.contains("mi")}));return t&&e}var en,an={nasin:void 0,suliMa:new j(NaN,NaN),lipuIjo:p.a.Map(),lonPali:p.a.Map(),lukinWawa:p.a.Set(),pilin:"pini"},on=function(n){Object(u.a)(e,n);var t=Object(l.a)(e);function e(n,a,i){Object(o.a)(this,e);var r=new v(n,a),u=function(n){var t=g(n);return p.a.Seq(t).map((function(n){return Object(O.expectEOF)(J.parse(n))})).flatMap(X).toArray()}(r),l=h(r,u),c=p.a.Seq(u).flatMap((function(n){return n.nanpaIjo})).concat(l.valueSeq().flatMap((function(n){return n.filter((function(n,t){return a.get(t).liSitelen()&&!n.isEmpty()})).keySeq()}))).toSet(),s=nn(n,l);return t.call(this,{nasin:i,suliMa:n,lipuIjo:a,lonPali:l,lukinWawa:c,pilin:s})}return Object(r.a)(e,[{key:"sin",value:function(n,t){var a=n(this.suliMa,this.lonPali,t),i=function(n,t){var e=n;return t.anteMute&&(e=e.merge(t.anteMute.map((function(n,t){return e.get(t).merge(n)})))),e}(this.lipuIjo,a);return new e(this.suliMa,i,t)}}]),e}(p.a.Record(an)),rn=e(15),un={nanpa:NaN,liLon:!1,lon:new j(NaN,NaN),kulupu:"nimi",nimi:"ala"},ln=function(n){Object(u.a)(e,n);var t=Object(l.a)(e);function e(n){var a;return Object(o.a)(this,e),a=t.call(this,n),s()("sitelen"!==n.kulupu||I(n.nimi,"ijo"),"ijo sitelen li ken ala jo e nimi '".concat(n.nimi,"'!")),a}return Object(r.a)(e,[{key:"liSitelen",value:function(){return"sitelen"===this.kulupu}},{key:"liNimi",value:function(){return"nimi"===this.kulupu}},{key:"tawa",value:function(n){return this.set("lon",this.lon.tawa(n))}}]),e}(p.a.Record(un));!function(n){n[n.Nimi=0]="Nimi",n[n.Sitelen=1]="Sitelen",n[n.Namako=2]="Namako",n[n.Kon=3]="Kon",n[n.Insa=4]="Insa"}(en||(en={}));var cn=Object(O.buildLexer)([[!0,/^[A-Z][A-Za-z]*/g,en.Nimi],[!0,/^[a-z]+/g,en.Sitelen],[!0,/^[^A-Za-z.\s][^.\s]*/g,en.Namako],[!0,/^\./g,en.Kon],[!1,/^\s+/g,en.Insa]]),sn=p.a.Set(x),pn=p.a.Set(N.ijo);function mn(n,t){var e=n.toLowerCase(),a=t?pn:sn;if(a.contains(e))return e;var i=a.filter((function(n){return n.startsWith(e)}));if(1===i.size)return i.first();throw i.isEmpty()?new Error("nimi '".concat(n,"' li ken open e ala!")):new Error("nimi '".concat(n,"' li ken open e '").concat(i.join("' anu '"),"''!"))}var fn=Object(O.apply)(Object(O.tok)(en.Nimi),(function(n){return[{kulupu:"nimi",nimi:mn(n.text,!1)}]})),kn=Object(O.apply)(Object(O.tok)(en.Sitelen),(function(n){return[{kulupu:"sitelen",nimi:mn(n.text,!0)}]})),jn=Object(O.apply)(Object(O.tok)(en.Kon),(function(n){return[]})),vn=Object(O.rep)(Object(O.alt)(fn,kn));function wn(n,t){return Object(O.expectSingleResult)(Object(O.expectEOF)(n.parse(cn.parse(t))))}var hn={nimiMa:"",suliMa:new j(NaN,NaN),tenpo:p.a.List(),tenpoNi:NaN},On=function(n){Object(u.a)(e,n);var t=Object(l.a)(e);function e(n){Object(o.a)(this,e);var a=function(n){var t=void 0!==n.namako?p.a.Map(n.namako).map((function(n){return wn(vn,n).flat()})):p.a.Map(),e=Object(O.apply)(Object(O.tok)(en.Namako),(function(n){var e=t.get(n.text);if(void 0!==e)return e;throw new Error("namako ".concat(n.text," li lon ala!"))})),a=Object(O.rep)(Object(O.alt)(fn,kn,e,jn)),i=p.a.Seq(n.ma).map((function(n){return wn(a,n)})).cacheResult(),o=i.map((function(n){return n.length})).toList();if(0===o.size)throw new Error("ma li jo e linja ala!");var r=new j(o.first(),o.size);if(0===r.x)throw new Error("linja ma li jo e leko ala!");if(o.skip(1).some((function(n){return n!==r.x})))throw new Error("suli pi linja ma li sama ala!");var u=i.flatMap((function(n,t){return p.a.Seq(n).flatMap((function(n,e){return p.a.Seq(n).map((function(n){return Object(rn.a)(Object(rn.a)({},n),{},{lon:new j(e,t)})}))}))})).map((function(n,t){return new ln(Object(rn.a)(Object(rn.a)({},n),{},{nanpa:t,liLon:!0}))})).toArray();return{nimiMa:n.nimi,suliMa:r,ijoAli:u}}(n),i=a.nimiMa,r=a.suliMa,u=a.ijoAli,l=p.a.Map(p.a.Seq(u).toKeyedSeq()),c=p.a.List.of(new on(r,l));return t.call(this,{nimiMa:i,suliMa:r,tenpo:c,tenpoNi:0})}return Object(r.a)(e,[{key:"tawaNi",get:function(){var n=this.tenpo.get(this.tenpoNi);return s()(n,"tenpo ni li ike!"),n}},{key:"panaENasin",value:function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=n?this.tenpo:this.tenpo.take(this.tenpoNi+1);return t.map((function(n){return n.nasin})).toArray()}},{key:"tenpoMonsi",value:function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.tenpoNi>0?this.set("tenpoNi",n?0:this.tenpoNi-1):this}},{key:"tenpoSinpin",value:function(){var n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return this.tenpoNi<this.tenpo.size-1?this.set("tenpoNi",n?this.tenpo.size-1:this.tenpoNi+1):this}},{key:"tenpoNanpa",value:function(n){return n>=0&&n<this.tenpo.size?this.set("tenpoNi",n):this}},{key:"tawaPalisa",value:function(n){var t=this.tawaNi;return s()("palisa"===t.pilin,"ken ala tawaPalisa!"),this.tawa(n,V,this.tenpoNi+1)}},{key:"tawaTawa",value:function(){var n=this.tawaNi;return s()("tawa"===this.tawaNi.pilin,"ken ala tawaTawa!"),s()(n.nasin,"O PALI: tawaTawa tan open musi."),this.tawa(n.nasin,$,this.tenpoNi)}},{key:"tawa",value:function(n,t,e){var a=Date.now(),i=this.tawaNi,o=i.sin(t,n).sin(_,n);if(o.lipuIjo.equals(i.lipuIjo))return this;var r=this.tenpo.take(e).push(o),u=Date.now();return console.log("tawa: ".concat(u-a)),this.merge({tenpo:r,tenpoNi:e})}},{key:"sinETenpoAli",value:function(n){var t=p.a.Seq(n.split("")).filter(f).cacheResult();if(0===t.size)return this;var e=this.tenpoMonsi(!0);return t.reduce((function(n,t){return function(n){for(var t=n;"tawa"===t.tawaNi.pilin;)t=t.tawaTawa();return t}(n.tawaPalisa(t))}),e).tenpoMonsi(!0)}}]),e}(p.a.Record(hn)),bn={"\u2191":["KeyW","ArrowUp"],"\u2193":["KeyS","ArrowDown"],"\u2190":["KeyA","ArrowLeft"],"\u2192":["KeyD","ArrowRight"],monsi:["KeyZ","Backspace"],sinpin:["KeyX","Insert"],open:["KeyR","Home"],pini:["KeyT","End"]},dn=S(bn),Sn=function(n){Object(u.a)(e,n);var t=Object(l.a)(e);function e(){var n;Object(o.a)(this,e);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(n=t.call.apply(t,[this].concat(i))).render=function(){return null},n.lukaPalisa=function(t){var e=dn.get(t.code);!e||t.repeat&&f(e)||(n.props.palisaLa(e),t.preventDefault())},n}return Object(r.a)(e,[{key:"componentDidMount",value:function(){window.addEventListener("keydown",this.lukaPalisa)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("keydown",this.lukaPalisa)}}]),e}(a.Component);function Nn(n){return bn[n].map((function(n){return"[".concat(n.replace(/^Key/,""),"]")}))}e(44),e(45);var yn,xn=e(12),In=e.n(xn),Mn={ijo:{kule:"#26a"},toki:{kule:"#555"},kulupu:{kule:"#682"},pali:{kule:"#b52"}},Ln={soweli:{kule:"#444",anteTawa:"poka"},waso:{kule:"#678",anteTawa:"poka"},kala:{kule:"#d80",anteTawa:"sikePoka"},akesi:{kule:"#294",anteTawa:"sikeSewi"},pipi:{kule:"#850",anteTawa:"sikeSewi"},jan:{kule:"#c86"},mije:{kule:"#04c"},meli:{kule:"#c08"},tomo:{kule:"#c60"},ma:{kule:"#666"},kiwen:{kule:"#478"},telo:{kule:"#09b"},ko:{kule:"#884",anteTawa:"sikeSewi"},kili:{kule:"#b10"},kasi:{kule:"#2a4"},pan:{kule:"#890"},sike:{kule:"#60a"},lipu:{kule:"#0aa"},nena:{kule:"#750"},lupa:{kule:"#750"},poki:{kule:"#a90"},supa:{kule:"#b80"},palisa:{kule:"#490",anteTawa:"sikeSewi"},ilo:{kule:"#488"},len:{kule:"#a94"},mani:{kule:"#c90"},linja:{kule:"#d00",anteTawa:"poka"},jaki:{kule:"#543",anteTawa:"sikePoka"},suno:{kule:"#c80",anteTawa:"sikeSewi"},mun:{kule:"#07d",anteTawa:"sikePoka"},pilin:{kule:"#e02"},olin:{kule:"#e05"},tenpo:{kule:"#555",anteTawa:"sikeSewi"},sijelo:{kule:"#a85"},lawa:{kule:"#d60",anteTawa:"poka"},luka:{kule:"#a85",anteTawa:"sikeSewi"},noka:{kule:"#830",anteTawa:"poka"},uta:{kule:"#d42"},kute:{kule:"#a85",anteTawa:"poka"},oko:{kule:"#24d",anteTawa:"sikePoka"},pu:{kule:"#109"}},Tn=e(23);function gn(n){return yn||(yn=function(){var n=document.createElement("canvas").getContext("2d");function t(t,e){return{nimiLili:t,suliPoka:Math.round(e/n.measureText(t).width)}}function e(n){return n.length<4?[t(n,En)]:null!==(e=p.a.Range(2,n.length-1).map((function(e){return[t(n.substring(0,e),Pn),t(n.substring(e),Pn)]})).minBy((function(n){var t=Object(w.a)(n,2),e=t[0],a=t[1];return Math.abs(e.suliPoka-a.suliPoka)})))&&void 0!==e?e:[];var e}n.font="normal 100px truculenta";var a,i={},o=Object(Tn.a)(x);try{for(o.s();!(a=o.n()).done;){var r=a.value;i[r]=e(r)}}catch(u){o.e(u)}finally{o.f()}return i}()),yn[n]}var En=8e3,Pn=10240;function qn(n,t,e,a){if(!t||"sikePoka"!==a&&"sikeSewi"!==a)return t&&"poka"===a?e.x>t.x?"scaleX(1)":e.x<t.x?"scaleX(-1)":n:"none";var i=e.x>t.x?0:e.y>t.y?.25:e.x<t.x?.5:e.y<t.y?.75:void 0;if(void 0!==i){var o,r="sikeSewi"===a?.25:0,u=null!==(o=function(n,t){var e=An.exec(n);return e?parseFloat(e[1])-t:void 0}(n,r))&&void 0!==o?o:0,l=Math.floor(u),c=i-(u-l);return"rotate(".concat(i+(l+(c<=-.5?1:0)+(c>=.5?-1:0))+r,"turn)")}return n}var An=/^rotate\((.*)turn\)$/,Kn=e(0),Wn=Object(a.memo)((function(n){var t=n.ijo,e=n.lukinWawa,i=t.liSitelen()?Ln[t.nimi]:Mn[M(t.nimi)],o=t.liSitelen()?i.anteTawa:void 0,r=In()("leko",{sitelen:t.liSitelen()},{wawa:e},{lonAla:!t.liLon}),u=function(n){var t=Object(a.useRef)();return Object(a.useEffect)((function(){t.current=n})),t.current}(t),l=Object(a.useState)("none"),c=Object(w.a)(l,2),s=c[0],p=c[1],m=(null===u||void 0===u?void 0:u.nimi)===t.nimi?qn(s,u.lon,t.lon,o):"none";m!==s&&p(m);var f={left:"".concat(t.lon.x,"em"),top:"".concat(t.lon.y,"em"),transform:m,color:i.kule};return Object(Kn.jsx)("div",{className:r,style:f,children:zn(t)})}));function zn(n){if(n.liSitelen())return Object(Kn.jsx)("span",{children:n.nimi});var t=gn(n.nimi),e=1===t.length?"linjaWan":"linjaTu",a=In()("nimi",e);return t.map((function(n,t){var e=n.nimiLili,i=n.suliPoka;return Object(Kn.jsx)("span",{className:a,style:{fontVariationSettings:"'wdth' ".concat(i,", 'opsz' 12")},children:e},t)}))}function Cn(n){var t=n.lipuIjo.map((function(t,e){return Object(Kn.jsx)(Wn,{ijo:t,lukinWawa:n.lukinWawa.contains(e)},e)})).toIndexedSeq(),e={width:"".concat(n.suli.x,"em"),height:"".concat(n.suli.y,"em")};return Object(Kn.jsxs)("div",{className:"ma",style:e,children:[Object(Kn.jsx)("div",{children:t}),n.liPini&&Object(Kn.jsxs)("div",{className:"pini",style:e,children:[Object(Kn.jsx)("p",{className:"pona sitelen",children:"pona"}),Object(Kn.jsx)("p",{className:"pona toki",children:"pona!"})]})]})}e(47);var Rn=function(n){var t=n.nasin,e=n.tenpoNi,a=n.tenpoNanpaLa,i=n.panaTanPokiLa;return Object(Kn.jsxs)(Kn.Fragment,{children:[Object(Kn.jsx)("div",{className:"pokiTenpo",children:Object(Kn.jsx)("div",{className:"tenpo",style:{left:"".concat(Dn(e,t.length),"em")},children:t.map((function(n,t){return Object(Kn.jsx)(Fn,{nasinTawa:n,nanpaTanNi:t-e,paliLa:function(){return a(t)}},t)}))})}),Object(Kn.jsxs)("div",{className:"panaTenpo",children:[Object(Kn.jsx)("button",{className:In()({kama:0===e}),title:"pana e nasin tawa poki",onClick:e>0?function(){return function(n,t){var e=n.slice(1,t+1).join("");navigator.clipboard.writeText(e)}(t,e)}:function(){},children:"content_copy"}),Object(Kn.jsx)("button",{title:"pana e nasin tan poki.\npali ala lon ilo lukin Firefox :(",onClick:function(){return function(n){navigator.clipboard.readText&&navigator.clipboard.readText().then((function(t){return n(t)}))}(i)},children:"content_paste"})]})]})};function Fn(n){var t=n.nasinTawa,e=n.nanpaTanNi,a=n.paliLa,i=In()({kama:e>0}),o=t?Zn[t]:"",r=Math.abs(e),u=r<=2?1===r?"wan":"tu":"mute",l=e>0?"sinpin":"monsi",c=1===r?"".concat("\n","palisa ").concat(Nn(l).join(" anu ")):"",s=t?0===e?"tenpo ni":"tawa ".concat(u," ").concat(l).concat(c):"open musi".concat("\n","palisa ").concat(Nn("open").join(" anu "));return Object(Kn.jsx)("div",{className:"tawa",children:Object(Kn.jsx)("button",{className:i,title:s,onClick:0!==e?a:function(){},children:o})})}function Dn(n,t){return Un+(t<=Bn?(Bn-t)/2:n>=Bn?Bn-n-1:0)}var Bn=23,Un=1.5;var Zn={"\u2191":"north","\u2193":"south","\u2190":"west","\u2192":"east"},Jn=function(n){Object(u.a)(e,n);var t=Object(l.a)(e);function e(){var n;Object(o.a)(this,e);for(var a=arguments.length,i=new Array(a),r=0;r<a;r++)i[r]=arguments[r];return(n=t.call.apply(t,[this].concat(i))).render=function(){return null},n.suli=220,n.timer=void 0,n.lukaTenpo=function(){n.weka(),n.props.tenpoLa()},n}return Object(r.a)(e,[{key:"componentDidMount",value:function(){this.pali()}},{key:"componentDidUpdate",value:function(n){this.weka(),this.pali()}},{key:"componentWillUnmount",value:function(){this.weka()}},{key:"pali",value:function(){this.timer=setInterval(this.lukaTenpo,this.suli)}},{key:"weka",value:function(){this.timer&&clearInterval(this.timer)}}]),e}(a.Component),Xn=function(n){Object(u.a)(e,n);var t=Object(l.a)(e);function e(n){var a;return Object(o.a)(this,e),(a=t.call(this,n)).lukaIloTenpo=function(){return a.setState({musi:a.state.musi.tawaTawa()})},a.lukaTenpoNanpa=function(n){return a.setState({musi:a.state.musi.tenpoNanpa(n)})},a.lukaPanaTanPoki=function(n){return a.setState({musi:a.state.musi.sinETenpoAli(n)})},a.lukaPalisa=function(n){if(!f(n)||"palisa"===a.state.musi.tawaNi.pilin){var t=a.paliPalisa[n];a.setState({musi:t(a.state.musi)})}},a.paliPalisa={"\u2191":function(n){return n.tawaPalisa("\u2191")},"\u2193":function(n){return n.tawaPalisa("\u2193")},"\u2190":function(n){return n.tawaPalisa("\u2190")},"\u2192":function(n){return n.tawaPalisa("\u2192")},monsi:function(n){return n.tenpoMonsi()},sinpin:function(n){return n.tenpoSinpin()},open:function(n){return n.tenpoMonsi(!0)},pini:function(n){return n.tenpoSinpin(!0)}},a.state={musi:new On(n.lipuMa)},a}return Object(r.a)(e,[{key:"render",value:function(){var n=this.state.musi,t=n.tawaNi;return Object(Kn.jsxs)("main",{children:[Object(Kn.jsx)("div",{className:"nimiMa",children:n.nimiMa}),Object(Kn.jsx)(Cn,{suli:n.suliMa,lipuIjo:t.lipuIjo,lukinWawa:t.lukinWawa,liPini:"pini"===t.pilin}),Object(Kn.jsx)(Rn,{nasin:n.panaENasin(!0),tenpoNi:n.tenpoNi,tenpoNanpaLa:this.lukaTenpoNanpa,panaTanPokiLa:this.lukaPanaTanPoki}),Object(Kn.jsx)(Sn,{palisaLa:this.lukaPalisa}),"tawa"===t.pilin&&Object(Kn.jsx)(Jn,{tenpoLa:this.lukaIloTenpo})]})}}]),e}(a.Component),Yn=(e(48),e(24)),_n=function(n){var t=n.paliLa;return Object(Kn.jsxs)("div",{className:"maSeme",children:[Object(Kn.jsx)("p",{children:"sina wile musi lon ma seme?"}),Object(Kn.jsx)("div",{className:"pokiMa",children:Yn.map((function(n,e){return Object(Kn.jsx)("button",{onClick:function(){return t(n)},children:n.nimi},e)}))})]})},Hn=function(n){Object(u.a)(e,n);var t=Object(l.a)(e);function e(n){var a;return Object(o.a)(this,e),(a=t.call(this,n)).lukaPali=function(n){return a.setState({lipuMa:n})},a.lukaMonsi=function(){return a.setState({lipuMa:void 0})},a.state={},a}return Object(r.a)(e,[{key:"render",value:function(){return Object(Kn.jsxs)(Kn.Fragment,{children:[Object(Kn.jsxs)("header",{onClick:this.lukaMonsi,children:[Object(Kn.jsx)("h1",{children:"soweli li mi"}),Object(Kn.jsx)("h2",{children:"soweli li mi"}),Object(Kn.jsx)("h3",{children:"nimi li lon la ijo li lon"})]}),this.state.lipuMa?Object(Kn.jsx)(Xn,{lipuMa:this.state.lipuMa}):Object(Kn.jsx)(_n,{paliLa:this.lukaPali})]})}}]),e}(a.Component),Vn=function(n){n&&n instanceof Function&&e.e(3).then(e.bind(null,50)).then((function(t){var e=t.getCLS,a=t.getFID,i=t.getFCP,o=t.getLCP,r=t.getTTFB;e(n),a(n),i(n),o(n),r(n)}))};Object(i.render)(Object(Kn.jsx)(a.StrictMode,{children:Object(Kn.jsx)(Hn,{})}),document.getElementById("sijelo")),Vn()}},[[49,1,2]]]);
//# sourceMappingURL=main.3e4a3755.chunk.js.map