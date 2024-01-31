interface UserEntity {
  id: string;
}

const user1: UserEntity = {
  id: '0fe36d16-49bc-4aab-a227-f84df899a6cb'
}

const user2: UserEntity = {
  id: '6nt12b43-49bc-4aab-a227-f84df899a6cb'
}

let usersArray: UserEntity[] =[user1, user2];

export { usersArray, UserEntity }