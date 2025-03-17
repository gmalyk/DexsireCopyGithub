import styled from "styled-components";
import { Icon } from "ui/styled";

export const AgeVerification = styled.div.attrs({
})`
    display: flex;
    max-width: 457px;
    background: ${props => props.theme.palette.colors.black};
    border-radius: 40px;
    padding: 48px;
    gap: 33px;
    flex-direction: column;
    align-items: center;
`;

export const CompanyButtonContainer = styled.div.attrs({
})`
    width: 100%;
    display: flex;
    gap: 16px;
`;

export const CloseContainer = styled.div.attrs({
})`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`;

export const Logo = styled(Icon).attrs({})`
    width: 155px;
    height: 32px;    
`;

export const ModalTitle = styled.div.attrs({})`
    font-family: Inter;
    font-size: 24px;
    font-weight: 500;
    line-height: 29.05px;
    text-align: center;
    color: ${p => p.theme.palette.error.main}
`;

export const ModalText = styled.div.attrs({})`
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    color: ${p => p.white ? p.theme.palette.colors.white : p.theme.palette.colors.purple};
    ${p => p.big ? `
        font-size: 24px;
        ` : ''};
    ${p => p.link ? `
        &:hover{
            text-decoration: underline;
            cursor: pointer;
        }
        ` : ``};
    
`;


export const TermContainer = styled.div.attrs({})`
        display: flex;
        flex-direction: column;
        gap: 6px;
`;

export const TermLink = styled.div.attrs({})`
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    text-align: left;

`;