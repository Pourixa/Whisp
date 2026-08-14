export type message = {
  username: String,
  content: String,
  dateCreated:Date,
}

export type ChatT = {
  id:string
  name:string,
  members: any[],
  messages: any[]
}

export const chat:ChatT =  {
  id:"",
  name:" ",
  members: [
    {
      avatar:"",
      lastOnline:new Date(),  
      name:"",
      sentRequests:[],
      receivedRequests:[]
    }
  ],
  messages: [
        {
      name:""
    }
  ]

}


export const User = {
  name: "",
  username:"",
  lastOnline:new Date(),
  isOnline:true,
  avatar:"",
  about:"",
  messages:[],
  chats:[],
  sentRequests:[],
  receivedRequests:[]
}

export type User = {
  name: "",
  username:"",
  lastOnline:Date,
  isOnline:true,
  avatar:"",
  about:"",
  messages:[],
  chats:[],
  sentRequests:[],
  receivedRequests:[]
}