import * as React from 'react';
import {APPROVED, CANCELED, PENDING, ROLE_USER} from "../../../constants/user";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import BlockIcon from "@mui/icons-material/Block";
import {colorSuccess, warningColor} from "../../../constants/colors";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {useTranslation} from "react-i18next";

interface IOrderStatus {
    status?: string,
    role?: string
}

const OrderStatus = ({status, role}:IOrderStatus) => {
    const {t} = useTranslation()
    return (
        <div>
            {(status === PENDING && role === ROLE_USER) && <p className={'details__wrapper_order_status'}>{t('order.status-pending')} <AutorenewIcon className={"rotate"} color={"info"}/></p>}
            {status === CANCELED && <p className={'details__wrapper_order_status'}>{t('order.status-canceled')} <BlockIcon style={{color:warningColor, fontSize:"30px"}}/></p>}
            {status === APPROVED && <p className={'details__wrapper_order_status'}>{t('order.status-approved')} <CheckCircleOutlineIcon style={{color:colorSuccess, fontSize:"30px"}}/></p>}
        </div>
    );
};

export default OrderStatus