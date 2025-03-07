import styled from "styled-components";

const Home = () => {
  return (
    <Container>
      <HeroSection>
        <TextContent>
          <h1>Capture Your Moments</h1>
          <p>Upload, organize, and share your best photos effortlessly.</p>
          <Button>Get Started</Button>
        </TextContent>
      </HeroSection>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  color: white;
`;

const HeroSection = styled.div`
  text-align: center;
`;

const TextContent = styled.div`
  max-width: 600px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 25px;
  background: white;
  color: #ff7e5f;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: #ff5722;
    color: white;
  }
`;
