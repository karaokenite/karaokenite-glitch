import { Box, ColorMode, FlexBox, useCurrentMode } from "@animus-ui/components";
import { createPortal } from "react-dom";
import { FocusOn } from "react-focus-on";
import { IconButton } from "./IconButton";
import { Close } from "../icons";

export const Portal = ({
  mode,
  children,
  onClose,
  align = "center",
  hideClose = false,
}) => {
  const activeMode = useCurrentMode(mode);

  // const [isReady, setIsReady] = useState(false);

  // useEffect(() => {
  //   if (!isReady && typeof document !== "undefined") {
  //     setIsReady(true);
  //   }
  // }, [isReady]);

  // if (isReady) return null;

  return createPortal(
    <ColorMode mode={activeMode}>
      <FlexBox p={16} center position="fixed" inset={0}>
        <Box alignSelf={align} position="relative">
          <FocusOn onEscapeKey={onClose} onClickOutside={onClose}>
            {!hideClose && (
              <Box position="absolute" top={16} right={16}>
                <IconButton icon={Close} size="md" onClick={onClose} />
              </Box>
            )}
            {children}
          </FocusOn>
        </Box>
      </FlexBox>
    </ColorMode>,
    document.body
  );
};
