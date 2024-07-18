import styled from 'styled-components/native';


export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #203C3F;
`;

export const Logo = styled.View`
 padding-Bottom: 20px;
`;

export const InputForm = styled.TextInput`
    background-Color: #f5f5f5;
        width: 90%;
        margin-Bottom: 15px;
        color: #10101c;
        font-Size: 18px;
        border-Radius: 20px;
        padding: 10px;
`;

export const BtnSubmitForm = styled.TouchableOpacity `
        background-Color: #1f51fe;
        width: 90%;
        height: 45px;
        align-Items: center;
        justify-Content: center;
        border-Radius: 20px;

`;


export const TxtSubmitForm = styled.Text `
        color: #f5f5f5;
        font-Size: 22px;

`;

export const LinkNewUser = styled.Text `
        color: #1f51fe;
        margin-Top: 10;
        font-Size: 18;

`;

export const LoadingArea = styled.View`
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.6);
        align-items: center;
        justify-content: center;

`;