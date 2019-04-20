import Password from 'constants/records/Password';

const password1 = {
  username: 'foo',
  password: 'bar',
  title: 'Hello World',
  url: 'https://google.com',
  group: 'Social'
};

const password2 = {
  username: 'foo',
  password: 'bar',
  title: 'Singularity',
  url: 'https://google.com',
  group: 'Social'
};

const password3 = {
  username: 'foo',
  password: 'bar',
  title: 'Best Bank',
  url: 'https://google.com',
  group: 'Banking'
};

export const passwordGroups = [
  { group: 'Social', passwords: [password1, password2] },
  { group: 'Banking', passwords: [password3] }
];

export const credentials = {
  username: 'foo',
  password: 'bar'
};
