import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DiscountIcon from '@mui/icons-material/Discount';
import {useTranslation} from "react-i18next";
import {PENDING, CANCELED, APPROVED} from "../../../constants/user";
import {colorSuccess, warningColor} from "../../../constants/colors";
import BlockIcon from "@mui/icons-material/Block";
import * as React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
interface IUserInfo {
    address: string,
    email: string,
    phone: string,
    username:string,
    city: string,
    count: number,
    status:string
}



const UserInfo = ({address, email, phone, username, city, count, status }: Partial<IUserInfo>) => {
    const {t} = useTranslation()
    return(
        <>
            {status === PENDING && <p className="info-title">{t('order.title-pending')}</p>}
            {status === CANCELED && <p className="info-title">{t('order.title-canceled')} <BlockIcon style={{color:warningColor}}/></p>}
            {status === APPROVED && <p className="info-title">{t('order.title-approved')} <CheckCircleOutlineIcon style={{color:colorSuccess}}/></p>}
            <div className="info-wrapper">
                <div className="info-wrapper__address">
                    <p><p><LocationOnIcon/> {t('order.address')}</p>  <span>{city}/{address}</span></p>
                    <p><p><PermIdentityIcon/>{t('order.user')}</p>  <span>{username}</span></p>
                    <p><p><AlternateEmailIcon/>{t("order.mail")}</p>  <span>{email}</span></p>
                    <p><p><PhoneForwardedIcon/>{t("order.phone")}</p> <span>{phone}</span></p>
                    <p><p><DiscountIcon/>{t("order.amount")}</p> <span>{count}</span></p>
                </div>
            </div>
        </>

    )
}

export default UserInfo