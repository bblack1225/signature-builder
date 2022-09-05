import { EmailIcon, LinkIcon, PhoneIcon, ViewIcon } from "@chakra-ui/icons";

export const InfoType = {
    NORMAL: {
        value:'normal',
        label:'標準',
        icon: <ViewIcon />
    },
    PHONE: {
        value: 'phone',
        label:'電話',
        icon: <PhoneIcon />
    },
    EMAIL: {
        value:'email',
        label:'Email',
        icon: <EmailIcon />
    },
    WEBSITE: {
        value:'website',
        label:'網頁連結',
        icon: <LinkIcon />
    }
}