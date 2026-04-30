let graph = {};
let nodes = new Set();

function normalize(name){
return name.trim().toLowerCase();
}

function addRoad(){

let A = normalize(document.getElementById("locA").value);
let B = normalize(document.getElementById("locB").value);
let d = parseFloat(document.getElementById("distance").value);

if(!A || !B || !d){
alert("Please enter valid road details");
return;
}

if(!graph[A]) graph[A]=[];
if(!graph[B]) graph[B]=[];

graph[A].push({node:B,weight:d});
graph[B].push({node:A,weight:d});

nodes.add(A);
nodes.add(B);

updateDropdowns();
displayRoads();

}

function updateDropdowns(){

let start=document.getElementById("start");
let end=document.getElementById("end");

start.innerHTML="";
end.innerHTML="";

nodes.forEach(n=>{
start.add(new Option(n,n));
end.add(new Option(n,n));
});

}

function displayRoads(){

let list = document.getElementById("roadList");
list.innerHTML = "";

let shown = new Set();

for(let A in graph){

for(let edge of graph[A]){

let B = edge.node;
let key = [A,B].sort().join("-");

if(!shown.has(key)){

let li = document.createElement("li");
li.textContent = `${A} → ${B} (${edge.weight} km)`;

list.appendChild(li);

shown.add(key);
}
}
}
}



function findRoute(){

let start=document.getElementById("start").value;
let end=document.getElementById("end").value;

let dist={};
let prev={};

nodes.forEach(n=>dist[n]=Infinity);

dist[start]=0;

let pq=[[0,start]];

while(pq.length){

pq.sort((a,b)=>a[0]-b[0]);
let [d,u]=pq.shift();

if(u===end) break;

(graph[u]||[]).forEach(edge=>{

let v=edge.node;
let newDist=d+edge.weight;

if(newDist<dist[v]){

dist[v]=newDist;
prev[v]=u;
pq.push([newDist,v]);

}

});

}

if(dist[end]===Infinity){

document.getElementById("result").innerHTML="No route found.";
return;

}

let path=[];
let cur=end;

while(cur){
path.unshift(cur);
cur=prev[cur];
}

document.getElementById("result").innerHTML=
`Distance: ${dist[end]} km <br> Path: ${path.join(" → ")}`;

}