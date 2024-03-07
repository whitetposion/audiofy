import { Bars } from "react-loader-spinner";

import { dark, light } from "@/theme";
import { useThemeSettings } from "@/hooks/use-theme-settings";

const DialogBox = ({ open }) => {
  const { theme } = useThemeSettings();
  const { textColor, backgroundColor } = theme;

  const dialogStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 9999,
    opacity: 0.8,
    backgroundColor: backgroundColor
  };

  if (!open){
    return null
  }
  return (
    <div style={dialogStyle}>
      <div>
        <Bars
          className=""
          height={80}
          width={80}
          color={textColor}
          ariaLabel="bars-loading"
          visible={open}
        />
      </div>
    </div>
  );
};

export default DialogBox;
