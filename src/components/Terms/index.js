import React, { useContext } from 'react'

import { CoreContext } from 'context/CoreContext'
import { Container, SubTitle, TermContainer, TermContent, TermText, TermTitle, TextContainer } from './styled'
import { FormSpacer, Title } from 'ui/styled'



export default function Terms({ terms, title, subtitle }) {

  const { setModal } = useContext(CoreContext)

  return (
    <>
      <Container>
        <Title nomargin> {title}</Title>
        <SubTitle>
          {subtitle}
        </SubTitle>
        <FormSpacer />
        <TermContent>
          <TermContainer>
            {terms.map((term, index) => (
              <TextContainer key={index}>
                <TermTitle bold>{term.title}</TermTitle>
                <TermText>{term.content}</TermText>
              </TextContainer>
            ))}
          </TermContainer>
        </TermContent>
      </Container>
    </>
  )
}