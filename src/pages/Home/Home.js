import { Header, PostForm, Show, Sidebar } from "components";
import { Container, NaverMap } from "react-naver-maps";
import { useLocation } from "react-router-dom";
import * as Styled from "./Home.styles";

export const Home = () => {
  // const [extendtype, setExtendtype] = useState("");
  // const [showExtend, setshowExtend] = useState("");
  const currentUrl = useLocation();

  return (
    <>
      <Header />
      <Styled.Container>
        <Sidebar />

        {currentUrl.pathname !== "/home" && currentUrl.pathname.includes("post") ? (
          <PostForm />
        ) : (
          <Show />
        )}
        <Container style={{ flex: 1 }}>
          <NaverMap />
        </Container>
      </Styled.Container>
    </>
  );
};
