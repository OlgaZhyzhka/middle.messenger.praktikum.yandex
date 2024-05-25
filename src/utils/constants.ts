export const query = '#app';

export const holder = '/images/logotype-mini.svg';

export const contacts = [
  {
    id: '12121',
    firstName: 'Maria',
    login: 'Maria',
    lastName: 'Malnich',
    phone: '+7 999 999 99 99',
    chatName: 'Maria',
    lastMessage: 'Chatgram Web was updated.',
    time: '19:48',
    avatar: '/images/avatar2.jpg',
    unreadCount: 1,
  },
  {
    id: '45464',
    firstName: 'Maria2',
    login: 'Maria2',
    lastName: 'Malnich',
    phone: '+7 999 999 99 99',
    chatName: 'Maria2',
    lastMessage: 'Chatgram Web was updated.',
    time: '19:48',
    avatar: '/images/avatar2.jpg',
    unreadCount: 1,
  },
];

export const contactsMap = new Map(contacts.map((contact) => [contact.id, contact]));

export const logoData = {
  src: '/images/logo.svg',
  text: 'Chateo',
};

export const chatMessages = [
  {
    id: '1',
    user_id: '12121',
    content: 'Привет, как дела?',
    time: '12:00',
    type: 'base',
    incoming: true,
    isRead: true,
  },
  {
    id: '2',
    user_id: '45464',
    content: 'Привет, все хорошо, спасибо!',
    time: '12:01',
    type: 'base',
    incoming: false,
    isRead: true,
  },
];
