import styled from 'styled-components';

export const Container = styled.div`
	 ${({theme}) => `
		  width: 100vw;
		  flex-direction: column;
		  height: 100vh;
		  position: absolute;
		  display: flex;
		  background-color: ${theme.palette.background.default};
	 `}
`;

export const Header = styled.div`
	 background-color: white;
	 width: 100vw;
	 height: 70px;
	 display: flex;
	 align-items: center;
	 
	 ul {
		  list-style-type: none;
		  margin: 0;
		  padding: 0;
		  overflow: hidden;
	 }
	 
	 li {
	 font-weight: bold;
	 	margin: 20px;
		float: left;
	 }
`;