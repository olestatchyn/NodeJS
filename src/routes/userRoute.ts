import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import User from '../models/user'
import { parse } from 'url';
import _ from 'lodash';

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = parse(req.url, true);

  switch (parsedUrl.pathname) {
    case '/':
      res.writeHead(200);
      res.end(JSON.stringify({ message: 'Welcome to the API!' }));
      break;

    case '/users':
      if (req.method === 'GET' && !parsedUrl.query.id) {
        let shortUsers = _.cloneDeep(users);
        shortUsers.forEach(element => {
          delete element.hobbies;
        });
        res.writeHead(200);
        res.end(JSON.stringify(shortUsers));
      }

      if (req.method === 'GET' && parsedUrl.query.id) {
        let foundUser: boolean;
        users.forEach(element => {
          if(element.id === parsedUrl.query.id){
            foundUser = true;
            res.writeHead(200);
            res.end(JSON.stringify(element));
          }
        });
        if(!foundUser){
          res.writeHead(404);
          res.end(JSON.stringify(`User with id ${parsedUrl.query.id} doesn't exist`));
        }
      }
      
      if (req.method === 'POST') {
        let body: string = '';

        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          const data: User = JSON.parse(body);
          const newUser: User = { ...data, id: uuidv4() };

          users.push(newUser);

          res.writeHead(201);
          res.end(JSON.stringify(`User created`));
        });
      }

      if (req.method === 'PATCH' && parsedUrl.query.id) {
        let data: User;
        let body: string = '';
    
        req.on('data', (chunk) => {
          body += chunk;
        });
    
        req.on('end', () => {
          data = JSON.parse(body);
          let foundUser: boolean = false;
    
          users.forEach(element => {
            if(element.id === parsedUrl.query.id){
              foundUser = true;
    
              if(data.name) element.name = data.name;
              if(data.email) element.email = data.email;
              if(data.hobbies) element.hobbies = data.hobbies;
    
              res.writeHead(200);
              res.end(JSON.stringify(element));
            }
          });
    
          if(!foundUser){
            res.writeHead(404);
            res.end(JSON.stringify(`User with id ${parsedUrl.query.id} doesn't exist`));
          }
        });
      }

      if (req.method === 'DELETE' && parsedUrl.query.id) {
        const userIdToDelete = parsedUrl.query.id;

        const indexToDelete = users.findIndex(element => element.id === userIdToDelete);
      
        if (indexToDelete !== -1) {
          const deletedUser = users.splice(indexToDelete, 1)[0];
          res.writeHead(200);
          res.end(JSON.stringify(`User with id ${deletedUser.id} was deleted`));
        } else {
          res.writeHead(404);
          res.end(JSON.stringify(`User with id ${userIdToDelete} not found`));
        }
      }

      break;

    case '/hobbies':
      if (req.method === 'GET' && parsedUrl.query.id) {
        let foundUser = false;
        users.forEach(element => {
          if (element.id === parsedUrl.query.id) {
            foundUser = true;
            res.writeHead(200);
            res.end(JSON.stringify(element.hobbies));
          }
        });
        if (!foundUser) {
          res.writeHead(404);
          res.end(JSON.stringify(`User with id ${parsedUrl.query.id} doesn't exist`));
        }
      }

      if (req.method === 'POST' && parsedUrl.query.id) {
        let body = '';

        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', () => {
          const data = JSON.parse(body);
          let foundUser = false;
          users.forEach(element => {
            if (element.id === parsedUrl.query.id) {
              foundUser = true;
              element.hobbies.push(data.hobbies[0]);
              res.writeHead(201);
              res.end(JSON.stringify(element.hobbies));
            }
          });
          if (!foundUser) {
            res.writeHead(404);
            res.end(JSON.stringify(`User with id ${parsedUrl.query.id} doesn't exist`));
          }
        });
      }

      if (req.method === 'DELETE' && parsedUrl.query.id) {
        let body = '';

        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', () => {
          const data = JSON.parse(body);
          let foundUser = false;
          users.forEach(element => {
            if (element.id === parsedUrl.query.id) {
              foundUser = true;
              element.hobbies = element.hobbies.filter(item => item !== data.hobbies[0]);
              res.writeHead(200);
              res.end(JSON.stringify(element.hobbies));
            }
          });
          if (!foundUser) {
            res.writeHead(404);
            res.end(JSON.stringify(`User with id ${parsedUrl.query.id} doesn't exist`));
          }
        });
      }

      break;

    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Resource not found' }));
      console.log('Resource not found');
  }
};

const users: User[] = [
  {
    id: '1',
    name: 'Ann',
    email: 'ann@google.com',
    hobbies: ['books', 'sport', 'dancing'],
  },
  {
    id: '2',
    name: 'Ben',
    email: 'ben@google.com',
    hobbies: ['series', 'sport'],
  },
];

export default requestListener;