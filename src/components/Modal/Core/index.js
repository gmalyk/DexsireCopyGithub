import React, { useContext, useEffect } from 'react'
import { CoreContext } from 'context/CoreContext'
import { ThemedComponent } from 'ui/theme'

import ModalSample from '../Sample'
import ModalAgeVerification from '../AgeVerification'
import ModalSearchAdvanced from '../SearchAdvanced'
import ModalPurchaseDetails from '../PurchaseDetails'
import ModalDeleteAccounts from '../DeleteAccounts'
import ModalTerms from '../Term'
import ModalPrivacyPolicy from '../Privacy'
import ModalProfile from '../Profile'

import { useLocation, useHistory } from "react-router-dom";
import useTracker from 'hooks/useTracker'
import useInactivity from 'hooks/useInactive'
import { DoLogout } from 'services/authentication'

export default function ModalCore() {

  const history = useHistory();
  const navigate = to => history.push(`/${to}`);

  const location = useLocation();
  const { modal, setTracker, user, setUser, superModal } = useContext(CoreContext)

  const { track } = useTracker()
  const { isInactive } = useInactivity()

  const exit = async () => {
    if(user?.email){
      await DoLogout()
      setUser(null)
      setTracker(null)
      navigate('')
    }
  }

  useEffect(() => {
      track("visit", { page:location.pathname })
  }, [location]);

  useEffect(() => {
      if(isInactive){ exit() ;}
  }, [isInactive]);

  return (
    <>
      <ThemedComponent>
        {modal?.type === 'ageverification' ? <ModalAgeVerification /> : null}
        {modal?.type === 'searchadvanced' ? <ModalSearchAdvanced /> : null}

        {modal?.type === 'purchasedetails' ? <ModalPurchaseDetails /> : null}
        
        {modal?.type === 'deleteaccount' ? <ModalDeleteAccounts /> : null}
        {modal?.type === 'profile' ? <ModalProfile /> : null}
        {modal?.type === 'terms' || superModal?.type === 'terms' ? <ModalTerms /> : null}
        {modal?.type === 'privacy' || superModal?.type === 'privacy'  ? <ModalPrivacyPolicy /> : null}
      </ThemedComponent>
    </>
  )
}