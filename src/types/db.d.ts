interface User {
  name: string;
  email: string;
  image: string;
  id: string;
}

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  timestamp: number;
  text: string;
}

interface Chat {
  id: string;
  messages: Message[];
}

interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
}
