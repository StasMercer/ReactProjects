import { Alert, Button } from 'antd'
import React, { useContext, useState } from 'react'
import { get_string } from '../i18n/strings'
import { Context } from '../utils/store'

interface Props{
    info: string
}

export default function InstantReservation() {
    const [alert, setAlert] = useState<'success'|'error'|null>(null)
    const {state} = useContext(Context)
    return (
        <div
                className="site-layout-background drying-room"
            >

                <Alert
                    message={get_string(state.locale, 'drying_info')}
                    className={'mb-10px'}
                    type="info"
                    showIcon
                />
                {alert === 'error' && <Alert
                    message="Error"
                    className={'mb-10px'}
                    type="error"
                    showIcon
                    onClose={()=> {setAlert(null)}}
                    closable={true}

                />}
                {alert === 'success' && <Alert
                    message="Success"
                    className={'mb-10px'}
                    type="success"
                    showIcon
                    onClose={()=> {setAlert(null)}}
                    closable={true}
                />}

                <Button type={'primary'} onClick={()=>{setAlert('error')}}>
                    {get_string(state.locale, 'reserve')}
                </Button>
            </div>
    )
}
