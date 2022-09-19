// TODO Remove it
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  alias: {
    '@consts': path.resolve(__dirname, 'src/consts/'),
    '@contexts': path.resolve(__dirname, 'src/contexts/'),
    '@components': path.resolve(__dirname, 'src/components/'),
    '@hooks': path.resolve(__dirname, 'src/hooks/'),
    '@pages': path.resolve(__dirname, 'src/pages/'),
    '@ui-kit': path.resolve(__dirname, 'src/ui-kit/'),
    '@utils': path.resolve(__dirname, 'src/utils/'),
    '@styles': path.resolve(__dirname, 'src/styles/'),
  },
};
