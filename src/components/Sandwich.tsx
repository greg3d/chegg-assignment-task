import styled from 'styled-components'
const SandwichContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 6px;
  margin: 8px 0;
  justify-content: space-between;
`
const Line = styled.div`
  width: 20px;
  height: 2px;
  background: #dddddd;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  .navbar-toggler:not(.collapsed) &:first-child {
    background: #fff;
    transform: translateY(8px) rotate(45deg);
  }
  .navbar-toggler:not(.collapsed) &:nth-child(2) {
    opacity: 0;
    background: #fff;
  }
  .navbar-toggler:not(.collapsed) &:last-child {
    background: #fff;
    transform-origin: center;
    transform: translateY(-8px) rotate(-45deg);
  }
`
const Sandwich = () => {
    return (
        <SandwichContainer>
            <Line/>
            <Line/>
            <Line/>
        </SandwichContainer>
    );
};
export default Sandwich;