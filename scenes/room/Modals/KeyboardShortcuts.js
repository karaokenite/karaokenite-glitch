import { Box } from "@animus-ui/components";
import { Portal } from "../../../components/Portal";

export const KeyboardShortcuts = ({ isOpen, onClose }) => {
  return (
    <Portal
      blur={false}
      isOpen={isOpen}
      onClose={onClose}
      align="flex-start"
      hideClose
    >
      <Box
        alignSelf="flex-start"
        bg="rgba(255, 255, 255, 0.1)"
        color="#fafafa"
        border={1}
        borderColor="#000"
        p={16}
        px={32}
        borderRadius="1rem"
      >
        Press <kbd>shift</kbd> + <kbd>b</kbd> to change the scenery.
      </Box>
    </Portal>
  );
};
