import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../Slicer/Post";
import GalleryReducer from "../Slicer/Gallery";
import AuthReducer from "../Slicer/Auth";
import CommentReducer from "../Slicer/Comment";
import ServiceReducer from "../Slicer/Service";
import AboutReducer from "../Slicer/About";
import MemberReducer from "../Slicer/Members";
import userReducer from "../Slicer/UserSlice";
import categoriesReducer from "../Slicer/Categories";
const store = configureStore({
  reducer: {
    posts: postReducer,
    galleries: GalleryReducer,
    auth: AuthReducer,
    comments: CommentReducer,
    services: ServiceReducer,
    members: MemberReducer,
    users: userReducer,
    about: AboutReducer,
    categories: categoriesReducer,
  },
});
export default store;
