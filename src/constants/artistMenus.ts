export const  artistAreaMenus = [
  {
    name:"全部",
    key:-1,
    activity:true
  },
  {
    name:"华语",
    key:7,
    activity:false
  },
  {
    name:"欧美",
    key:96,
    activity:false
  },
  {
    name:"日本",
    key:8,
    activity:false
  },
  {
    name:"韩国",
    key:16,
    activity:false
  },
  {
    name:"其他",
    key:0,
    activity:false
  },
]

export const artistTypeMenus = [
  {
    name:'全部',
    key:-1,
    activity:true
  },
  {
    name:'男歌手',
    key:1,
    activity:false
  },
  {
    name:'女歌手',
    key:2,
    activity:false
  },
  {
    name:'乐队',
    key:3,
    activity:false
  },
]
var initalPart = []
for (let i = 65; i < 91; i++) {
let obj = {name:'',key:'',activity : false};
 obj.name = String.fromCharCode(i)
 obj.key =String.fromCharCode(i+32)
 initalPart.push(obj)
 
}

export const  artistInitialMenus = [
  {
    name:'热门',
    key:-1,
    activity:true
  },
  ...initalPart,
  {
    name:'其他',
    key:0,
    activity:false
  },
]