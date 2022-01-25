import { Box, ColorMode, FlexBox, useCurrentMode } from "@animus-ui/components";
import { createPortal } from "react-dom";
import { CloseButton } from "./CloseButton";

export const Portal = ({ mode, children, onClose }) => {
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
      <FlexBox center position="fixed" inset={0}>
        <Box position="relative">
          <Box position="absolute" top={16} right={16}>
            <CloseButton onClick={onClose} />
          </Box>
          {children}
        </Box>
      </FlexBox>
    </ColorMode>,
    document.body
  );
};
