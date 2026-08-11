export type message = {
  username: String,
  content: String,
  dateCreated:Date,
}

export type chat = {
  name:String,
  members: String[],
  messages: message[]
}


export type user = {
  name:String,
  username:String,
  lastOnline:Date,
  isOnline:boolean,
  avatar:String,
  about:String,
  messages:message[]
  isFriend:boolean
}