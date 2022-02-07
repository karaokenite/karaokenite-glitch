import { Box, ColorMode, FlexBox, useCurrentMode } from "@animus-ui/components";
import { createPortal } from "react-dom";
import { FocusOn } from "react-focus-on";
import { IconButton } from "./IconButton";
import { useState, useEffect, useContext } from "react";
import { Close } from "../icons";
import { AnimatePresence, motion } from "framer-motion";
import { PortalContext } from "./PortalProvider";

export const Portal = ({
  mode,
  isOpen = false,
  blur = true,
  children,
  onClose,
  align = "center",
  hideClose = false,
}) => {
  const { toggleBlur } = useContext(PortalContext);
  const activeMode = useCurrentMode(mode);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isReady && typeof document !== "undefined") {
      setIsReady(true);
    }
  }, [isReady]);

  useEffect(() => {
    toggleBlur(isOpen && blur);
    return () => toggleBlur(false);
  }, [isOpen, blur]);

  if (!isReady) return null;

  return createPortal(
    <ColorMode mode={activeMode}>
      <FlexBox
        p={16}
        center
        position="fixed"
        inset={0}
        zIndex={isOpen ? 1 : -1}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              style={{ alignSelf: align, position: "relative" }}
              variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
              transition={{ duration: 0.3 }}
              initial="closed"
              animate="open"
              exist="closed"
            >
              <FocusOn onEscapeKey={onClose} onClickOutside={onClose}>
                {!hideClose && (
                  <Box position="absolute" top={16} right={16}>
                    <IconButton icon={Close} size="md" onClick={onClose} />
                  </Box>
                )}
                {children}
              </FocusOn>
            </motion.div>
          )}
        </AnimatePresence>
      </FlexBox>
    </ColorMode>,
    document.body
  );
};
