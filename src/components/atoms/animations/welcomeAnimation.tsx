import {useTranslation} from "react-i18next";


const WelcomeAnimation = () => {
   const {t} = useTranslation()
    return (
        <div className="table center">
            <div className="monitor-wrapper center">
                <div className="monitor center">
                    <p>{t("welcome")}</p>
                </div>
            </div>
        </div>
    )

}
export default WelcomeAnimation;
