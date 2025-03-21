import React, { useContext, useEffect, useMemo } from 'react'
import { FooterButtonContainer, FooterContainer, FooterContent, FooterEnd, FooterEndContainer, FooterInfo, FooterInfoText, FooterLogo, FooterOptionsContent, FooterSection, FooterSectionOptions, FooterSocial, FooterSocialIconContainer, FooterText, LangContent, LangItem, LangScroll, SectionTitle, WrapLanguages } from './styled'
import { Icon } from 'ui/styled'
import Button from 'components/Form/Button'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { CoreContext } from 'context/CoreContext'
import { DoLogout } from 'services/authentication'
import { Read, ReadOne } from 'services/core'
import { normalizeStrapiList, normalizeStrapiRegister } from 'utils'
import useI18n from 'hooks/useI18n'
import { optionsLanguage } from 'utils/options'
import LangSelector from 'components/LangSelector'

export default function Footer() {

  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const { setModal,setTracker, user, setUser, setServices, setRegions, setCities, setContactUs, regions, contactUs, setFilter } = useContext(CoreContext)

  const { t } = useI18n()

  const exit = async () => {  
		await DoLogout() 
        setUser(null)
        setTracker(null)
		navigate('login');
	}  

  const socials = useMemo(() => [
    !contactUs?.instagram ? null : {
      icon: 'insta',
      link: contactUs?.instagram
    },
    !contactUs?.youtube ? null : {
      icon: 'youtube',
      link:  contactUs?.youtube
    },
    !contactUs?.linkedin ? null : {
      icon: 'linkedin',
      link:  contactUs?.linkedin
    }
  ].filter(f => f), [contactUs])

  const footerOptions = [
    // { title: 'Customer plans', },
    // { title: 'Plans for advertisers', },
    // { title: 'How it works', },
    // { title: 'About Us', },
  ]

  const footerRegions = useMemo(() => {
    return regions?.filter(f => f?.highlight)
  }, [regions])

  const footerContact = useMemo(() => [
    !contactUs?.email ? null :{ title: contactUs?.email, icon: 'email' },
    !contactUs?.phone ? null :{ title: contactUs?.phone, icon: 'phone-orange' },
  ].filter(f => f), [contactUs])
 
  // const buttons = []
  const buttons = useMemo(() => [
    user?.email ? null : { title: t("login_register"), icon: 'user', action: () => navigate('pre-login') },
    user?.email ? null : { title: t("announcement"), icon: 'megaphone', action:() => navigate('announcement') },
    !user?.email ? null : { title: t("my_profile"), icon: 'lock', action:  (user?.model || user?.admin) ? () => setModal({ type: 'profile' }) : () => navigate('profile/customer') },
    !user?.email ? null : { title: t("exit"), icon: 'exit', action: () => exit() },
  ].filter(f => f), [user, t])

  const filterRegion = item => {
    setFilter({ region:item?.id })
    navigate("")
    window.scrollTo(0, 0)
  }

  const init = async () => {
      const rs = await Read("services")
      const rr = await Read("regions")
      const rct = await Read("cities")
      const rc = await Read("contact-us")
      
      const nrs = normalizeStrapiList(rs)
      const nrr = normalizeStrapiList(rr) 
      const nrct = normalizeStrapiList(rct) 
      const nrc = normalizeStrapiRegister(rc) 

      // console.log("static", nrs, nrr, nrc)

      if(nrs){ setServices(nrs) }
      if(nrr){ setRegions(nrr) }
      if(nrct){ setCities(nrct) }
      if(nrc){ setContactUs(nrc) }
  }

  useEffect(() => { init() ;}, [])

  return (
    <>
      <FooterContainer>
        <FooterContent>
          <FooterOptionsContent>
            <FooterSection>
              <FooterLogo icon="logo" />
              <FooterText purple>
                { t("connecting_you_to_the_highest_level_of_experience") }
              </FooterText>
              <FooterSocial>
                {
                  socials.map((social, index) => (
                    <FooterSocialIconContainer
                      key={index}
                      onClick={() => window.open(social?.link, "new")}
                    >
                      <Icon icon={social.icon} />
                    </FooterSocialIconContainer>
                  ))
                }
              </FooterSocial>
            </FooterSection>
            <FooterSection>
              {
                footerOptions.map((option, index) => (
                  <FooterText key={index}>
                    {option.title}
                  </FooterText>
                ))
              }
            </FooterSection>

            <FooterSection>
              <SectionTitle>
                { t("find_escorts_by_region") }
              </SectionTitle>
              <FooterSectionOptions>

                {
                  footerRegions.map((option, index) => (
                    <FooterText key={index} onClick={() => filterRegion(option)}>
                      {option.title}
                    </FooterText>
                  ))
                }
              </FooterSectionOptions>
            </FooterSection>
            <FooterSection>
              <SectionTitle>
                { t("contact_us") }
              </SectionTitle>
              <FooterSectionOptions>

                {
                  footerContact.map((option, index) => (
                    <FooterText key={index}>
                      <Icon icon={option.icon} />
                      {option.title}
                    </FooterText>
                  ))
                }
              </FooterSectionOptions>
            </FooterSection>

          </FooterOptionsContent>
          <FooterEnd>

            <FooterEndContainer>
              <FooterButtonContainer>

                {
                  buttons.map((m, k) => (
                    <Button nospace primary small leftIcon={m?.icon} onClick={m?.action}>
                      {m?.title}
                    </Button>
                  ))
                }
                <LangSelector footer />
              </FooterButtonContainer>
                  <Button outlineGradient width={'313px'} nospace onClick={() => navigate('faq')}>
                    { t("frequently_asked_questions") }
                  </Button>
            </FooterEndContainer>
            <FooterInfo>
              <FooterInfoText>
                { t("copyright_2024_dexsire") }
              </FooterInfoText>
              <FooterInfoText link onClick={() => setModal({ type: 'privacy' })}>
                { t("privacy_policy") }
              </FooterInfoText>
              <FooterInfoText link onClick={() => setModal({ type: 'terms' })}>
                { t("service_terms") }                
              </FooterInfoText>
            </FooterInfo>
          </FooterEnd>
        </FooterContent>
      </FooterContainer>
    </>
  )
}
