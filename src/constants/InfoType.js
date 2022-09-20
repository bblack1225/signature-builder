import { EmailIcon, LinkIcon, PhoneIcon, ViewIcon } from "@chakra-ui/icons";

export const InfoType = {
  NORMAL: {
    value: 'normal',
    label: '標準',
    icon: <ViewIcon />,
    linkVal:null
  },
  MOBILE_PHONE: {
    value: 'mobilePhone',
    label: '手機',
    icon: <PhoneIcon />,
    linkVal: 'tel:',
  },
  TELEPHONE: {
    value: 'phone',
    label: '市話',
    icon: <PhoneIcon />,
    linkVal: 'tel:',
  },
  EMAIL: {
    value: 'email',
    label: 'Email',
    icon: <EmailIcon />,
    linkVal: 'mailto:',
  },
  WEBSITE: {
    value: 'website',
    label: '網頁連結',
    icon: <LinkIcon />,
  },
};