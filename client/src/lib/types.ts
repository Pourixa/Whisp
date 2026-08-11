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
