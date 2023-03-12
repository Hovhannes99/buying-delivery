import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DiscountIcon from '@mui/icons-material/Discount';
interface IUserInfo {
    address: string,
    email: string,
    phone: string,
    username:string,
    city: string,
    count: number
}



const UserInfo = ({address, email, phone, username, city, count }: Partial<IUserInfo>) => {
    return(
        <>
            <p className="info-title">Approve or Cancel this order</p>
            <div className="info-wrapper">
                <div className="info-wrapper__address">
                    <p><p><LocationOnIcon/> Address</p>  <span>{city}/{address}</span></p>
                    <p><p><PermIdentityIcon/> User</p>  <span>{username}</span></p>
                    <p><p><AlternateEmailIcon/> Email</p>  <span>{email}</span></p>
                    <p><p><PhoneForwardedIcon/>  Phone</p> <span>{phone}</span></p>
                    <p><p><DiscountIcon/>  Count</p> <span>{count}</span></p>
                </div>
            </div>
        </>

    )
}

export default UserInfo