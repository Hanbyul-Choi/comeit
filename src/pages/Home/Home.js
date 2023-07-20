import { Header, PostForm, Sidebar } from "components";
import { Show } from "components/ExtendSideBar/Show/Show";
import { Container, NaverMap } from "react-naver-maps";
import * as Styled from "./Home.styles";

export const Home = () => {
  // const [extendtype, setExtendtype] = useState("");
  // const [showExtend, setshowExtend] = useState("");

  return (
    <>
      <Header />
      <Styled.Container>
        <Sidebar />

        {/* {showExtend && extendtype === "post" ? <Post /> : <Show />}         */}
        {/* {extendtype === "post" ? <Post /> : <Show />} */}
        <PostForm />
        <Show />
        <Container style={{ flex: 1 }}>
          <NaverMap />
        </Container>
      </Styled.Container>
    </>
  );
};
