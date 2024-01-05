import * as http from 'http';
import requestListener from './src/routes/userRoute';

const server = http.createServer(requestListener);
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});