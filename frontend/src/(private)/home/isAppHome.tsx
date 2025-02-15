import React,{useEffect} from "react";
import { Block } from "../../components";
import NavBar from "../Navbar";
import PostGridApp from "./PostGripApp";
import { IUser, IPosts } from "../../constants/types";
import AIChatboxIcon from "../AIChatboxIcon";
export default function AppHome({
  user,
  posts,
}: {
  user: IUser;
  posts: IPosts | null;
}) {
  return (
    <Block safe center style={{ alignSelf: "center" }} scroll>
        {user && posts && <PostGridApp user={user} posts={posts} />}
        <AIChatboxIcon />
      <NavBar currentScreen="Home" />
    </Block>
  );
}
