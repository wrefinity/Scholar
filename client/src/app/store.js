import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../Slicer/Post";
import GalleryReducer from "../Slicer/Gallery";
import AuthReducer from "../Slicer/Auth";
import CommentReducer from "../Slicer/Comment";
import ServiceReducer from "../Slicer/Service";
import AboutReducer from "../Slicer/About";
import patnerReducer from "../Slicer/Partners";
import MemberReducer from "../Slicer/Members";
import userReducer from "../Slicer/UserSlice";
import categoriesReducer from "../Slicer/Categories";
import scholarReducer from "../Slicer/ScholarApply";
import CatPergants from "../Slicer/CatPergant";
import Pergant from "../Slicer/Pergent";
import typeReducer from "../Slicer/Types";
import subcriberReducer from "../Slicer/Utils"
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
    partners: patnerReducer,
    categories: categoriesReducer,
    scholarships: scholarReducer,
    types: typeReducer,
    catpergants: CatPergants,
    pergants: Pergant,
    subcribe:subcriberReducer,
  },
});
export default store;
