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