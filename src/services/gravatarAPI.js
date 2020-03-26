import MD5 from 'crypto-js/md5';

const GRAVATAR_BASE_API = 'https://www.gravatar.com/avatar/';
const defaultImage = 'https://www.gravatar.com/avatar/2d3bf5b67282f5f466e503d7022abcf3';

const getGravatar = (email) => {
  const hash = MD5(email.toLowerCase().trim());
  return `${GRAVATAR_BASE_API}${hash}?d=${defaultImage}`;
};

export default getGravatar;
