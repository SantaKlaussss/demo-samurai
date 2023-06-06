import profileReducer, { deletedPosts } from "./profile-reducer"

it('length of posts should mini', () => {
  let state = {
    posts: [
      { id: 1, message: 'Hi, how are you?', likesCount: 12 },
      { id: 2, message: 'Its, how are you?', likesCount: 10 },
      { id: 3, message: 'Привет как дела', likesCount: 12 },
      { id: 4, message: 'позвонишь?', likesCount: 10 },
      { id: 5, message: 'Фашисты работают над документацией', likesCount: 12 },
      { id: 6, message: 'Димыч красавчик', likesCount: 10 },
    ]
  }

  let action = deletedPosts(1);
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(5);
});
